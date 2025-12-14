import { tool, type Tool } from "ai";
import { z } from "zod";

// Open-Meteo API response types
interface GeocodingResult {
	results?: Array<{
		id: number;
		name: string;
		latitude: number;
		longitude: number;
		country: string;
		admin1?: string; // State/Province
	}>;
}

interface WeatherResponse {
	current: {
		temperature_2m: number;
		relative_humidity_2m: number;
		apparent_temperature: number;
		weather_code: number;
		wind_speed_10m: number;
	};
}

// Weather codes from Open-Meteo (WMO codes)
const WEATHER_DESCRIPTIONS: Record<number, string> = {
	0: "Clear sky",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Foggy",
	48: "Depositing rime fog",
	51: "Light drizzle",
	53: "Moderate drizzle",
	55: "Dense drizzle",
	61: "Slight rain",
	63: "Moderate rain",
	65: "Heavy rain",
	66: "Light freezing rain",
	67: "Heavy freezing rain",
	71: "Slight snow",
	73: "Moderate snow",
	75: "Heavy snow",
	77: "Snow grains",
	80: "Slight rain showers",
	81: "Moderate rain showers",
	82: "Violent rain showers",
	85: "Slight snow showers",
	86: "Heavy snow showers",
	95: "Thunderstorm",
	96: "Thunderstorm with slight hail",
	99: "Thunderstorm with heavy hail",
};

/**
 * Geocode a location name to coordinates using Open-Meteo Geocoding API
 */
async function geocodeLocation(location: string): Promise<{
	name: string;
	country: string;
	state?: string;
	latitude: number;
	longitude: number;
} | null> {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
		location
	)}&count=1&language=en&format=json`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Geocoding failed: ${response.statusText}`);
	}

	const data: GeocodingResult = await response.json();

	if (!data.results || data.results.length === 0) {
		return null;
	}

	const result = data.results[0];
	return {
		name: result.name,
		country: result.country,
		state: result.admin1,
		latitude: result.latitude,
		longitude: result.longitude,
	};
}

/**
 * Fetch current weather from Open-Meteo Weather API
 */
async function fetchWeather(
	latitude: number,
	longitude: number
): Promise<{
	temperature: number;
	feelsLike: number;
	humidity: number;
	windSpeed: number;
	condition: string;
}> {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Weather API failed: ${response.statusText}`);
	}

	const data: WeatherResponse = await response.json();
	const current = data.current;

	return {
		temperature: Math.round(current.temperature_2m),
		feelsLike: Math.round(current.apparent_temperature),
		humidity: current.relative_humidity_2m,
		windSpeed: Math.round(current.wind_speed_10m),
		condition: WEATHER_DESCRIPTIONS[current.weather_code] ?? "Unknown",
	};
}

export const weatherTool = tool({
	description: "Get the current weather in a location. Use ONLY when user explicitly asks about weather, forecast, or temperature for a specific city or place. Do NOT use for greetings or general conversation.",
	inputSchema: z.object({
		location: z
			.string()
			.describe("The city or location to get the weather for"),
	}),
	execute: async ({ location }) => {
		try {
			// First, geocode the location
			const geo = await geocodeLocation(location);

			if (!geo) {
				return {
					error: `Could not find location: ${location}`,
					location,
				};
			}

			// Fetch the weather
			const weather = await fetchWeather(geo.latitude, geo.longitude);

			// Format the location name
			const locationName = geo.state
				? `${geo.name}, ${geo.state}, ${geo.country}`
				: `${geo.name}, ${geo.country}`;

			return {
				location: locationName,
				temperature: weather.temperature,
				feelsLike: weather.feelsLike,
				humidity: weather.humidity,
				windSpeed: weather.windSpeed,
				condition: weather.condition,
			};
		} catch (error) {
			return {
				error:
					error instanceof Error
						? error.message
						: "Failed to fetch weather",
				location,
			};
		}
	},
} satisfies Tool);

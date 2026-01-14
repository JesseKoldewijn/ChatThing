import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { weatherTool } from "./weather";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Result types for the weather tool
type WeatherSuccess = {
	location: string;
	temperature: number;
	feelsLike: number;
	humidity: number;
	windSpeed: number;
	condition: string;
};

type WeatherError = {
	error: string;
	location: string;
};

type WeatherResult = WeatherSuccess | WeatherError;

// Helper to execute the tool with required options
const executeWeather = async (input: {
	location: string;
}): Promise<WeatherResult> => {
	const result = await weatherTool.execute!(input, {
		toolCallId: "test-call",
		messages: [],
		abortSignal: undefined as unknown as AbortSignal,
	});
	return result as WeatherResult;
};

describe("weather tool", () => {
	beforeEach(() => {
		mockFetch.mockReset();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("tool definition", () => {
		it("should have a description", () => {
			expect(weatherTool.description).toBeDefined();
			expect(weatherTool.description).toContain("weather");
		});

		it("should have an input schema with location", () => {
			expect(weatherTool.inputSchema).toBeDefined();
		});

		it("should have an execute function", () => {
			expect(weatherTool.execute).toBeDefined();
			expect(typeof weatherTool.execute).toBe("function");
		});
	});

	describe("execute", () => {
		it("should return weather data for valid location", async () => {
			// Mock geocoding response
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [
						{
							id: 1,
							name: "London",
							latitude: 51.5074,
							longitude: -0.1278,
							country: "United Kingdom",
							admin1: "England",
						},
					],
				}),
			});

			// Mock weather response
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					current: {
						temperature_2m: 15,
						relative_humidity_2m: 75,
						apparent_temperature: 14,
						weather_code: 2,
						wind_speed_10m: 10,
					},
				}),
			});

			const result = await executeWeather({ location: "London" });

			expect(result.location).toBeDefined();
			expect((result as WeatherSuccess).temperature).toBeDefined();
			expect((result as WeatherSuccess).humidity).toBeDefined();
			expect((result as WeatherSuccess).condition).toBeDefined();
		});

		it("should return error for unknown location", async () => {
			// Mock geocoding response with no results
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [],
				}),
			});

			const result = await executeWeather({
				location: "NonexistentPlace12345",
			});

			expect((result as WeatherError).error).toBeDefined();
			expect((result as WeatherError).error).toContain("not find");
		});

		it("should handle geocoding API failure gracefully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				statusText: "Service Unavailable",
			});

			const result = await executeWeather({ location: "London" });

			// Tool catches errors and returns them
			expect((result as WeatherError).error).toBeDefined();
		});

		it("should handle weather API failure gracefully", async () => {
			// Mock successful geocoding
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [
						{
							id: 1,
							name: "London",
							latitude: 51.5074,
							longitude: -0.1278,
							country: "United Kingdom",
						},
					],
				}),
			});

			// Mock failed weather response
			mockFetch.mockResolvedValueOnce({
				ok: false,
				statusText: "Internal Server Error",
			});

			const result = await executeWeather({ location: "London" });

			// Tool catches errors and returns them
			expect((result as WeatherError).error).toBeDefined();
		});

		it("should include location details in response", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [
						{
							id: 1,
							name: "New York",
							latitude: 40.7128,
							longitude: -74.006,
							country: "United States",
							admin1: "New York",
						},
					],
				}),
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					current: {
						temperature_2m: 20,
						relative_humidity_2m: 60,
						apparent_temperature: 19,
						weather_code: 0,
						wind_speed_10m: 5,
					},
				}),
			});

			const result = await executeWeather({ location: "New York" });

			expect(result.location).toContain("New York");
			expect(result.location).toContain("United States");
		});

		it("should map weather codes to descriptions", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [
						{
							id: 1,
							name: "Paris",
							latitude: 48.8566,
							longitude: 2.3522,
							country: "France",
						},
					],
				}),
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					current: {
						temperature_2m: 18,
						relative_humidity_2m: 65,
						apparent_temperature: 17,
						weather_code: 0, // Clear sky
						wind_speed_10m: 8,
					},
				}),
			});

			const result = await executeWeather({ location: "Paris" });

			expect((result as WeatherSuccess).condition?.toLowerCase()).toContain(
				"clear",
			);
		});

		it("should include wind speed in response", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [
						{
							id: 1,
							name: "Tokyo",
							latitude: 35.6762,
							longitude: 139.6503,
							country: "Japan",
						},
					],
				}),
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					current: {
						temperature_2m: 22,
						relative_humidity_2m: 70,
						apparent_temperature: 23,
						weather_code: 1,
						wind_speed_10m: 15,
					},
				}),
			});

			const result = await executeWeather({ location: "Tokyo" });

			expect((result as WeatherSuccess).windSpeed).toBeDefined();
		});

		it("should include feels-like temperature", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [
						{
							id: 1,
							name: "Berlin",
							latitude: 52.52,
							longitude: 13.405,
							country: "Germany",
						},
					],
				}),
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					current: {
						temperature_2m: 10,
						relative_humidity_2m: 80,
						apparent_temperature: 7,
						weather_code: 3,
						wind_speed_10m: 20,
					},
				}),
			});

			const result = await executeWeather({ location: "Berlin" });

			expect((result as WeatherSuccess).feelsLike).toBeDefined();
		});
	});
});

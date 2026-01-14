import { datetimeTool } from "./datetime";
import { weatherTool } from "./weather";

export const tools = {
	weather: weatherTool,
	datetime: datetimeTool,
};

export type ToolSet = typeof tools;

import { weatherTool } from "./weather";
import { datetimeTool } from "./datetime";

export const tools = {
	weather: weatherTool,
	datetime: datetimeTool,
};

export type ToolSet = typeof tools;

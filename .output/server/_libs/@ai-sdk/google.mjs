import { $ as unknown, B as array, D as postJsonToApi, E as parseProviderOptions, F as zodSchema, I as _enum, J as object, N as withUserAgentSuffix, O as resolve, P as withoutTrailingSlash, Q as union, T as loadApiKey, V as boolean, Y as record, Z as string, d as createEventSourceResponseHandler, g as createProviderToolFactoryWithOutputSchema, h as createProviderToolFactory, it as TooManyEmbeddingValuesForCallError, l as convertToBase64, lt as init_dist, m as createJsonResponseHandler, ot as UnsupportedFunctionalityError, p as createJsonErrorResponseHandler, q as number, s as combineHeaders, w as lazySchema, y as generateId } from "./gateway.mjs";
init_dist();
var VERSION = "3.0.6";
var googleFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: lazySchema(() => zodSchema(object({ error: object({
		code: number().nullable(),
		message: string(),
		status: string()
	}) }))),
	errorToMessage: (data) => data.error.message
});
var googleGenerativeAIEmbeddingProviderOptions = lazySchema(() => zodSchema(object({
	outputDimensionality: number().optional(),
	taskType: _enum([
		"SEMANTIC_SIMILARITY",
		"CLASSIFICATION",
		"CLUSTERING",
		"RETRIEVAL_DOCUMENT",
		"RETRIEVAL_QUERY",
		"QUESTION_ANSWERING",
		"FACT_VERIFICATION",
		"CODE_RETRIEVAL_QUERY"
	]).optional()
})));
var GoogleGenerativeAIEmbeddingModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v3";
		this.maxEmbeddingsPerCall = 2048;
		this.supportsParallelCalls = true;
		this.modelId = modelId;
		this.config = config;
	}
	get provider() {
		return this.config.provider;
	}
	async doEmbed({ values, headers, abortSignal, providerOptions }) {
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleGenerativeAIEmbeddingProviderOptions
		});
		if (values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const mergedHeaders = combineHeaders(await resolve(this.config.headers), headers);
		if (values.length === 1) {
			const { responseHeaders: responseHeaders2, value: response2, rawValue: rawValue2 } = await postJsonToApi({
				url: `${this.config.baseURL}/models/${this.modelId}:embedContent`,
				headers: mergedHeaders,
				body: {
					model: `models/${this.modelId}`,
					content: { parts: [{ text: values[0] }] },
					outputDimensionality: googleOptions == null ? void 0 : googleOptions.outputDimensionality,
					taskType: googleOptions == null ? void 0 : googleOptions.taskType
				},
				failedResponseHandler: googleFailedResponseHandler,
				successfulResponseHandler: createJsonResponseHandler(googleGenerativeAISingleEmbeddingResponseSchema),
				abortSignal,
				fetch: this.config.fetch
			});
			return {
				warnings: [],
				embeddings: [response2.embedding.values],
				usage: void 0,
				response: {
					headers: responseHeaders2,
					body: rawValue2
				}
			};
		}
		const { responseHeaders, value: response, rawValue } = await postJsonToApi({
			url: `${this.config.baseURL}/models/${this.modelId}:batchEmbedContents`,
			headers: mergedHeaders,
			body: { requests: values.map((value) => ({
				model: `models/${this.modelId}`,
				content: {
					role: "user",
					parts: [{ text: value }]
				},
				outputDimensionality: googleOptions == null ? void 0 : googleOptions.outputDimensionality,
				taskType: googleOptions == null ? void 0 : googleOptions.taskType
			})) },
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleGenerativeAITextEmbeddingResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			warnings: [],
			embeddings: response.embeddings.map((item) => item.values),
			usage: void 0,
			response: {
				headers: responseHeaders,
				body: rawValue
			}
		};
	}
};
var googleGenerativeAITextEmbeddingResponseSchema = lazySchema(() => zodSchema(object({ embeddings: array(object({ values: array(number()) })) })));
var googleGenerativeAISingleEmbeddingResponseSchema = lazySchema(() => zodSchema(object({ embedding: object({ values: array(number()) }) })));
function convertGoogleGenerativeAIUsage(usage) {
	var _a, _b, _c, _d;
	if (usage == null) return {
		inputTokens: {
			total: void 0,
			noCache: void 0,
			cacheRead: void 0,
			cacheWrite: void 0
		},
		outputTokens: {
			total: void 0,
			text: void 0,
			reasoning: void 0
		},
		raw: void 0
	};
	const promptTokens = (_a = usage.promptTokenCount) != null ? _a : 0;
	const candidatesTokens = (_b = usage.candidatesTokenCount) != null ? _b : 0;
	const cachedContentTokens = (_c = usage.cachedContentTokenCount) != null ? _c : 0;
	const thoughtsTokens = (_d = usage.thoughtsTokenCount) != null ? _d : 0;
	return {
		inputTokens: {
			total: promptTokens,
			noCache: promptTokens - cachedContentTokens,
			cacheRead: cachedContentTokens,
			cacheWrite: void 0
		},
		outputTokens: {
			total: candidatesTokens + thoughtsTokens,
			text: candidatesTokens,
			reasoning: thoughtsTokens
		},
		raw: usage
	};
}
function convertJSONSchemaToOpenAPISchema(jsonSchema, isRoot = true) {
	if (jsonSchema == null) return;
	if (isEmptyObjectSchema(jsonSchema)) {
		if (isRoot) return;
		if (typeof jsonSchema === "object" && jsonSchema.description) return {
			type: "object",
			description: jsonSchema.description
		};
		return { type: "object" };
	}
	if (typeof jsonSchema === "boolean") return {
		type: "boolean",
		properties: {}
	};
	const { type, description, required, properties, items, allOf, anyOf, oneOf, format, const: constValue, minLength, enum: enumValues } = jsonSchema;
	const result = {};
	if (description) result.description = description;
	if (required) result.required = required;
	if (format) result.format = format;
	if (constValue !== void 0) result.enum = [constValue];
	if (type) if (Array.isArray(type)) {
		const hasNull = type.includes("null");
		const nonNullTypes = type.filter((t) => t !== "null");
		if (nonNullTypes.length === 0) result.type = "null";
		else {
			result.anyOf = nonNullTypes.map((t) => ({ type: t }));
			if (hasNull) result.nullable = true;
		}
	} else result.type = type;
	if (enumValues !== void 0) result.enum = enumValues;
	if (properties != null) result.properties = Object.entries(properties).reduce((acc, [key, value]) => {
		acc[key] = convertJSONSchemaToOpenAPISchema(value, false);
		return acc;
	}, {});
	if (items) result.items = Array.isArray(items) ? items.map((item) => convertJSONSchemaToOpenAPISchema(item, false)) : convertJSONSchemaToOpenAPISchema(items, false);
	if (allOf) result.allOf = allOf.map((item) => convertJSONSchemaToOpenAPISchema(item, false));
	if (anyOf) if (anyOf.some((schema) => typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null")) {
		const nonNullSchemas = anyOf.filter((schema) => !(typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null"));
		if (nonNullSchemas.length === 1) {
			const converted = convertJSONSchemaToOpenAPISchema(nonNullSchemas[0], false);
			if (typeof converted === "object") {
				result.nullable = true;
				Object.assign(result, converted);
			}
		} else {
			result.anyOf = nonNullSchemas.map((item) => convertJSONSchemaToOpenAPISchema(item, false));
			result.nullable = true;
		}
	} else result.anyOf = anyOf.map((item) => convertJSONSchemaToOpenAPISchema(item, false));
	if (oneOf) result.oneOf = oneOf.map((item) => convertJSONSchemaToOpenAPISchema(item, false));
	if (minLength !== void 0) result.minLength = minLength;
	return result;
}
function isEmptyObjectSchema(jsonSchema) {
	return jsonSchema != null && typeof jsonSchema === "object" && jsonSchema.type === "object" && (jsonSchema.properties == null || Object.keys(jsonSchema.properties).length === 0) && !jsonSchema.additionalProperties;
}
function convertToGoogleGenerativeAIMessages(prompt, options) {
	var _a, _b, _c;
	const systemInstructionParts = [];
	const contents = [];
	let systemMessagesAllowed = true;
	const isGemmaModel = (_a = options == null ? void 0 : options.isGemmaModel) != null ? _a : false;
	const providerOptionsName = (_b = options == null ? void 0 : options.providerOptionsName) != null ? _b : "google";
	for (const { role, content } of prompt) switch (role) {
		case "system":
			if (!systemMessagesAllowed) throw new UnsupportedFunctionalityError({ functionality: "system messages are only supported at the beginning of the conversation" });
			systemInstructionParts.push({ text: content });
			break;
		case "user": {
			systemMessagesAllowed = false;
			const parts = [];
			for (const part of content) switch (part.type) {
				case "text":
					parts.push({ text: part.text });
					break;
				case "file": {
					const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
					parts.push(part.data instanceof URL ? { fileData: {
						mimeType: mediaType,
						fileUri: part.data.toString()
					} } : { inlineData: {
						mimeType: mediaType,
						data: convertToBase64(part.data)
					} });
					break;
				}
			}
			contents.push({
				role: "user",
				parts
			});
			break;
		}
		case "assistant":
			systemMessagesAllowed = false;
			contents.push({
				role: "model",
				parts: content.map((part) => {
					var _a2;
					const providerOpts = (_a2 = part.providerOptions) == null ? void 0 : _a2[providerOptionsName];
					const thoughtSignature = (providerOpts == null ? void 0 : providerOpts.thoughtSignature) != null ? String(providerOpts.thoughtSignature) : void 0;
					switch (part.type) {
						case "text": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thoughtSignature
						};
						case "reasoning": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thought: true,
							thoughtSignature
						};
						case "file":
							if (part.data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "File data URLs in assistant messages are not supported" });
							return {
								inlineData: {
									mimeType: part.mediaType,
									data: convertToBase64(part.data)
								},
								thoughtSignature
							};
						case "tool-call": return {
							functionCall: {
								name: part.toolName,
								args: part.input
							},
							thoughtSignature
						};
					}
				}).filter((part) => part !== void 0)
			});
			break;
		case "tool": {
			systemMessagesAllowed = false;
			const parts = [];
			for (const part of content) {
				if (part.type === "tool-approval-response") continue;
				const output = part.output;
				if (output.type === "content") for (const contentPart of output.value) switch (contentPart.type) {
					case "text":
						parts.push({ functionResponse: {
							name: part.toolName,
							response: {
								name: part.toolName,
								content: contentPart.text
							}
						} });
						break;
					case "image-data":
						parts.push({ inlineData: {
							mimeType: contentPart.mediaType,
							data: contentPart.data
						} }, { text: "Tool executed successfully and returned this image as a response" });
						break;
					default:
						parts.push({ text: JSON.stringify(contentPart) });
						break;
				}
				else parts.push({ functionResponse: {
					name: part.toolName,
					response: {
						name: part.toolName,
						content: output.type === "execution-denied" ? (_c = output.reason) != null ? _c : "Tool execution denied." : output.value
					}
				} });
			}
			contents.push({
				role: "user",
				parts
			});
			break;
		}
	}
	if (isGemmaModel && systemInstructionParts.length > 0 && contents.length > 0 && contents[0].role === "user") {
		const systemText = systemInstructionParts.map((part) => part.text).join("\n\n");
		contents[0].parts.unshift({ text: systemText + "\n\n" });
	}
	return {
		systemInstruction: systemInstructionParts.length > 0 && !isGemmaModel ? { parts: systemInstructionParts } : void 0,
		contents
	};
}
function getModelPath(modelId) {
	return modelId.includes("/") ? modelId : `models/${modelId}`;
}
var googleGenerativeAIProviderOptions = lazySchema(() => zodSchema(object({
	responseModalities: array(_enum(["TEXT", "IMAGE"])).optional(),
	thinkingConfig: object({
		thinkingBudget: number().optional(),
		includeThoughts: boolean().optional(),
		thinkingLevel: _enum([
			"minimal",
			"low",
			"medium",
			"high"
		]).optional()
	}).optional(),
	cachedContent: string().optional(),
	structuredOutputs: boolean().optional(),
	safetySettings: array(object({
		category: _enum([
			"HARM_CATEGORY_UNSPECIFIED",
			"HARM_CATEGORY_HATE_SPEECH",
			"HARM_CATEGORY_DANGEROUS_CONTENT",
			"HARM_CATEGORY_HARASSMENT",
			"HARM_CATEGORY_SEXUALLY_EXPLICIT",
			"HARM_CATEGORY_CIVIC_INTEGRITY"
		]),
		threshold: _enum([
			"HARM_BLOCK_THRESHOLD_UNSPECIFIED",
			"BLOCK_LOW_AND_ABOVE",
			"BLOCK_MEDIUM_AND_ABOVE",
			"BLOCK_ONLY_HIGH",
			"BLOCK_NONE",
			"OFF"
		])
	})).optional(),
	threshold: _enum([
		"HARM_BLOCK_THRESHOLD_UNSPECIFIED",
		"BLOCK_LOW_AND_ABOVE",
		"BLOCK_MEDIUM_AND_ABOVE",
		"BLOCK_ONLY_HIGH",
		"BLOCK_NONE",
		"OFF"
	]).optional(),
	audioTimestamp: boolean().optional(),
	labels: record(string(), string()).optional(),
	mediaResolution: _enum([
		"MEDIA_RESOLUTION_UNSPECIFIED",
		"MEDIA_RESOLUTION_LOW",
		"MEDIA_RESOLUTION_MEDIUM",
		"MEDIA_RESOLUTION_HIGH"
	]).optional(),
	imageConfig: object({
		aspectRatio: _enum([
			"1:1",
			"2:3",
			"3:2",
			"3:4",
			"4:3",
			"4:5",
			"5:4",
			"9:16",
			"16:9",
			"21:9"
		]).optional(),
		imageSize: _enum([
			"1K",
			"2K",
			"4K"
		]).optional()
	}).optional(),
	retrievalConfig: object({ latLng: object({
		latitude: number(),
		longitude: number()
	}).optional() }).optional()
})));
function prepareTools({ tools, toolChoice, modelId }) {
	var _a;
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	const isLatest = [
		"gemini-flash-latest",
		"gemini-flash-lite-latest",
		"gemini-pro-latest"
	].some((id) => id === modelId);
	const isGemini2orNewer = modelId.includes("gemini-2") || modelId.includes("gemini-3") || isLatest;
	const supportsDynamicRetrieval = modelId.includes("gemini-1.5-flash") && !modelId.includes("-8b");
	const supportsFileSearch = modelId.includes("gemini-2.5") || modelId.includes("gemini-3");
	if (tools == null) return {
		tools: void 0,
		toolConfig: void 0,
		toolWarnings
	};
	const hasFunctionTools = tools.some((tool) => tool.type === "function");
	const hasProviderTools = tools.some((tool) => tool.type === "provider");
	if (hasFunctionTools && hasProviderTools) toolWarnings.push({
		type: "unsupported",
		feature: `combination of function and provider-defined tools`
	});
	if (hasProviderTools) {
		const googleTools2 = [];
		tools.filter((tool) => tool.type === "provider").forEach((tool) => {
			switch (tool.id) {
				case "google.google_search":
					if (isGemini2orNewer) googleTools2.push({ googleSearch: {} });
					else if (supportsDynamicRetrieval) googleTools2.push({ googleSearchRetrieval: { dynamicRetrievalConfig: {
						mode: tool.args.mode,
						dynamicThreshold: tool.args.dynamicThreshold
					} } });
					else googleTools2.push({ googleSearchRetrieval: {} });
					break;
				case "google.enterprise_web_search":
					if (isGemini2orNewer) googleTools2.push({ enterpriseWebSearch: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "Enterprise Web Search requires Gemini 2.0 or newer."
					});
					break;
				case "google.url_context":
					if (isGemini2orNewer) googleTools2.push({ urlContext: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The URL context tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.code_execution":
					if (isGemini2orNewer) googleTools2.push({ codeExecution: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The code execution tools is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.file_search":
					if (supportsFileSearch) googleTools2.push({ fileSearch: { ...tool.args } });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The file search tool is only supported with Gemini 2.5 models and Gemini 3 models."
					});
					break;
				case "google.vertex_rag_store":
					if (isGemini2orNewer) googleTools2.push({ retrieval: { vertex_rag_store: {
						rag_resources: { rag_corpus: tool.args.ragCorpus },
						similarity_top_k: tool.args.topK
					} } });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The RAG store tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.google_maps":
					if (isGemini2orNewer) googleTools2.push({ googleMaps: {} });
					else toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`,
						details: "The Google Maps grounding tool is not supported with Gemini models other than Gemini 2 or newer."
					});
					break;
				default:
					toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`
					});
					break;
			}
		});
		return {
			tools: googleTools2.length > 0 ? googleTools2 : void 0,
			toolConfig: void 0,
			toolWarnings
		};
	}
	const functionDeclarations = [];
	for (const tool of tools) switch (tool.type) {
		case "function":
			functionDeclarations.push({
				name: tool.name,
				description: (_a = tool.description) != null ? _a : "",
				parameters: convertJSONSchemaToOpenAPISchema(tool.inputSchema)
			});
			break;
		default:
			toolWarnings.push({
				type: "unsupported",
				feature: `function tool ${tool.name}`
			});
			break;
	}
	if (toolChoice == null) return {
		tools: [{ functionDeclarations }],
		toolConfig: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "AUTO" } },
			toolWarnings
		};
		case "none": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "NONE" } },
			toolWarnings
		};
		case "required": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "ANY" } },
			toolWarnings
		};
		case "tool": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: {
				mode: "ANY",
				allowedFunctionNames: [toolChoice.toolName]
			} },
			toolWarnings
		};
		default: throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${type}` });
	}
}
function mapGoogleGenerativeAIFinishReason({ finishReason, hasToolCalls }) {
	switch (finishReason) {
		case "STOP": return hasToolCalls ? "tool-calls" : "stop";
		case "MAX_TOKENS": return "length";
		case "IMAGE_SAFETY":
		case "RECITATION":
		case "SAFETY":
		case "BLOCKLIST":
		case "PROHIBITED_CONTENT":
		case "SPII": return "content-filter";
		case "MALFORMED_FUNCTION_CALL": return "error";
		case "FINISH_REASON_UNSPECIFIED":
		case "OTHER":
		default: return "other";
	}
}
var GoogleGenerativeAILanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v3";
		var _a;
		this.modelId = modelId;
		this.config = config;
		this.generateId = (_a = config.generateId) != null ? _a : generateId;
	}
	get provider() {
		return this.config.provider;
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions }) {
		var _a;
		const warnings = [];
		const providerOptionsName = this.config.provider.includes("vertex") ? "vertex" : "google";
		let googleOptions = await parseProviderOptions({
			provider: providerOptionsName,
			providerOptions,
			schema: googleGenerativeAIProviderOptions
		});
		if (googleOptions == null && providerOptionsName !== "google") googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleGenerativeAIProviderOptions
		});
		if ((tools == null ? void 0 : tools.some((tool) => tool.type === "provider" && tool.id === "google.vertex_rag_store")) && !this.config.provider.startsWith("google.vertex.")) warnings.push({
			type: "other",
			message: `The 'vertex_rag_store' tool is only supported with the Google Vertex provider and might not be supported or could behave unexpectedly with the current Google provider (${this.config.provider}).`
		});
		const isGemmaModel = this.modelId.toLowerCase().startsWith("gemma-");
		const { contents, systemInstruction } = convertToGoogleGenerativeAIMessages(prompt, {
			isGemmaModel,
			providerOptionsName
		});
		const { tools: googleTools2, toolConfig: googleToolConfig, toolWarnings } = prepareTools({
			tools,
			toolChoice,
			modelId: this.modelId
		});
		return {
			args: {
				generationConfig: {
					maxOutputTokens,
					temperature,
					topK,
					topP,
					frequencyPenalty,
					presencePenalty,
					stopSequences,
					seed,
					responseMimeType: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? "application/json" : void 0,
					responseSchema: (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && ((_a = googleOptions == null ? void 0 : googleOptions.structuredOutputs) != null ? _a : true) ? convertJSONSchemaToOpenAPISchema(responseFormat.schema) : void 0,
					...(googleOptions == null ? void 0 : googleOptions.audioTimestamp) && { audioTimestamp: googleOptions.audioTimestamp },
					responseModalities: googleOptions == null ? void 0 : googleOptions.responseModalities,
					thinkingConfig: googleOptions == null ? void 0 : googleOptions.thinkingConfig,
					...(googleOptions == null ? void 0 : googleOptions.mediaResolution) && { mediaResolution: googleOptions.mediaResolution },
					...(googleOptions == null ? void 0 : googleOptions.imageConfig) && { imageConfig: googleOptions.imageConfig }
				},
				contents,
				systemInstruction: isGemmaModel ? void 0 : systemInstruction,
				safetySettings: googleOptions == null ? void 0 : googleOptions.safetySettings,
				tools: googleTools2,
				toolConfig: (googleOptions == null ? void 0 : googleOptions.retrievalConfig) ? {
					...googleToolConfig,
					retrievalConfig: googleOptions.retrievalConfig
				} : googleToolConfig,
				cachedContent: googleOptions == null ? void 0 : googleOptions.cachedContent,
				labels: googleOptions == null ? void 0 : googleOptions.labels
			},
			warnings: [...warnings, ...toolWarnings],
			providerOptionsName
		};
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i;
		const { args, warnings, providerOptionsName } = await this.getArgs(options);
		const mergedHeaders = combineHeaders(await resolve(this.config.headers), options.headers);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: `${this.config.baseURL}/${getModelPath(this.modelId)}:generateContent`,
			headers: mergedHeaders,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(responseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const candidate = response.candidates[0];
		const content = [];
		const parts = (_b = (_a = candidate.content) == null ? void 0 : _a.parts) != null ? _b : [];
		const usageMetadata = response.usageMetadata;
		let lastCodeExecutionToolCallId;
		for (const part of parts) if ("executableCode" in part && ((_c = part.executableCode) == null ? void 0 : _c.code)) {
			const toolCallId = this.config.generateId();
			lastCodeExecutionToolCallId = toolCallId;
			content.push({
				type: "tool-call",
				toolCallId,
				toolName: "code_execution",
				input: JSON.stringify(part.executableCode),
				providerExecuted: true
			});
		} else if ("codeExecutionResult" in part && part.codeExecutionResult) {
			content.push({
				type: "tool-result",
				toolCallId: lastCodeExecutionToolCallId,
				toolName: "code_execution",
				result: {
					outcome: part.codeExecutionResult.outcome,
					output: part.codeExecutionResult.output
				}
			});
			lastCodeExecutionToolCallId = void 0;
		} else if ("text" in part && part.text != null && part.text.length > 0) content.push({
			type: part.thought === true ? "reasoning" : "text",
			text: part.text,
			providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
		});
		else if ("functionCall" in part) content.push({
			type: "tool-call",
			toolCallId: this.config.generateId(),
			toolName: part.functionCall.name,
			input: JSON.stringify(part.functionCall.args),
			providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
		});
		else if ("inlineData" in part) content.push({
			type: "file",
			data: part.inlineData.data,
			mediaType: part.inlineData.mimeType,
			providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
		});
		const sources = (_d = extractSources({
			groundingMetadata: candidate.groundingMetadata,
			generateId: this.config.generateId
		})) != null ? _d : [];
		for (const source of sources) content.push(source);
		return {
			content,
			finishReason: {
				unified: mapGoogleGenerativeAIFinishReason({
					finishReason: candidate.finishReason,
					hasToolCalls: content.some((part) => part.type === "tool-call" && !part.providerExecuted)
				}),
				raw: (_e = candidate.finishReason) != null ? _e : void 0
			},
			usage: convertGoogleGenerativeAIUsage(usageMetadata),
			warnings,
			providerMetadata: { [providerOptionsName]: {
				promptFeedback: (_f = response.promptFeedback) != null ? _f : null,
				groundingMetadata: (_g = candidate.groundingMetadata) != null ? _g : null,
				urlContextMetadata: (_h = candidate.urlContextMetadata) != null ? _h : null,
				safetyRatings: (_i = candidate.safetyRatings) != null ? _i : null,
				usageMetadata: usageMetadata != null ? usageMetadata : null
			} },
			request: { body: args },
			response: {
				headers: responseHeaders,
				body: rawResponse
			}
		};
	}
	async doStream(options) {
		const { args, warnings, providerOptionsName } = await this.getArgs(options);
		const headers = combineHeaders(await resolve(this.config.headers), options.headers);
		const { responseHeaders, value: response } = await postJsonToApi({
			url: `${this.config.baseURL}/${getModelPath(this.modelId)}:streamGenerateContent?alt=sse`,
			headers,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(chunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = {
			unified: "other",
			raw: void 0
		};
		let usage = void 0;
		let providerMetadata = void 0;
		const generateId3 = this.config.generateId;
		let hasToolCalls = false;
		let currentTextBlockId = null;
		let currentReasoningBlockId = null;
		let blockCounter = 0;
		const emittedSourceUrls = /* @__PURE__ */ new Set();
		let lastCodeExecutionToolCallId;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c, _d, _e, _f, _g;
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					const usageMetadata = value.usageMetadata;
					if (usageMetadata != null) usage = usageMetadata;
					const candidate = (_a = value.candidates) == null ? void 0 : _a[0];
					if (candidate == null) return;
					const content = candidate.content;
					const sources = extractSources({
						groundingMetadata: candidate.groundingMetadata,
						generateId: generateId3
					});
					if (sources != null) {
						for (const source of sources) if (source.sourceType === "url" && !emittedSourceUrls.has(source.url)) {
							emittedSourceUrls.add(source.url);
							controller.enqueue(source);
						}
					}
					if (content != null) {
						const parts = (_b = content.parts) != null ? _b : [];
						for (const part of parts) if ("executableCode" in part && ((_c = part.executableCode) == null ? void 0 : _c.code)) {
							const toolCallId = generateId3();
							lastCodeExecutionToolCallId = toolCallId;
							controller.enqueue({
								type: "tool-call",
								toolCallId,
								toolName: "code_execution",
								input: JSON.stringify(part.executableCode),
								providerExecuted: true
							});
						} else if ("codeExecutionResult" in part && part.codeExecutionResult) {
							const toolCallId = lastCodeExecutionToolCallId;
							if (toolCallId) {
								controller.enqueue({
									type: "tool-result",
									toolCallId,
									toolName: "code_execution",
									result: {
										outcome: part.codeExecutionResult.outcome,
										output: part.codeExecutionResult.output
									}
								});
								lastCodeExecutionToolCallId = void 0;
							}
						} else if ("text" in part && part.text != null && part.text.length > 0) if (part.thought === true) {
							if (currentTextBlockId !== null) {
								controller.enqueue({
									type: "text-end",
									id: currentTextBlockId
								});
								currentTextBlockId = null;
							}
							if (currentReasoningBlockId === null) {
								currentReasoningBlockId = String(blockCounter++);
								controller.enqueue({
									type: "reasoning-start",
									id: currentReasoningBlockId,
									providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
								});
							}
							controller.enqueue({
								type: "reasoning-delta",
								id: currentReasoningBlockId,
								delta: part.text,
								providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
							});
						} else {
							if (currentReasoningBlockId !== null) {
								controller.enqueue({
									type: "reasoning-end",
									id: currentReasoningBlockId
								});
								currentReasoningBlockId = null;
							}
							if (currentTextBlockId === null) {
								currentTextBlockId = String(blockCounter++);
								controller.enqueue({
									type: "text-start",
									id: currentTextBlockId,
									providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
								});
							}
							controller.enqueue({
								type: "text-delta",
								id: currentTextBlockId,
								delta: part.text,
								providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
							});
						}
						else if ("inlineData" in part) controller.enqueue({
							type: "file",
							mediaType: part.inlineData.mimeType,
							data: part.inlineData.data
						});
						const toolCallDeltas = getToolCallsFromParts({
							parts: content.parts,
							generateId: generateId3,
							providerOptionsName
						});
						if (toolCallDeltas != null) for (const toolCall of toolCallDeltas) {
							controller.enqueue({
								type: "tool-input-start",
								id: toolCall.toolCallId,
								toolName: toolCall.toolName,
								providerMetadata: toolCall.providerMetadata
							});
							controller.enqueue({
								type: "tool-input-delta",
								id: toolCall.toolCallId,
								delta: toolCall.args,
								providerMetadata: toolCall.providerMetadata
							});
							controller.enqueue({
								type: "tool-input-end",
								id: toolCall.toolCallId,
								providerMetadata: toolCall.providerMetadata
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: toolCall.toolCallId,
								toolName: toolCall.toolName,
								input: toolCall.args,
								providerMetadata: toolCall.providerMetadata
							});
							hasToolCalls = true;
						}
					}
					if (candidate.finishReason != null) {
						finishReason = {
							unified: mapGoogleGenerativeAIFinishReason({
								finishReason: candidate.finishReason,
								hasToolCalls
							}),
							raw: candidate.finishReason
						};
						providerMetadata = { [providerOptionsName]: {
							promptFeedback: (_d = value.promptFeedback) != null ? _d : null,
							groundingMetadata: (_e = candidate.groundingMetadata) != null ? _e : null,
							urlContextMetadata: (_f = candidate.urlContextMetadata) != null ? _f : null,
							safetyRatings: (_g = candidate.safetyRatings) != null ? _g : null
						} };
						if (usageMetadata != null) providerMetadata[providerOptionsName].usageMetadata = usageMetadata;
					}
				},
				flush(controller) {
					if (currentTextBlockId !== null) controller.enqueue({
						type: "text-end",
						id: currentTextBlockId
					});
					if (currentReasoningBlockId !== null) controller.enqueue({
						type: "reasoning-end",
						id: currentReasoningBlockId
					});
					controller.enqueue({
						type: "finish",
						finishReason,
						usage: convertGoogleGenerativeAIUsage(usage),
						providerMetadata
					});
				}
			})),
			response: { headers: responseHeaders },
			request: { body: args }
		};
	}
};
function getToolCallsFromParts({ parts, generateId: generateId3, providerOptionsName }) {
	const functionCallParts = parts == null ? void 0 : parts.filter((part) => "functionCall" in part);
	return functionCallParts == null || functionCallParts.length === 0 ? void 0 : functionCallParts.map((part) => ({
		type: "tool-call",
		toolCallId: generateId3(),
		toolName: part.functionCall.name,
		args: JSON.stringify(part.functionCall.args),
		providerMetadata: part.thoughtSignature ? { [providerOptionsName]: { thoughtSignature: part.thoughtSignature } } : void 0
	}));
}
function extractSources({ groundingMetadata, generateId: generateId3 }) {
	var _a, _b, _c, _d, _e;
	if (!(groundingMetadata == null ? void 0 : groundingMetadata.groundingChunks)) return;
	const sources = [];
	for (const chunk of groundingMetadata.groundingChunks) if (chunk.web != null) sources.push({
		type: "source",
		sourceType: "url",
		id: generateId3(),
		url: chunk.web.uri,
		title: (_a = chunk.web.title) != null ? _a : void 0
	});
	else if (chunk.retrievedContext != null) {
		const uri = chunk.retrievedContext.uri;
		const fileSearchStore = chunk.retrievedContext.fileSearchStore;
		if (uri && (uri.startsWith("http://") || uri.startsWith("https://"))) sources.push({
			type: "source",
			sourceType: "url",
			id: generateId3(),
			url: uri,
			title: (_b = chunk.retrievedContext.title) != null ? _b : void 0
		});
		else if (uri) {
			const title = (_c = chunk.retrievedContext.title) != null ? _c : "Unknown Document";
			let mediaType = "application/octet-stream";
			let filename = void 0;
			if (uri.endsWith(".pdf")) {
				mediaType = "application/pdf";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".txt")) {
				mediaType = "text/plain";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".docx")) {
				mediaType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".doc")) {
				mediaType = "application/msword";
				filename = uri.split("/").pop();
			} else if (uri.match(/\.(md|markdown)$/)) {
				mediaType = "text/markdown";
				filename = uri.split("/").pop();
			} else filename = uri.split("/").pop();
			sources.push({
				type: "source",
				sourceType: "document",
				id: generateId3(),
				mediaType,
				title,
				filename
			});
		} else if (fileSearchStore) {
			const title = (_d = chunk.retrievedContext.title) != null ? _d : "Unknown Document";
			sources.push({
				type: "source",
				sourceType: "document",
				id: generateId3(),
				mediaType: "application/octet-stream",
				title,
				filename: fileSearchStore.split("/").pop()
			});
		}
	} else if (chunk.maps != null) {
		if (chunk.maps.uri) sources.push({
			type: "source",
			sourceType: "url",
			id: generateId3(),
			url: chunk.maps.uri,
			title: (_e = chunk.maps.title) != null ? _e : void 0
		});
	}
	return sources.length > 0 ? sources : void 0;
}
var getGroundingMetadataSchema = () => object({
	webSearchQueries: array(string()).nullish(),
	retrievalQueries: array(string()).nullish(),
	searchEntryPoint: object({ renderedContent: string() }).nullish(),
	groundingChunks: array(object({
		web: object({
			uri: string(),
			title: string().nullish()
		}).nullish(),
		retrievedContext: object({
			uri: string().nullish(),
			title: string().nullish(),
			text: string().nullish(),
			fileSearchStore: string().nullish()
		}).nullish(),
		maps: object({
			uri: string().nullish(),
			title: string().nullish(),
			text: string().nullish(),
			placeId: string().nullish()
		}).nullish()
	})).nullish(),
	groundingSupports: array(object({
		segment: object({
			startIndex: number().nullish(),
			endIndex: number().nullish(),
			text: string().nullish()
		}),
		segment_text: string().nullish(),
		groundingChunkIndices: array(number()).nullish(),
		supportChunkIndices: array(number()).nullish(),
		confidenceScores: array(number()).nullish(),
		confidenceScore: array(number()).nullish()
	})).nullish(),
	retrievalMetadata: union([object({ webDynamicRetrievalScore: number() }), object({})]).nullish()
});
var getContentSchema = () => object({ parts: array(union([
	object({
		functionCall: object({
			name: string(),
			args: unknown()
		}),
		thoughtSignature: string().nullish()
	}),
	object({
		inlineData: object({
			mimeType: string(),
			data: string()
		}),
		thoughtSignature: string().nullish()
	}),
	object({
		executableCode: object({
			language: string(),
			code: string()
		}).nullish(),
		codeExecutionResult: object({
			outcome: string(),
			output: string()
		}).nullish(),
		text: string().nullish(),
		thought: boolean().nullish(),
		thoughtSignature: string().nullish()
	})
])).nullish() });
var getSafetyRatingSchema = () => object({
	category: string().nullish(),
	probability: string().nullish(),
	probabilityScore: number().nullish(),
	severity: string().nullish(),
	severityScore: number().nullish(),
	blocked: boolean().nullish()
});
var usageSchema = object({
	cachedContentTokenCount: number().nullish(),
	thoughtsTokenCount: number().nullish(),
	promptTokenCount: number().nullish(),
	candidatesTokenCount: number().nullish(),
	totalTokenCount: number().nullish(),
	trafficType: string().nullish()
});
var getUrlContextMetadataSchema = () => object({ urlMetadata: array(object({
	retrievedUrl: string(),
	urlRetrievalStatus: string()
})) });
var responseSchema = lazySchema(() => zodSchema(object({
	candidates: array(object({
		content: getContentSchema().nullish().or(object({}).strict()),
		finishReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish(),
		groundingMetadata: getGroundingMetadataSchema().nullish(),
		urlContextMetadata: getUrlContextMetadataSchema().nullish()
	})),
	usageMetadata: usageSchema.nullish(),
	promptFeedback: object({
		blockReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish()
	}).nullish()
})));
var chunkSchema = lazySchema(() => zodSchema(object({
	candidates: array(object({
		content: getContentSchema().nullish(),
		finishReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish(),
		groundingMetadata: getGroundingMetadataSchema().nullish(),
		urlContextMetadata: getUrlContextMetadataSchema().nullish()
	})).nullish(),
	usageMetadata: usageSchema.nullish(),
	promptFeedback: object({
		blockReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish()
	}).nullish()
})));
var codeExecution = createProviderToolFactoryWithOutputSchema({
	id: "google.code_execution",
	inputSchema: object({
		language: string().describe("The programming language of the code."),
		code: string().describe("The code to be executed.")
	}),
	outputSchema: object({
		outcome: string().describe("The outcome of the execution (e.g., \"OUTCOME_OK\")."),
		output: string().describe("The output from the code execution.")
	})
});
var enterpriseWebSearch = createProviderToolFactory({
	id: "google.enterprise_web_search",
	inputSchema: lazySchema(() => zodSchema(object({})))
});
var fileSearchArgsBaseSchema = object({
	fileSearchStoreNames: array(string()).describe("The names of the file_search_stores to retrieve from. Example: `fileSearchStores/my-file-search-store-123`"),
	topK: number().int().positive().describe("The number of file search retrieval chunks to retrieve.").optional(),
	metadataFilter: string().describe("Metadata filter to apply to the file search retrieval documents. See https://google.aip.dev/160 for the syntax of the filter expression.").optional()
}).passthrough();
var fileSearch = createProviderToolFactory({
	id: "google.file_search",
	inputSchema: lazySchema(() => zodSchema(fileSearchArgsBaseSchema))
});
var googleMaps = createProviderToolFactory({
	id: "google.google_maps",
	inputSchema: lazySchema(() => zodSchema(object({})))
});
var googleTools = {
	googleSearch: createProviderToolFactory({
		id: "google.google_search",
		inputSchema: lazySchema(() => zodSchema(object({
			mode: _enum(["MODE_DYNAMIC", "MODE_UNSPECIFIED"]).default("MODE_UNSPECIFIED"),
			dynamicThreshold: number().default(1)
		})))
	}),
	enterpriseWebSearch,
	googleMaps,
	urlContext: createProviderToolFactory({
		id: "google.url_context",
		inputSchema: lazySchema(() => zodSchema(object({})))
	}),
	fileSearch,
	codeExecution,
	vertexRagStore: createProviderToolFactory({
		id: "google.vertex_rag_store",
		inputSchema: object({
			ragCorpus: string(),
			topK: number().optional()
		})
	})
};
var GoogleGenerativeAIImageModel = class {
	constructor(modelId, settings, config) {
		this.modelId = modelId;
		this.settings = settings;
		this.config = config;
		this.specificationVersion = "v3";
	}
	get maxImagesPerCall() {
		var _a;
		return (_a = this.settings.maxImagesPerCall) != null ? _a : 4;
	}
	get provider() {
		return this.config.provider;
	}
	async doGenerate(options) {
		var _a, _b, _c;
		const { prompt, n = 1, size, aspectRatio = "1:1", seed, providerOptions, headers, abortSignal, files, mask } = options;
		const warnings = [];
		if (files != null && files.length > 0) throw new Error("Google Generative AI does not support image editing. Use Google Vertex AI (@ai-sdk/google-vertex) for image editing capabilities.");
		if (mask != null) throw new Error("Google Generative AI does not support image editing with masks. Use Google Vertex AI (@ai-sdk/google-vertex) for image editing capabilities.");
		if (size != null) warnings.push({
			type: "unsupported",
			feature: "size",
			details: "This model does not support the `size` option. Use `aspectRatio` instead."
		});
		if (seed != null) warnings.push({
			type: "unsupported",
			feature: "seed",
			details: "This model does not support the `seed` option through this provider."
		});
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleImageProviderOptionsSchema
		});
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const parameters = { sampleCount: n };
		if (aspectRatio != null) parameters.aspectRatio = aspectRatio;
		if (googleOptions) Object.assign(parameters, googleOptions);
		const body = {
			instances: [{ prompt }],
			parameters
		};
		const { responseHeaders, value: response } = await postJsonToApi({
			url: `${this.config.baseURL}/models/${this.modelId}:predict`,
			headers: combineHeaders(await resolve(this.config.headers), headers),
			body,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleImageResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			images: response.predictions.map((p) => p.bytesBase64Encoded),
			warnings: warnings != null ? warnings : [],
			providerMetadata: { google: { images: response.predictions.map((prediction) => ({})) } },
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			}
		};
	}
};
var googleImageResponseSchema = lazySchema(() => zodSchema(object({ predictions: array(object({ bytesBase64Encoded: string() })).default([]) })));
var googleImageProviderOptionsSchema = lazySchema(() => zodSchema(object({
	personGeneration: _enum([
		"dont_allow",
		"allow_adult",
		"allow_all"
	]).nullish(),
	aspectRatio: _enum([
		"1:1",
		"3:4",
		"4:3",
		"9:16",
		"16:9"
	]).nullish()
})));
function createGoogleGenerativeAI(options = {}) {
	var _a, _b;
	const baseURL = (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : "https://generativelanguage.googleapis.com/v1beta";
	const providerName = (_b = options.name) != null ? _b : "google.generative-ai";
	const getHeaders = () => withUserAgentSuffix({
		"x-goog-api-key": loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "GOOGLE_GENERATIVE_AI_API_KEY",
			description: "Google Generative AI"
		}),
		...options.headers
	}, `ai-sdk/google/${VERSION}`);
	const createChatModel = (modelId) => {
		var _a2;
		return new GoogleGenerativeAILanguageModel(modelId, {
			provider: providerName,
			baseURL,
			headers: getHeaders,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId,
			supportedUrls: () => ({ "*": [
				/* @__PURE__ */ new RegExp(`^${baseURL}/files/.*$`),
				/* @__PURE__ */ new RegExp(`^https://(?:www\\.)?youtube\\.com/watch\\?v=[\\w-]+(?:&[\\w=&.-]*)?$`),
				/* @__PURE__ */ new RegExp(`^https://youtu\\.be/[\\w-]+(?:\\?[\\w=&.-]*)?$`)
			] }),
			fetch: options.fetch
		});
	};
	const createEmbeddingModel = (modelId) => new GoogleGenerativeAIEmbeddingModel(modelId, {
		provider: providerName,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createImageModel = (modelId, settings = {}) => new GoogleGenerativeAIImageModel(modelId, settings, {
		provider: providerName,
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const provider = function(modelId) {
		if (new.target) throw new Error("The Google Generative AI model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.specificationVersion = "v3";
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.generativeAI = createChatModel;
	provider.embedding = createEmbeddingModel;
	provider.embeddingModel = createEmbeddingModel;
	provider.textEmbedding = createEmbeddingModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.image = createImageModel;
	provider.imageModel = createImageModel;
	provider.tools = googleTools;
	return provider;
}
createGoogleGenerativeAI();
export { createGoogleGenerativeAI as t };

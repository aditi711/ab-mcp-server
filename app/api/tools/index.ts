// Export all tool configurations and handlers

// Agent tool
export { agentToolConfig, createAgentHandler } from './agent';

// Python tool
export { pythonToolConfig, pythonHandler } from './python';

// Web scraping tools
export {
  webScraperConfig,
  webScraperHandler,
  urlAnalyzerConfig,
  urlAnalyzerHandler,
  batchScraperConfig,
  batchScraperHandler,
  researchAssistantConfig,
  researchAssistantHandler,
  type McpResponse as WebScrapingMcpResponse
} from './web-scraping';

// Swift tool
export { swiftCodeReviewConfig, swiftCodeReviewHandler } from './swift';

// Kotlin tool
export { kotlinCodeReviewConfig, kotlinCodeReviewHandler } from './kotlin';

// Server info tool
export { serverInfoConfig, serverInfoHandler } from './server';

// Common types
export interface CommonMcpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

// Tool configuration interface
export interface ToolConfig {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
}

// Tool handler type
export type ToolHandler<T = any> = (params: T) => Promise<CommonMcpResponse>; 
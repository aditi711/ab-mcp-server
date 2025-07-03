import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

// Validate API keys on startup
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not set in environment variables');
  console.error('Please create a .env.local file with your OpenAI API key');
}

if (!process.env.FIRECRAWL_API_KEY) {
  console.error('⚠️ FIRECRAWL_API_KEY is not set in environment variables');
  console.error('Add FIRECRAWL_API_KEY to your .env.local file for web scraping features');
}

// Import all tools
import {
  agentToolConfig,
  createAgentHandler,
  pythonToolConfig,
  pythonHandler,
  webScraperConfig,
  webScraperHandler,
  urlAnalyzerConfig,
  urlAnalyzerHandler,
  batchScraperConfig,
  batchScraperHandler,
  researchAssistantConfig,
  researchAssistantHandler,
  swiftCodeReviewConfig,
  swiftCodeReviewHandler,
  kotlinCodeReviewConfig,
  kotlinCodeReviewHandler,
  serverInfoConfig,
  serverInfoHandler
} from "../tools";

// Agent tool functions that will be passed in
interface AgentToolFunctions {
  swift_code_review: (code: string, focus?: string) => Promise<string>;
  kotlin_code_review: (code: string, focus?: string) => Promise<string>;
  python_exec: (code: string, packages?: string[]) => Promise<string>;
  web_scraper: (url: string, options?: { onlyMainContent?: boolean }) => Promise<string>;
  url_analyzer: (url: string) => Promise<string>;
  batch_scraper: (urls: string[], options?: { onlyMainContent?: boolean }) => Promise<string>;
  research_assistant: (query: string, language?: string) => Promise<string>;
}

// Define proper MCP response type
interface CommonMcpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

// Define proper MCP handler type
type McpToolHandler<T = any> = (params: T) => Promise<CommonMcpResponse>;

const handler = createMcpHandler(
  (server) => {
    // Create the tool functions that the agent will use
    const agentToolFunctions: AgentToolFunctions = {
      swift_code_review: async (code: string, focus?: string) => {
        const result = await swiftCodeReviewHandler({ code, focus });
        return result.content[0].text;
      },
      kotlin_code_review: async (code: string, focus?: string) => {
        const result = await kotlinCodeReviewHandler({ code, focus });
        return result.content[0].text;
      },
      python_exec: async (code: string, packages?: string[]) => {
        const result = await pythonHandler({ code, packages });
        return result.content[0].text;
      },
      web_scraper: async (url: string, options?: { onlyMainContent?: boolean }) => {
        const result = await webScraperHandler({ url, onlyMainContent: options?.onlyMainContent });
        return result.content[0].text;
      },
      url_analyzer: async (url: string) => {
        const result = await urlAnalyzerHandler({ url });
        return result.content[0].text;
      },
      batch_scraper: async (urls: string[], options?: { onlyMainContent?: boolean }) => {
        const result = await batchScraperHandler({ urls, onlyMainContent: options?.onlyMainContent });
        return result.content[0].text;
      },
      research_assistant: async (query: string, language?: string) => {
        const result = await researchAssistantHandler({ query, language });
        return result.content[0].text;
      },
    };

    const agentHandler = createAgentHandler(agentToolFunctions);

    // Helper function to wrap handlers with proper typing
    const wrapHandler = <T>(handler: McpToolHandler<T>) => {
      return async (params: T) => {
        const result = await handler(params);
        return {
          content: result.content.map(item => ({
            type: "text" as const,
            text: item.text,
          })),
        };
      };
    };

    // Register Agent Tool
    server.tool(
      agentToolConfig.name,
      agentToolConfig.description,
      agentToolConfig.inputSchema,
      wrapHandler(agentHandler)
    );

    // Register Python Tool
    server.tool(
      pythonToolConfig.name,
      pythonToolConfig.description,
      pythonToolConfig.inputSchema,
      wrapHandler(pythonHandler)
    );

    // Register Web Scraper Tool
    server.tool(
      webScraperConfig.name,
      webScraperConfig.description,
      webScraperConfig.inputSchema,
      wrapHandler(webScraperHandler)
    );

    // Register URL Analyzer Tool
    server.tool(
      urlAnalyzerConfig.name,
      urlAnalyzerConfig.description,
      urlAnalyzerConfig.inputSchema,
      wrapHandler(urlAnalyzerHandler)
    );

    // Register Batch Scraper Tool
    server.tool(
      batchScraperConfig.name,
      batchScraperConfig.description,
      batchScraperConfig.inputSchema,
      wrapHandler(batchScraperHandler)
    );

    // Register Research Assistant Tool
    server.tool(
      researchAssistantConfig.name,
      researchAssistantConfig.description,
      researchAssistantConfig.inputSchema,
      wrapHandler(researchAssistantHandler)
    );

    // Register Swift Code Review Tool
    server.tool(
      swiftCodeReviewConfig.name,
      swiftCodeReviewConfig.description,
      swiftCodeReviewConfig.inputSchema,
      wrapHandler(swiftCodeReviewHandler)
    );

    // Register Kotlin Code Review Tool
    server.tool(
      kotlinCodeReviewConfig.name,
      kotlinCodeReviewConfig.description,
      kotlinCodeReviewConfig.inputSchema,
      wrapHandler(kotlinCodeReviewHandler)
    );

    // Register Server Info Tool
    server.tool(
      serverInfoConfig.name,
      serverInfoConfig.description,
      serverInfoConfig.inputSchema,
      wrapHandler(serverInfoHandler)
    );
  }
);

export { handler as GET, handler as POST }; 
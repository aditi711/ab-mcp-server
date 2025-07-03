import { z } from "zod";

// Define proper MCP response type
export interface McpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

export const serverInfoConfig = {
  name: "server_info",
  description: "Get information about available MCP tools and server capabilities",
  inputSchema: {},
};

export const serverInfoHandler = async (): Promise<McpResponse> => {
  const toolsInfo = `🤖 **MCP Server Information**

**Available Tools:**

🤖 **agent** - AI assistant with auto-tool detection
  • Comprehensive AI assistant using OpenAI's GPT models
  • Automatically detects and uses appropriate tools based on user input
  • Supports Swift code review, Python execution, and web scraping
  • Keywords: general AI assistance, any question or task

📱 **swift_code_review** - Swift/iOS code analysis
  • Comprehensive review of Swift and iOS code
  • Detects force unwrapping, retain cycles, SwiftUI best practices
  • Focus areas: performance, memory, security, architecture
  • Keywords: "swift", "ios", "review", "analyze"

🐍 **python_exec** - Python code execution
  • Execute Python code with data science libraries
  • Pre-installed: pandas, numpy, matplotlib, seaborn
  • Dynamic package installation support
  • Keywords: "python", "run", "execute", "data analysis"

🌐 **web_scraper** - Website content extraction
  • Clean, readable content extraction from websites
  • Powered by Firecrawl for reliable scraping
  • Handles JavaScript-rendered content
  • Keywords: "scrape", "extract", "website content"

🔍 **url_analyzer** - Website SEO and metadata analysis
  • Comprehensive website analysis for SEO insights
  • Metadata extraction, content metrics, technical details
  • Open Graph and social media optimization checks
  • Keywords: "analyze", "seo", "metadata", "website analysis"

📊 **batch_scraper** - Multiple URL processing
  • Process up to 5 URLs simultaneously
  • Parallel processing for efficiency
  • Ideal for comparing multiple websites
  • Keywords: "batch", "multiple urls", "scrape all"

**Environment Requirements:**
• OPENAI_API_KEY - Required for AI agent functionality
• FIRECRAWL_API_KEY - Required for web scraping features

**Usage Tips:**
• The AI agent can automatically select and use appropriate tools
• Provide code in markdown blocks for better tool detection
• Use specific keywords to trigger targeted tool usage
• The agent provides helpful suggestions and follow-up recommendations

**Server Status:** ✅ Operational
**Total Tools:** 7 (including this server_info tool)`;

  return {
    content: [
      {
        type: "text",
        text: toolsInfo,
      },
    ],
  };
}; 
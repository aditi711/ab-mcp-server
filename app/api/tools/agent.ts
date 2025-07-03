import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Agent tool functions that will be passed in
export interface AgentToolFunctions {
  swift_code_review: (code: string, focus?: string) => Promise<string>;
  kotlin_code_review: (code: string, focus?: string) => Promise<string>;
  python_exec: (code: string, packages?: string[]) => Promise<string>;
  web_scraper: (url: string, options?: { onlyMainContent?: boolean }) => Promise<string>;
  url_analyzer: (url: string) => Promise<string>;
  batch_scraper: (urls: string[], options?: { onlyMainContent?: boolean }) => Promise<string>;
  research_assistant: (query: string, language?: string) => Promise<string>;
}

// Define proper MCP response type
export interface McpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

export const agentToolConfig = {
  name: "agent",
  description: "AI assistant that can help with various tasks using OpenAI's GPT model and integrated tools (swift_code_review, kotlin_code_review, python_exec, web_scraper, url_analyzer, batch_scraper, research_assistant)",
  inputSchema: {
    prompt: z.string().describe("The question or task for the AI agent"),
    system_prompt: z.string().optional().describe("Optional system prompt to set the agent's behavior"),
    model: z.string().optional().describe("OpenAI model to use (default: gpt-4o-mini)"),
    use_tools: z.boolean().optional().describe("Whether the agent can use integrated tools (default: true)"),
  },
};

export function createAgentHandler(availableTools: AgentToolFunctions) {
  return async ({ prompt, system_prompt, model, use_tools = true }: {
    prompt: string;
    system_prompt?: string;
    model?: string;
    use_tools?: boolean;
  }): Promise<McpResponse> => {
    try {
      // Initialize OpenAI
      if (!process.env.OPENAI_API_KEY) {
        return {
          content: [
            {
              type: "text",
              text: "❌ OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.",
            },
          ],
        };
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const messages: Array<{ role: string; content: string }> = [];
      
      // Enhanced system prompt with tool capabilities
      const defaultSystemPrompt = `You are a helpful AI assistant integrated into an MCP server with access to powerful development tools. You can automatically detect user needs and use the appropriate tools.

${use_tools ? `🔧 **AVAILABLE TOOLS & WHEN TO USE THEM:**

📱 **swift_code_review(code, focus?)** - Use when:
- User provides Swift/iOS code for review
- Keywords: "review", "analyze", "check", "Swift", "iOS", "Xcode"
- Focus areas: "performance", "memory", "security", "architecture", "clean_code", "solid_principles"
- Code blocks: \`\`\`swift or \`\`\` with iOS-related content
- Examples: "Review this Swift code", "Check my iOS app for memory leaks"

🤖 **kotlin_code_review(code, focus?)** - Use when:
- User provides Kotlin/Android code for review
- Keywords: "review", "analyze", "check", "Kotlin", "Android", "MVVM"
- Focus areas: "performance", "memory", "security", "architecture", "clean_code", "solid_principles"
- Code blocks: \`\`\`kotlin or \`\`\` with Android-related content
- Examples: "Review this Kotlin code", "Check my Android app architecture"

🐍 **python_exec(code, packages?)** - Use when:
- User wants to run Python code or data analysis
- Keywords: "python", "run", "execute", "analyze data", "pandas", "numpy"
- Code blocks: \`\`\`python
- Examples: "Run this Python script", "Analyze this dataset", "Create a chart"

🔍 **research_assistant(query, language?)** - Use when:
- User wants to research Swift or Kotlin documentation
- Keywords: "research", "documentation", "Swift docs", "Kotlin docs", "find info", "learn about"
- Language focus: "swift", "kotlin", or "both"
- Examples: "Research async/await in Swift", "Find Kotlin coroutines documentation", "Learn about SwiftUI"

🌐 **web_scraper(url, options?)** - Use when:
- User wants to extract content from a website
- Keywords: "scrape", "extract", "get content", "website data"
- Contains URLs: http:// or https://
- Examples: "Scrape this website", "Get the content from URL"

🔍 **url_analyzer(url)** - Use when:
- User wants SEO analysis or website insights
- Keywords: "analyze", "SEO", "website analysis", "check URL"
- Contains URLs for analysis purposes
- Examples: "Analyze this website for SEO", "Check the metadata of this page"

📊 **batch_scraper(urls, options?)** - Use when:
- User provides multiple URLs to scrape
- Keywords: "batch", "multiple", "scrape all", "several URLs"
- Multiple URLs in the request
- Examples: "Scrape these 3 websites", "Get content from all these URLs"

🤖 **AUTO-DETECTION LOGIC:**
1. **Look for code blocks** - If \`\`\`swift → swift_code_review, \`\`\`kotlin → kotlin_code_review, \`\`\`python → python_exec
2. **Check research intent** - "research", "documentation", "learn about" → use research_assistant
3. **Check keywords** - Match user intent with tool capabilities
4. **Count URLs** - Single URL → web_scraper/url_analyzer, Multiple URLs → batch_scraper
5. **Context matters** - "analyze URL" = url_analyzer, "scrape URL" = web_scraper
6. **Be proactive** - Suggest tools when user needs aren't explicit

📝 **RESPONSE FORMAT:**
1. Acknowledge the user's request
2. Explain which tool you're using and why
3. Execute the tool automatically
4. Provide the results with helpful context
5. Offer follow-up suggestions when appropriate

**EXAMPLES:**
- "I see Swift code in your message. Let me review it for best practices using the Swift code review tool..."
- "You want to research Swift documentation. I'll use the research assistant to find relevant information..."
- "You've provided a URL for analysis. I'll use the URL analyzer to check its SEO and metadata..."
- "I notice Python code that needs execution. Running it now with pandas and numpy support..."
- "Multiple URLs detected. Using batch scraper to process all of them efficiently..."` : ''}

Always be helpful, accurate, and proactive in tool usage. Explain your actions clearly and provide valuable insights.`;
      
      if (system_prompt) {
        messages.push({ role: "system", content: system_prompt });
      } else {
        messages.push({ role: "system", content: defaultSystemPrompt });
      }
      
      // Add user prompt
      messages.push({ role: "user", content: prompt });
      
      const response = await openai.chat.completions.create({
        model: model || "gpt-4o-mini",
        messages: messages as any,
        max_tokens: 1500,
        temperature: 0.7,
      });
      
      let content = response.choices[0]?.message?.content || "No response generated";
      
      // If tools are enabled, check if the AI wants to use any tools
      if (use_tools) {
        // Look for tool usage patterns in the response
        const toolResults: string[] = [];
        
        // Check if the prompt suggests tool usage
        const lowerPrompt = prompt.toLowerCase();
        
        // Enhanced auto-detection with comprehensive keyword matching
        const urlMatches = prompt.match(/(https?:\/\/[^\s]+)/g);
        const hasUrls = urlMatches && urlMatches.length > 0;
        const hasMultipleUrls = urlMatches && urlMatches.length > 1;
        
        // Swift Code Review Detection
        const swiftKeywords = ['swift', 'ios', 'xcode', 'swiftui', 'uikit', 'objective-c'];
        const reviewKeywords = ['review', 'analyze', 'check', 'audit', 'inspect', 'examine', 'validate'];
        const hasSwiftContext = swiftKeywords.some(keyword => lowerPrompt.includes(keyword));
        const hasReviewContext = reviewKeywords.some(keyword => lowerPrompt.includes(keyword));
        
        const swiftCodeMatch = prompt.match(/```swift\n([\s\S]*?)\n```/) || 
                             (hasSwiftContext && prompt.match(/```\n([\s\S]*?)\n```/));
                             
        if ((hasSwiftContext && hasReviewContext) || swiftCodeMatch) {
          if (swiftCodeMatch) {
            const code = swiftCodeMatch[1];
            const focus = lowerPrompt.includes('performance') ? 'performance' :
                         lowerPrompt.includes('memory') ? 'memory' :
                         lowerPrompt.includes('security') ? 'security' :
                         lowerPrompt.includes('architecture') ? 'architecture' : undefined;
            const swiftResult = await availableTools.swift_code_review(code, focus);
            toolResults.push(`📱 **Swift Code Review Result:**\n${swiftResult}`);
          } else {
            toolResults.push(`📱 **Swift Code Review:**\nI can help review Swift/iOS code! Please provide your Swift code in a code block like:\n\`\`\`swift\n// Your Swift code here\n\`\`\``);
          }
        }
        
        // Kotlin Code Review Detection
        const kotlinKeywords = ['kotlin', 'android', 'viewmodel', 'coroutines', 'hilt', 'room'];
        const hasKotlinContext = kotlinKeywords.some(keyword => lowerPrompt.includes(keyword));
        
        const kotlinCodeMatch = prompt.match(/```kotlin\n([\s\S]*?)\n```/) || 
                               (hasKotlinContext && prompt.match(/```\n([\s\S]*?)\n```/));
                               
        if ((hasKotlinContext && hasReviewContext) || kotlinCodeMatch) {
          if (kotlinCodeMatch) {
            const code = kotlinCodeMatch[1];
            const focus = lowerPrompt.includes('performance') ? 'performance' :
                         lowerPrompt.includes('memory') ? 'memory' :
                         lowerPrompt.includes('security') ? 'security' :
                         lowerPrompt.includes('architecture') ? 'architecture' : undefined;
            const kotlinResult = await availableTools.kotlin_code_review(code, focus);
            toolResults.push(`🤖 **Kotlin Code Review Result:**\n${kotlinResult}`);
          } else {
            toolResults.push(`🤖 **Kotlin Code Review:**\nI can help review Kotlin/Android code! Please provide your Kotlin code in a code block like:\n\`\`\`kotlin\n// Your Kotlin code here\n\`\`\``);
          }
        }
        
        // Python Execution Detection
        const pythonKeywords = ['python', 'pandas', 'numpy', 'matplotlib', 'data analysis', 'script'];
        const executeKeywords = ['run', 'execute', 'compute', 'calculate', 'process', 'analyze'];
        const hasPythonContext = pythonKeywords.some(keyword => lowerPrompt.includes(keyword));
        const hasExecuteContext = executeKeywords.some(keyword => lowerPrompt.includes(keyword));
        
        const pythonCodeMatch = prompt.match(/```python\n([\s\S]*?)\n```/) ||
                               (hasPythonContext && prompt.match(/```\n([\s\S]*?)\n```/));
                               
        if ((hasPythonContext && hasExecuteContext) || pythonCodeMatch) {
          if (pythonCodeMatch) {
            const code = pythonCodeMatch[1];
            const pythonResult = await availableTools.python_exec(code);
            toolResults.push(`🐍 **Python Execution Result:**\n${pythonResult}`);
          } else {
            toolResults.push(`🐍 **Python Execution:**\nI can run Python code with pandas, numpy, matplotlib! Please provide your Python code in a code block like:\n\`\`\`python\n# Your Python code here\n\`\`\``);
          }
        }
        
        // Research Assistant Detection
        const researchKeywords = ['research', 'documentation', 'docs', 'find info', 'learn about', 'documentation for', 'how to', 'tutorial', 'guide'];
        const languageKeywords = ['swift', 'kotlin', 'swiftui', 'uikit', 'coroutines', 'async/await'];
        const hasResearchContext = researchKeywords.some(keyword => lowerPrompt.includes(keyword));
        const hasLanguageContext = languageKeywords.some(keyword => lowerPrompt.includes(keyword));
        
        // Don't trigger research if we already found code to review/execute
        if ((hasResearchContext && hasLanguageContext) && !swiftCodeMatch && !kotlinCodeMatch && !pythonCodeMatch) {
          const language = lowerPrompt.includes('swift') ? 'swift' :
                          lowerPrompt.includes('kotlin') ? 'kotlin' : 'both';
          const researchResult = await availableTools.research_assistant(prompt, language);
          toolResults.push(`🔍 **Research Assistant Result:**\n${researchResult}`);
        }
        
        // Batch Scraping Detection (check for multiple URLs first)
        const batchKeywords = ['batch', 'multiple', 'all', 'several', 'many'];
        const hasBatchContext = batchKeywords.some(keyword => lowerPrompt.includes(keyword));
        
        if (hasMultipleUrls || (hasUrls && hasBatchContext)) {
          const urls = urlMatches.slice(0, 5); // Limit to 5 URLs
          const batchResult = await availableTools.batch_scraper(urls);
          toolResults.push(`📊 **Batch Scraping Result:**\n${batchResult}`);
        }
        // URL Analysis Detection (single URL, analysis intent)
        else if (hasUrls) {
          const analyzeKeywords = ['analyze', 'analysis', 'seo', 'metadata', 'check', 'inspect', 'audit'];
          const scrapeKeywords = ['scrape', 'extract', 'content', 'text', 'data', 'get'];
          
          const hasAnalyzeContext = analyzeKeywords.some(keyword => lowerPrompt.includes(keyword));
          const hasScrapeContext = scrapeKeywords.some(keyword => lowerPrompt.includes(keyword));
          
          const url = urlMatches[0];
          
          if (hasAnalyzeContext || lowerPrompt.includes('seo')) {
            const analyzeResult = await availableTools.url_analyzer(url);
            toolResults.push(`🔍 **URL Analysis Result:**\n${analyzeResult}`);
          } else if (hasScrapeContext || lowerPrompt.includes('content')) {
            const scrapeResult = await availableTools.web_scraper(url);
            toolResults.push(`🌐 **Web Scraping Result:**\n${scrapeResult}`);
          } else {
            // Default to scraping for URLs without clear intent
            const scrapeResult = await availableTools.web_scraper(url);
            toolResults.push(`🌐 **Web Scraping Result:**\n${scrapeResult}`);
          }
        }
        
        // Help suggestions when no tools are triggered
        if (toolResults.length === 0 && !hasUrls && !swiftCodeMatch && !kotlinCodeMatch && !pythonCodeMatch) {
          const helpKeywords = ['help', 'what can you do', 'capabilities', 'tools', 'how to'];
          const hasHelpContext = helpKeywords.some(keyword => lowerPrompt.includes(keyword));
          
          if (hasHelpContext) {
            toolResults.push(`🔧 **Available Tools:**\n• **Swift Code Review**: Provide Swift/iOS code for comprehensive analysis\n• **Kotlin Code Review**: Provide Kotlin/Android code for comprehensive analysis\n• **Python Execution**: Run Python scripts with data science libraries\n• **Research Assistant**: Research Swift/Kotlin documentation and tutorials\n• **Web Scraping**: Extract content from websites\n• **URL Analysis**: SEO and metadata analysis\n• **Batch Processing**: Handle multiple URLs at once\n\nJust share your code, ask about documentation, or provide URLs and I'll automatically use the right tool!`);
          }
        }
        
        // Append tool results to the response
        if (toolResults.length > 0) {
          content += '\n\n---\n\n' + toolResults.join('\n\n');
        }
      }
      
      return {
        content: [
          {
            type: "text",
            text: `🤖 **AI Agent Response:**\n\n${content}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
          },
        ],
      };
    }
  };
}
import { z } from "zod";
import FirecrawlApp from "@mendable/firecrawl-js";

// Define proper MCP response type
export interface McpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

// Initialize Firecrawl
function getFirecrawl(): FirecrawlApp {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    throw new Error("FIRECRAWL_API_KEY environment variable is not set");
  }
  return new FirecrawlApp({ apiKey });
}

// Swift/Kotlin Research Assistant Tool
export const researchAssistantConfig = {
  name: "research_assistant",
  description: "Intelligent Swift/Kotlin research assistant that scrapes official documentation and finds the most relevant content based on user queries",
  inputSchema: {
    query: z.string().describe("What you want to research (e.g., 'async/await in Swift', 'coroutines in Kotlin', 'getting started guide')"),
    language: z.enum(["swift", "kotlin", "both"]).optional().describe("Programming language to focus on (default: both)"),
  },
};

export const researchAssistantHandler = async ({ query, language = "both" }: { 
  query: string; 
  language?: string; 
}): Promise<McpResponse> => {
  const instructions = `
You are a helpful Swift/Kotlin research assistant. You will:
1. Ask the user to describe what language they want to search for
2. Use the firecrawl_scrape tool to scrape for Swift https://www.swift.org/ and for Kotlin https://kotlinlang.org/
3. Analyze the scraped content to find the best page
4. Identify the most fitting page based on the user's description
5. If you find a specific job URL, scrape that page for more details
6. Finally present the page information to the user in a clear, concise manner (1 short paragraph, in bulletpoints)

Before and after each step in the process (run), say a few words about what you're looking for/or have seen.

Don't have to ask user throughout the process.
If tool calling fails, please try again.
Do not stop until you've provided the user with the actual job's description from the job page
Stick to 1 final job.
  `;

  try {
    const app = getFirecrawl();
    let results: string[] = [];
    
    // Step 1: Initial search setup
    results.push("🔍 **Starting Research Process**");
    results.push(`**Query:** ${query}`);
    results.push(`**Language Focus:** ${language}`);
    results.push("\n---\n");

    // Step 2: Scrape main documentation sites
    results.push("📡 **Scraping Official Documentation Sites**");
    
    const sitesToScrape: { name: string; url: string; language: string }[] = [];
    
    if (language === "swift" || language === "both") {
      sitesToScrape.push({ name: "Swift.org", url: "https://www.swift.org/", language: "swift" });
    }
    
    if (language === "kotlin" || language === "both") {
      sitesToScrape.push({ name: "KotlinLang.org", url: "https://kotlinlang.org/", language: "kotlin" });
    }

    const scrapedContent: { name: string; content: string; url: string; language: string }[] = [];

    for (const site of sitesToScrape) {
      try {
        results.push(`\n🌐 **Scraping ${site.name}** - Looking for documentation and relevant sections...`);
        
        const scrapeResult = await app.scrapeUrl(site.url, {
          formats: ['markdown'],
          onlyMainContent: true,
          waitFor: 2000
        });
        
        if (scrapeResult.success && (scrapeResult as any).data?.markdown) {
          const content = (scrapeResult as any).data.markdown;
          scrapedContent.push({
            name: site.name,
            content: content,
            url: site.url,
            language: site.language
          });
          
          results.push(`✅ **Successfully scraped ${site.name}** - Found ${content.length} characters of content`);
        } else {
          results.push(`❌ **Failed to scrape ${site.name}** - ${scrapeResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        results.push(`❌ **Error scraping ${site.name}** - ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    if (scrapedContent.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "❌ **Research Failed:** Could not scrape any documentation sites. Please try again later.",
          },
        ],
      };
    }

    // Step 3: Analyze content for relevance
    results.push("\n🧠 **Analyzing Content for Relevance**");
    results.push(`Looking for content related to: "${query}"`);

    const queryLower = query.toLowerCase();
    const queryKeywords = queryLower.split(' ').filter(word => word.length > 2);
    
    let bestMatch: { site: any; score: number; relevantSection: string } | null = null;

    for (const site of scrapedContent) {
      const contentLower = site.content.toLowerCase();
      let score = 0;
      let relevantSection = "";

      // Score based on keyword matches
      for (const keyword of queryKeywords) {
        const matches = (contentLower.match(new RegExp(keyword, 'g')) || []).length;
        score += matches;
      }

      // Find most relevant section (first 500 chars containing keywords)
      const sentences = site.content.split('\n').filter(line => line.trim().length > 0);
      for (const sentence of sentences) {
        const sentenceLower = sentence.toLowerCase();
        const keywordMatches = queryKeywords.filter(keyword => sentenceLower.includes(keyword)).length;
        
        if (keywordMatches > 0 && (!relevantSection || keywordMatches > 1)) {
          relevantSection = sentence.slice(0, 300) + (sentence.length > 300 ? "..." : "");
          if (keywordMatches > 1) break;
        }
      }

      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { site, score, relevantSection };
      }

      results.push(`📊 **${site.name}**: ${score} keyword matches found`);
    }

    // Step 4: Present findings
    results.push("\n🎯 **Research Results**");

    if (bestMatch) {
      results.push(`\n**Best Match Found:** ${bestMatch.site.name} (${bestMatch.site.language.toUpperCase()})`);
      results.push(`**Relevance Score:** ${bestMatch.score} keyword matches`);
      results.push(`**URL:** ${bestMatch.site.url}`);
      
      // Step 5: Look for specific documentation links
      const content = bestMatch.site.content;
      const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
      
      let specificLinks: string[] = [];
      for (const link of links.slice(0, 5)) { // Limit to first 5 links
        const linkLower = link.toLowerCase();
        const hasKeyword = queryKeywords.some(keyword => linkLower.includes(keyword));
        if (hasKeyword) {
          specificLinks.push(link);
        }
      }

      // Step 6: Final presentation
      results.push("\n📋 **Key Information Found:**");
      
      if (bestMatch.relevantSection) {
        results.push(`\n**Relevant Content Preview:**`);
        results.push(bestMatch.relevantSection);
      }

      if (specificLinks.length > 0) {
        results.push(`\n**Related Documentation Links:**`);
        specificLinks.forEach(link => {
          results.push(`• ${link}`);
        });
      }

      // Summary bullets
      results.push(`\n**Summary:**`);
      results.push(`• **Language:** ${bestMatch.site.language.toUpperCase()}`);
      results.push(`• **Source:** ${bestMatch.site.name}`);
      results.push(`• **Topic Relevance:** ${bestMatch.score} matches for "${query}"`);
      results.push(`• **Documentation Status:** ${bestMatch.relevantSection ? 'Found relevant content' : 'General information available'}`);
      results.push(`• **Next Steps:** Visit ${bestMatch.site.url} for complete documentation`);
      
    } else {
      results.push("❌ **No specific matches found** for your query in the scraped content.");
      results.push("\n**Available Content:**");
      scrapedContent.forEach(site => {
        results.push(`• **${site.name}** (${site.language.toUpperCase()}): ${site.content.slice(0, 200)}...`);
      });
    }

    const finalResult = results.join('\n');

    return {
      content: [
        {
          type: "text",
          text: finalResult,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ **Research Assistant Error:** ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
    };
  }
};

// Web Scraper Tool
export const webScraperConfig = {
  name: "web_scraper",
  description: "Extract clean, readable content from websites using advanced web scraping",
  inputSchema: {
    url: z.string().url().describe("URL to scrape"),
    onlyMainContent: z.boolean().optional().describe("Extract only main content, filtering out navigation and ads (default: true)"),
  },
};

export const webScraperHandler = async ({ url, onlyMainContent = true }: { 
  url: string; 
  onlyMainContent?: boolean; 
}): Promise<McpResponse> => {
  try {
    const app = getFirecrawl();
    
    const scrapeResult = await app.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent,
      waitFor: 2000
    });
    
    if (scrapeResult.success && (scrapeResult as any).data?.markdown) {
      const content = (scrapeResult as any).data.markdown;
      const title = (scrapeResult as any).data.metadata?.title || 'No title';
      
      return {
        content: [
          {
            type: "text",
            text: `🌐 **Website Content Extracted**\n\n**URL:** ${url}\n**Title:** ${title}\n\n**Content:**\n${content.slice(0, 8000)}${content.length > 8000 ? '\n\n...(content truncated)' : ''}`,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: `❌ **Failed to scrape:** ${url}\nError: ${scrapeResult.error || 'Unknown error'}`,
          },
        ],
      };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ **Error scraping website:** ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
    };
  }
};

// URL Analyzer Tool
export const urlAnalyzerConfig = {
  name: "url_analyzer",
  description: "Analyze websites for SEO, metadata, and technical insights",
  inputSchema: {
    url: z.string().url().describe("URL to analyze"),
  },
};

export const urlAnalyzerHandler = async ({ url }: { url: string }): Promise<McpResponse> => {
  try {
    const app = getFirecrawl();
    
    const scrapeResult = await app.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: false,
      waitFor: 2000
    });
    
    if (scrapeResult.success && (scrapeResult as any).data) {
      const metadata = (scrapeResult as any).data.metadata || {};
      const content = (scrapeResult as any).data.markdown || '';
      
      // Analyze content
      const wordCount = content.split(/\s+/).filter((word: string) => word.length > 0).length;
      const readingTime = Math.ceil(wordCount / 200); // ~200 words per minute
      
      // Check for common SEO elements
      const hasH1 = content.includes('# ');
      const hasH2 = content.includes('## ');
      const hasLinks = content.includes('[');
      
      const analysis = `🔍 **Website Analysis Report**

**URL:** ${url}
**Title:** ${metadata.title || 'No title found'}
**Description:** ${metadata.description || 'No meta description'}

**SEO Analysis:**
• Title: ${metadata.title ? '✅ Present' : '❌ Missing'}
• Meta Description: ${metadata.description ? '✅ Present' : '❌ Missing'}
• H1 Heading: ${hasH1 ? '✅ Found' : '❌ Not found'}
• H2 Headings: ${hasH2 ? '✅ Found' : '❌ Not found'}
• Internal Links: ${hasLinks ? '✅ Found' : '❌ None found'}

**Content Metrics:**
• Word Count: ${wordCount}
• Estimated Reading Time: ${readingTime} minute(s)
• Language: ${metadata.language || 'Not specified'}

**Technical Details:**
• Status Code: ${metadata.statusCode || 'Unknown'}
• Source URL: ${metadata.sourceURL || url}
• Favicon: ${metadata.favicon ? '✅ Present' : '❌ Missing'}

**Open Graph:**
• OG Title: ${metadata.ogTitle || 'Not set'}
• OG Description: ${metadata.ogDescription || 'Not set'}
• OG Image: ${metadata.ogImage ? '✅ Present' : '❌ Missing'}
• OG URL: ${metadata.ogUrl || 'Not set'}

**Additional Metadata:**
${Object.entries(metadata)
  .filter(([key]) => !['title', 'description', 'language', 'statusCode', 'sourceURL', 'favicon', 'ogTitle', 'ogDescription', 'ogImage', 'ogUrl'].includes(key))
  .map(([key, value]) => `• ${key}: ${value}`)
  .join('\n') || 'None'}`;

      return {
        content: [
          {
            type: "text",
            text: analysis,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: `❌ **Failed to analyze:** ${url}\nError: ${scrapeResult.error || 'Unknown error'}`,
          },
        ],
      };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ **Error analyzing website:** ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
    };
  }
};

// Batch Scraper Tool
export const batchScraperConfig = {
  name: "batch_scraper",
  description: "Scrape multiple URLs simultaneously (up to 5 URLs)",
  inputSchema: {
    urls: z.array(z.string().url()).max(5).describe("Array of URLs to scrape (maximum 5)"),
    onlyMainContent: z.boolean().optional().describe("Extract only main content, filtering out navigation and ads (default: true)"),
  },
};

export const batchScraperHandler = async ({ urls, onlyMainContent = true }: { 
  urls: string[]; 
  onlyMainContent?: boolean; 
}): Promise<McpResponse> => {
  try {
    if (urls.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "❌ **Error:** No URLs provided",
          },
        ],
      };
    }
    
    if (urls.length > 5) {
      return {
        content: [
          {
            type: "text",
            text: "❌ **Error:** Maximum 5 URLs allowed for batch scraping",
          },
        ],
      };
    }
    
    const app = getFirecrawl();
    
    // Process URLs in parallel
    const scrapePromises = urls.map(async (url, index) => {
      try {
        const scrapeResult = await app.scrapeUrl(url, {
          formats: ['markdown'],
          onlyMainContent,
          waitFor: 2000
        });
        
        if (scrapeResult.success && (scrapeResult as any).data?.markdown) {
          const content = (scrapeResult as any).data.markdown;
          const title = (scrapeResult as any).data.metadata?.title || 'No title';
          
          return `**${index + 1}. ${title}**\n**URL:** ${url}\n**Content Preview:**\n${content.slice(0, 1000)}${content.length > 1000 ? '...(truncated)' : ''}\n`;
        } else {
          return `**${index + 1}. Failed**\n**URL:** ${url}\n**Error:** ${scrapeResult.error || 'Unknown error'}\n`;
        }
      } catch (error) {
        return `**${index + 1}. Error**\n**URL:** ${url}\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n`;
      }
    });
    
    const scrapedResults = await Promise.all(scrapePromises);
    
    const finalResult = `📊 **Batch Scraping Results**\n\n**URLs Processed:** ${urls.length}\n\n${scrapedResults.join('\n---\n\n')}`;
    
    return {
      content: [
        {
          type: "text",
          text: finalResult,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ **Error in batch scraping:** ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
    };
  }
}; 
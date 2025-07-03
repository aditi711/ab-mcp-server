# AB MCP Server

A comprehensive Model Context Protocol (MCP) server built with [@vercel/mcp-adapter](https://github.com/vercel/mcp-adapter) providing advanced development utilities including AI agent assistance, Swift/Kotlin code review, Python integration, web scraping, and research capabilities.

```
┌─────────────────────────────────────────────────────────────────┐
│                        AB MCP SERVER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐    │
│  │   Web UI    │    │  MCP Server  │    │   External APIs │    │
│  │             │    │              │    │                 │    │
│  │ ┌─────────┐ │    │ ┌──────────┐ │    │ ┌─────────────┐ │    │
│  │ │ Agent   │◄┼────┼►│ Agent    │◄┼────┼►│ OpenAI GPT  │ │    │
│  │ │ Chat    │ │    │ │ Tool     │ │    │ │ Models      │ │    │
│  │ └─────────┘ │    │ └──────────┘ │    │ └─────────────┘ │    │
│  └─────────────┘    │              │    │                 │    │
│                     │ ┌──────────┐ │    │ ┌─────────────┐ │    │
│  ┌─────────────┐    │ │ Swift    │ │    │ │ Firecrawl   │ │    │
│  │   MCP       │    │ │ Review   │ │    │ │ API         │ │    │
│  │ Clients     │    │ └──────────┘ │    │ └─────────────┘ │    │
│  │             │◄───┼►             │    │                 │    │
│  │ • Claude    │    │ ┌──────────┐ │    │ ┌─────────────┐ │    │
│  │ • Cursor    │    │ │ Kotlin   │ │    │ │ Python      │ │    │
│  │ • Windsurf  │    │ │ Review   │ │    │ │ Runtime     │ │    │
│  └─────────────┘    │ └──────────┘ │    │ └─────────────┘ │    │
│                     │              │    └─────────────────┘    │
│                     │ ┌──────────┐ │                           │
│                     │ │ Python   │ │                           │
│                     │ │ Exec     │ │                           │
│                     │ └──────────┘ │                           │
│                     │              │                           │
│                     │ ┌──────────┐ │                           │
│                     │ │ Web      │ │                           │
│                     │ │ Scraping │ │                           │
│                     │ └──────────┘ │                           │
│                     │              │                           │
│                     │ ┌──────────┐ │                           │
│                     │ │ Research │ │                           │
│                     │ │ Assistant│ │                           │
│                     │ └──────────┘ │                           │
└─────────────────────────────────────────────────────────────────┘
```

## Features

### 🤖 **AI Agent Assistant**
- OpenAI GPT-powered intelligent assistant
- Available through MCP protocol and web interface
- Custom system prompts and model selection
- Real-time chat interface at `http://localhost:3000`

### 📱 **Swift iOS Code Review**
- Comprehensive Swift code analysis with best practices
- Memory management and retain cycle detection
- SwiftUI and UIKit pattern analysis
- Clean Code and Clean Architecture principles
- SOLID principles validation

### 🤖 **Kotlin Android Code Review** *(Coming Soon)*
- Complete Kotlin/Android code review capabilities
- Clean Architecture and MVVM pattern analysis
- Coroutines and lifecycle management best practices
- SOLID principles and dependency injection patterns
- Modern Android development guidelines

### 🐍 **Python Integration**
- Seamless TypeScript-to-Python execution
- Built-in data science packages (pandas, numpy, matplotlib, seaborn)
- Dynamic package installation capabilities
- Return type support (text, json, image)

### 🌐 **Web Scraping & Analysis**
- Advanced web scraping using Firecrawl API
- Clean data extraction from any website
- SEO analysis and content insights
- Batch scraping capabilities (up to 5 URLs)
- URL analysis with metadata extraction

### 🔍 **Research Assistant**
- Intelligent research capabilities for Swift/Kotlin documentation
- Automatic source discovery and content analysis
- Structured research results with relevance scoring
- Swift.org and kotlinlang.org specialized research

### ℹ️ **Server Information**
- Real-time server status and tool availability
- Performance metrics and system information

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file and add your API keys:
```bash
OPENAI_API_KEY=your-openai-api-key-here
FIRECRAWL_API_KEY=your-firecrawl-api-key-here
```

Get your API keys:
- **OpenAI**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Firecrawl**: [https://firecrawl.dev](https://firecrawl.dev)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the server status page and try the AI agent web interface.

## Usage

### Web Interface
- Visit `http://localhost:3000` to access the AI agent chat interface directly in your browser
- Configure model settings and system prompts through the web UI
- No additional setup required - works immediately after starting the server

### MCP Endpoint
The MCP server is available at: `http://localhost:3000/api/sse`

## Client Configuration

### Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ab-mcp-server": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "-y",
        "http://localhost:3000/api/sse"
      ]
    }
  }
}
```

### Cursor

Add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ab-mcp-server": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "-y",
        "http://localhost:3000/api/sse"
      ]
    }
  }
}
```

### Windsurf

Add this to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "ab-mcp-server": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "-y",
        "http://localhost:3000/api/sse"
      ]
    }
  }
}
```

## Available Tools

### 🤖 Agent Tool
- **Name**: `agent`
- **Description**: AI assistant powered by OpenAI GPT models that can help with various tasks
- **Parameters**:
  - `prompt` (string): The question or task for the AI agent
  - `system_prompt` (string, optional): Optional system prompt to set the agent's behavior
  - `model` (string, optional): OpenAI model to use (default: gpt-4o-mini)

**Features**:
- Uses OpenAI's GPT models for intelligent responses
- Customizable system prompts for different behaviors
- Support for multiple OpenAI models (GPT-4o, GPT-4, GPT-3.5 Turbo, etc.)
- Intelligent auto-detection of user intent and tool recommendations
- Available both through MCP protocol and web interface

**Client-side Web Interface Features**:
- Real-time chat interface with message history
- Model selection dropdown (GPT-4o, GPT-4, GPT-3.5 Turbo, etc.)
- Custom system prompt configuration
- Message timestamps and conversation management
- Clear chat functionality
- Responsive design

### 📱 Swift Code Review Tool
- **Name**: `swift_code_review`
- **Description**: Comprehensive Swift iOS code review analyzing best practices, potential issues, memory management, and architecture patterns
- **Parameters**:
  - `code` (string): The Swift code to review
  - `focus` (string, optional): Optional focus area ('performance', 'memory', 'security', or 'architecture')

**Review Features**:
- **Syntax & Style**: Line length, naming conventions, coding standards
- **Memory Management**: Force unwrapping detection, retain cycle analysis, weak/strong reference patterns
- **Threading**: DispatchQueue usage, async/await patterns, main thread safety
- **iOS Patterns**: UIKit vs SwiftUI best practices, deprecated API detection
- **SwiftUI Specific**: @State/@Binding/@ObservedObject usage, view composition
- **Performance**: String interpolation vs concatenation, collection operations
- **Security**: Keychain vs UserDefaults, HTTPS enforcement
- **Clean Code**: Function length, meaningful names, magic numbers, documentation
- **Clean Architecture**: MVVM patterns, Repository pattern, Dependency Injection
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

**Focus Areas**:
- **Performance**: Optimization suggestions, algorithmic improvements
- **Memory**: Retain cycle detection, memory leak prevention
- **Security**: Data storage, network security, authentication patterns
- **Architecture**: Code organization, design patterns, testability

### 🤖 Kotlin Code Review Tool
- **Name**: `kotlin_code_review`
- **Description**: Comprehensive Kotlin Android code review analyzing best practices, clean architecture, and modern Android development patterns
- **Parameters**:
  - `code` (string): The Kotlin code to review
  - `focus` (string, optional): Optional focus area ('performance', 'memory', 'security', or 'architecture')

**Review Features**:
- **Syntax & Style**: Kotlin conventions, naming standards, code organization
- **Null Safety**: Proper nullable handling, safe calls, elvis operator usage
- **Coroutines**: Proper dispatcher usage, structured concurrency, flow patterns
- **Android Patterns**: Activity/Fragment lifecycle, ViewBinding vs findViewById
- **Architecture**: MVVM implementation, Repository pattern, Dependency Injection (Hilt/Dagger)
- **Data Classes**: Proper data class usage vs regular classes
- **Collections**: Efficient collection operations, immutability patterns
- **Clean Code**: Function composition, meaningful names, magic numbers elimination
- **Clean Architecture**: Layer separation, dependency rules, testability
- **SOLID Principles**: Applied to Android/Kotlin context
- **Performance**: Memory leaks, GlobalScope usage, efficient algorithms

**Focus Areas**:
- **Performance**: Coroutine optimization, memory efficiency
- **Memory**: Leak detection, proper lifecycle management
- **Security**: Data storage best practices, network security
- **Architecture**: Clean Architecture patterns, testable code structure

### 🐍 Python Integration Tool
- **Name**: `python_exec`
- **Description**: Execute Python code with seamless TypeScript-to-Python integration
- **Parameters**:
  - `code` (string): The Python code to execute
  - `packages` (array, optional): Additional Python packages to install
  - `return_type` (string, optional): Expected return type (text, json, image)

**Built-in Packages**:
- pandas (Data manipulation)
- numpy (Numerical computing)
- matplotlib (Plotting)
- seaborn (Statistical visualization)
- datetime (Date/time handling)

**Features**:
- Dynamic package installation
- Support for data visualization with automatic image return
- JSON and text output formatting
- Error handling with detailed stack traces

### 🌐 Web Scraping Tools (Firecrawl)

#### Web Scraper
- **Name**: `web_scraper`
- **Description**: Scrape web content from any URL using Firecrawl for clean, structured data extraction
- **Parameters**:
  - `url` (string): The URL to scrape
  - `onlyMainContent` (boolean, optional): Extract only main content (default: true)

#### URL Analyzer
- **Name**: `url_analyzer`
- **Description**: Analyze a URL for SEO insights, content structure, and metadata
- **Parameters**:
  - `url` (string): The URL to analyze

**Analysis Features**:
- Title and meta description validation
- Content structure analysis (headings, links, word count)
- SEO insights (title length, description length)
- Language detection and status code

#### Batch Scraper
- **Name**: `batch_scraper`
- **Description**: Scrape multiple URLs at once (maximum 5 URLs) using Firecrawl
- **Parameters**:
  - `urls` (array): Array of URLs to scrape (max 5)
  - `onlyMainContent` (boolean, optional): Extract only main content (default: true)

**Features**:
- Process up to 5 URLs simultaneously
- Success/failure status for each URL
- Content preview and metadata extraction
- Efficient batch processing with error handling

### 🔍 Research Assistant Tool
- **Name**: `research_assistant`
- **Description**: Intelligent research assistant for Swift/Kotlin documentation and best practices
- **Parameters**:
  - `query` (string): The research query or topic
  - `language` (string, optional): Focus language ('swift' or 'kotlin', default: both)

**Features**:
- Automatic source discovery from Swift.org and kotlinlang.org
- Content relevance analysis and scoring
- Structured research results with citations
- Best practices and documentation extraction
- Multi-language research capabilities

**Research Sources**:
- Swift.org official documentation
- Kotlinlang.org official documentation
- Language-specific best practices guides
- Architecture and design pattern documentation

### ℹ️ Server Info Tool
- **Name**: `server_info`
- **Description**: Returns information about this MCP server and available tools
- **Parameters**: None

**Information Provided**:
- Server version and status
- Available tools list with descriptions
- System performance metrics
- API endpoint information

## Testing

### Test Files

The repository includes comprehensive test files with intentional code issues to demonstrate the code review capabilities:

#### 📱 `test_swift_broken.swift`
A Swift test file containing various issues that the Swift code review tool can detect:

- **Force unwrapping issues** (`!` and `!!`) without safety checks
- **Retain cycles** with strong self references in closures
- **Poor naming conventions** (userManager instead of UserManager)
- **Threading issues** (UI updates on background thread)
- **Magic numbers** and hardcoded values
- **Poor error handling** with force try (`try!`)
- **Memory leaks** (Timer with strong self reference)
- **SOLID principle violations** (classes doing too many things)
- **SwiftUI bad practices** (complex view body, expensive operations in view updates)
- **Global variables** and missing documentation
- **Clean Code violations** (long methods, unclear naming)

#### 🤖 `test_kotlin_broken.kt`
A Kotlin test file containing various Android/Kotlin-specific issues:

- **Poor naming conventions** (userRepository instead of UserRepository)
- **Null safety violations** (`null!!` and force unwrapping)
- **SOLID principle violations** (UserManager handling multiple responsibilities)
- **Poor Android practices** (findViewById instead of ViewBinding)
- **Memory leaks** (static context references, GlobalScope usage)
- **Poor coroutine usage** (wrong dispatchers, Thread.sleep in suspend functions)
- **Architecture issues** (not using data classes, poor ViewModel implementation)
- **Poor singleton implementation** (not thread-safe)
- **Magic numbers** and hardcoded strings
- **Poor exception handling** (generic catch-all blocks)
- **Clean Code violations** (long methods, unclear responsibilities)

### How to Test

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test Swift Code Review:**
   ```bash
   curl -X POST http://localhost:3000/api/sse \
     -H "Content-Type: application/json" \
     -d '{"method": "tools/call", "params": {"name": "swift_code_review", "arguments": {"code": "'"$(cat test_swift_broken.swift)"'"}}}'
   ```

3. **Test Kotlin Code Review:**
   ```bash
   curl -X POST http://localhost:3000/api/sse \
     -H "Content-Type: application/json" \
     -d '{"method": "tools/call", "params": {"name": "kotlin_code_review", "arguments": {"code": "'"$(cat test_kotlin_broken.kt)"'"}}}'
   ```

4. **Test via Web Interface:**
   - Navigate to `http://localhost:3000`
   - Use the AI agent chat interface
   - Paste code snippets for review
   - The agent will automatically detect code patterns and suggest appropriate tools

### Expected Results

Both tools should detect and report the various issues with:
- **Detailed explanations** of each problem
- **Specific suggestions** for improvement
- **Best practice recommendations**
- **Clean Code and Clean Architecture guidance**
- **SOLID principles analysis**
- **Performance and security considerations**

## Development

### Project Structure
```
ab-mcp-server/
├── app/
│   ├── api/
│   │   ├── agent/
│   │   │   └── route.ts          # Client-side agent API
│   │   ├── tools/
│   │   │   ├── agent.ts          # AI agent tool implementation
│   │   │   ├── index.ts          # Tool exports and type definitions
│   │   │   ├── kotlin.ts         # Kotlin code review tool
│   │   │   ├── python.ts         # Python execution tool
│   │   │   ├── server.ts         # Server info tool
│   │   │   ├── swift.ts          # Swift code review tool
│   │   │   └── web-scraping.ts   # Web scraping and research tools
│   │   └── [transport]/
│   │       └── route.ts          # MCP server implementation
│   ├── components/
│   │   └── AgentChat.tsx         # Client-side chat component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # App layout
│   └── page.tsx                  # Home page with agent interface
├── test_kotlin_broken.kt         # Kotlin test file with issues
├── test_swift_broken.swift       # Swift test file with issues
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

### Tool Architecture
```
MCP Server Tools:
├── 🤖 agent                    # AI assistant with auto-detection
├── 📱 swift_code_review        # Swift iOS code analysis
├── 🤖 kotlin_code_review       # Kotlin Android code analysis
├── 🐍 python_exec              # Python code execution
├── 🌐 web_scraper             # Single URL scraping
├── 🌐 url_analyzer            # URL SEO analysis
├── 🌐 batch_scraper           # Multi-URL scraping
├── 🔍 research_assistant      # Swift/Kotlin documentation research
└── ℹ️ server_info             # Server status and information
```

### Built With

**Core Framework:**
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety and development experience
- [@vercel/mcp-adapter](https://github.com/vercel/mcp-adapter) - MCP adapter for Next.js

**AI & APIs:**
- [OpenAI GPT Models](https://openai.com/) - AI agent and intelligent assistance
- [Firecrawl](https://firecrawl.dev/) - Advanced web scraping and data extraction
- [Python Runtime](https://www.python.org/) - Code execution with pandas, numpy, matplotlib, seaborn

**Development Tools:**
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://react.dev/) - UI component library

**Languages & Analysis:**
- [Swift](https://swift.org/) - iOS development language for code review analysis
- [Kotlin](https://kotlinlang.org/) - Android development language for code review analysis
- Clean Code & Clean Architecture principles integration
- SOLID principles validation and analysis

**Protocols & Standards:**
- [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) - Standardized AI tool integration
- RESTful API design for web interface
- Server-Sent Events (SSE) for real-time communication

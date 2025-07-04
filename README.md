# 🔬 AB MCP Server

A **comprehensive Model Context Protocol (MCP) server** built with [@vercel/mcp-adapter](https://github.com/vercel/mcp-adapter) providing **advanced development utilities** including AI agent assistance, Swift/Kotlin code review, Python integration, web scraping, and research capabilities.

**Live Demo**: [https://ab-mcp.vercel.app](https://ab-mcp.vercel.app)

## 🎯 **What is AB MCP Server?**

AB MCP Server is a **production-ready MCP server** that provides **9 powerful development tools** through a standardized interface. Whether you're working in **Cursor**, **Claude Desktop**, or **Windsurf**, AB MCP Server seamlessly integrates advanced AI capabilities directly into your development workflow.

### **🚀 Key Highlights**

- **🤖 AI Agent**: OpenAI GPT-powered assistant with intelligent auto-detection
- **📱 Swift Code Review**: Comprehensive iOS development analysis with Clean Architecture principles
- **🤖 Kotlin Code Review**: Complete Android development review with MVVM patterns  
- **🐍 Python Integration**: Seamless TypeScript-to-Python execution with data science libraries
- **🌐 Web Scraping Suite**: Advanced web scraping with Firecrawl API (3 tools)
- **🔍 Research Assistant**: Intelligent Swift/Kotlin documentation research
- **ℹ️ Server Monitoring**: Real-time server status and tool availability

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

## ✨ **Core Features**

### 🤖 **AI Agent Assistant**

The **OpenAI GPT-powered agent** provides intelligent assistance with **auto-detection** capabilities and seamless integration across development workflows.

#### **🧠 Key Features**

- **Intelligent Auto-Detection**: Automatically suggests relevant tools based on user queries
- **Multi-Model Support**: GPT-4o, GPT-4, GPT-3.5 Turbo with model selection
- **Web Interface**: Real-time chat interface with conversation management
- **MCP Integration**: Seamless integration with Cursor, Claude Desktop, Windsurf

### 📱 **Swift iOS Code Review**

**Comprehensive iOS development analysis** with industry best practices, Clean Architecture principles, and SOLID design patterns.

#### **🔍 Review Capabilities**

- **Memory Management**: Force unwrapping detection, retain cycle analysis, weak/strong patterns
- **Threading Safety**: DispatchQueue usage, async/await patterns, main thread validation
- **SwiftUI/UIKit**: Modern pattern detection, deprecated API warnings
- **Performance**: String operations, collection efficiency, algorithmic improvements
- **Security**: Keychain vs UserDefaults, HTTPS enforcement, data protection
- **Architecture**: MVVM patterns, Repository design, Dependency Injection
- **Clean Code**: Function length, meaningful naming, documentation standards
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution

### 🤖 **Kotlin Android Code Review**

**Complete Android development review** with Clean Architecture, MVVM patterns, and modern Kotlin best practices.

#### **🔍 Review Capabilities**

- **Null Safety**: Proper nullable handling, safe calls, elvis operator usage
- **Coroutines**: Structured concurrency, proper dispatchers, Flow patterns
- **Android Lifecycle**: Activity/Fragment patterns, ViewBinding vs findViewById
- **Architecture**: MVVM implementation, Repository pattern, Hilt/Dagger DI
- **Data Classes**: Proper usage vs regular classes, immutability patterns
- **Performance**: Memory leak detection, GlobalScope avoidance, efficiency
- **Clean Code**: Function composition, meaningful names, magic number elimination
- **SOLID Principles**: Applied to Android/Kotlin development context

### 🐍 **Python Integration**

**Seamless TypeScript-to-Python execution** with built-in data science libraries and dynamic package management.

#### **🚀 Key Features**

- **Built-in Libraries**: pandas, numpy, matplotlib, seaborn, datetime
- **Dynamic Package Installation**: Install any PyPI package on-demand
- **Multiple Return Types**: Text, JSON, and image (matplotlib plots)
- **TypeScript Integration**: Seamless data exchange between TS and Python



### 🌐 **Web Scraping & Analysis Suite**

**Advanced web scraping** powered by [Firecrawl API](https://firecrawl.dev) for clean, structured data extraction with SEO analysis capabilities.

#### **🔧 Three Tools Available**

- **Web Scraper**: Clean content extraction with main content filtering
- **URL Analyzer**: SEO analysis, content structure, and meta tag validation
- **Batch Scraper**: Multi-URL processing (up to 5 URLs simultaneously)



### 🔍 **Research Assistant**

**Intelligent research capabilities** for Swift/Kotlin documentation with automatic source discovery and relevance analysis.

#### **🧠 Key Features**

- **Source Discovery**: Automatically finds relevant documentation from Swift.org and Kotlinlang.org
- **Content Analysis**: Extracts key information and best practices
- **Relevance Scoring**: Ranks results by relevance to your query
- **Multi-language**: Supports both Swift and Kotlin research



### ℹ️ **Server Information & Monitoring**

**Real-time server status** and comprehensive tool availability monitoring.

Provides real-time server status, tool availability, performance metrics, and system information.

## 🚀 **Getting Started**

### **📋 Prerequisites**

- **Node.js** 18 or higher
- **npm** or **pnpm** package manager
- **OpenAI API Key** for AI agent functionality
- **Firecrawl API Key** for web scraping features

### **⚡ Quick Setup**

1. **Clone and Install**:
```bash
git clone https://github.com/aditi711/ab-mcp-server.git
cd ab-mcp-server
npm install
```

2. **Environment Configuration**:
Create `.env.local` file:
```bash
# Required for AI Agent functionality
OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# Required for web scraping features  
FIRECRAWL_API_KEY=fc-your-firecrawl-api-key-here
```

**Get your API keys:**
- **OpenAI**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Firecrawl**: [https://firecrawl.dev](https://firecrawl.dev)

3. **Start Development Server**:
```bash
npm run dev
```

4. **Access Web Interface**:
Open [http://localhost:3000](http://localhost:3000) to see the server status page and AI agent chat interface.

### **🔌 MCP Client Configuration**

The MCP server endpoint: `http://localhost:3000/api/sse`

#### **Claude Desktop**

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ab-mcp-server": {
      "transport": {
        "type": "sse",
        "url": "http://localhost:3000/api/sse"
      }
    }
  }
}
```

#### **Cursor**

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ab-mcp-server": {
      "transport": {
        "type": "sse",
        "url": "http://localhost:3000/api/sse"
      }
    }
  }
}
```

#### **Windsurf**

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "ab-mcp-server": {
      "transport": {
        "type": "sse",
        "url": "http://localhost:3000/api/sse"
      }
    }
  }
}
```

## 🧪 **Testing & Development**

### **🔧 MCP Server Testing**

**Basic Connectivity:**
```bash
# Test server health
curl -X GET http://localhost:3000/api/sse

# List all available tools
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'

# Test server info tool
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"server_info","arguments":{}},"id":1}'
```

**Production Server Testing:**
```bash
# Test deployed server
curl -X POST https://ab-mcp.vercel.app/api/sse \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

### **📱 Swift Code Review Testing**

**Test with broken Swift code:**
```bash
# Test Swift code review tool
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"swift_code_review","arguments":{"code":"'"$(cat test_swift_broken.swift)"'"}},"id":1}'
```

**Expected detections:**
- Force unwrapping without safety checks
- Retain cycles in closures
- UI updates on background threads
- Poor naming conventions
- Magic numbers and hardcoded values
- SOLID principle violations

### **🤖 Kotlin Code Review Testing**

**Test with broken Kotlin code:**
```bash
# Test Kotlin code review tool
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"kotlin_code_review","arguments":{"code":"'"$(cat test_kotlin_broken.kt)"'"}},"id":1}'
```

**Expected detections:**
- Null safety violations
- Poor coroutine usage with GlobalScope
- Memory leaks and context references
- Architecture pattern violations
- Threading and lifecycle issues

### **🐍 Python Integration Testing**

**Data Analysis Example:**
```bash
# Test Python execution with data science
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"python_exec",
      "arguments":{
        "code":"import pandas as pd; import numpy as np; data = pd.DataFrame({\"x\": np.random.randn(100), \"y\": np.random.randn(100)}); print(data.describe())",
        "return_type":"text"
      }
    },
    "id":1
  }'
```

**Visualization Example:**
```bash
# Test matplotlib plotting
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"python_exec",
      "arguments":{
        "code":"import matplotlib.pyplot as plt; import numpy as np; x = np.linspace(0, 10, 100); y = np.sin(x); plt.plot(x, y); plt.title(\"Sine Wave\"); plt.savefig(\"plot.png\")",
        "return_type":"image"
      }
    },
    "id":1
  }'
```

### **🌐 Web Scraping Testing**

**Single URL Scraping:**
```bash
# Test web scraper
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"web_scraper",
      "arguments":{
        "url":"https://example.com",
        "onlyMainContent":true
      }
    },
    "id":1
  }'
```

**SEO Analysis:**
```bash
# Test URL analyzer
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"url_analyzer",
      "arguments":{
        "url":"https://example.com"
      }
    },
    "id":1
  }'
```

**Batch Scraping:**
```bash
# Test batch scraper
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"batch_scraper",
      "arguments":{
        "urls":["https://example.com", "https://httpbin.org/json"],
        "onlyMainContent":true
      }
    },
    "id":1
  }'
```

### **🔍 Research Assistant Testing**

**Swift Research:**
```bash
# Test Swift documentation research
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"research_assistant",
      "arguments":{
        "query":"Swift async await best practices",
        "language":"swift"
      }
    },
    "id":1
  }'
```

**Kotlin Research:**
```bash
# Test Kotlin documentation research
curl -X POST http://localhost:3000/api/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"research_assistant",
      "arguments":{
        "query":"Kotlin coroutines lifecycle management",
        "language":"kotlin"
      }
    },
    "id":1
  }'
```

### **🤖 AI Agent Testing**

**Interactive Web Interface:**
1. Navigate to `http://localhost:3000`
2. Use the chat interface to test natural language queries
3. Try queries like:
   - *"Review this Swift code for issues"*
   - *"Analyze this Python data and create a visualization"*
   - *"Scrape this website and summarize the content"*

**MCP Client Testing:**
- Use the agent through Cursor, Claude Desktop, or Windsurf
- Test auto-detection of user intent
- Verify tool recommendations and execution

## 📊 **Sample Test Files**

### **📱 `test_swift_broken.swift`**
A comprehensive Swift test file with **intentional issues** for code review demonstration:

```swift
// Multiple issues for testing Swift code review
class UserManager {
    var users: [User]! = nil  // ❌ Force unwrapping
    static let shared = UserManager()  // ❌ Singleton without thread safety
    
    func loadUsers() {
        DispatchQueue.global().async {
            // Data loading...
            self.updateUI()  // ❌ UI update on background thread
        }
    }
    
    func saveUser(_ user: User) {
        try! realm.write {  // ❌ Force try
            realm.add(user)
        }
    }
}
```

**Issues detected:**
- **Memory**: Force unwrapping, retain cycles
- **Threading**: UI updates on background thread
- **Error Handling**: Force try without proper error management
- **Architecture**: Single responsibility principle violations
- **Performance**: Inefficient algorithms and string operations

### **🤖 `test_kotlin_broken.kt`**
A comprehensive Kotlin test file with **Android-specific issues**:

```kotlin
// Multiple issues for testing Kotlin code review
class UserRepository {
    companion object {
        var instance: UserRepository? = null  // ❌ Not thread-safe singleton
    }
    
    fun getUsers(): List<User>? {
        return null!!  // ❌ Null safety violation
    }
    
    fun saveUser(user: User) {
        GlobalScope.launch {  // ❌ Poor coroutine scope usage
            Thread.sleep(1000)  // ❌ Blocking call in coroutine
            // Save logic
        }
    }
}
```

**Issues detected:**
- **Null Safety**: Dangerous null handling patterns
- **Concurrency**: GlobalScope usage, blocking calls in coroutines
- **Memory**: Context leaks, static references
- **Architecture**: MVVM pattern violations, poor separation of concerns
- **Android**: findViewById usage instead of ViewBinding

## 📁 **Project Architecture**

```
ab-mcp-server/                     # 🏠 Project root
├── app/                           # 🌐 Next.js application  
│   ├── api/                       # API routes
│   │   ├── [transport]/          # 🔧 MCP protocol handler
│   │   │   └── route.ts          # Main MCP server implementation
│   │   ├── agent/                # 🤖 Client-side agent API
│   │   │   └── route.ts          # Web interface agent endpoint
│   │   └── tools/                # 🛠️ MCP Tools implementation
│   │       ├── agent.ts          # AI agent tool
│   │       ├── index.ts          # Tool exports and type definitions
│   │       ├── kotlin.ts         # Kotlin code review tool
│   │       ├── python.ts         # Python execution tool
│   │       ├── server.ts         # Server info tool
│   │       ├── swift.ts          # Swift code review tool
│   │       └── web-scraping.ts   # Web scraping and research tools
│   ├── components/               # 🎨 React components
│   │   └── AgentChat.tsx         # Client-side chat interface
│   ├── globals.css               # 🎨 Global styles
│   ├── layout.tsx                # 📱 App layout
│   └── page.tsx                  # 🏠 Home page with agent interface
├── test_swift_broken.swift       # 📱 Swift test file with issues
├── test_kotlin_broken.kt         # 🤖 Kotlin test file with issues
├── SECURITY.md                   # 🔒 Security guidelines and best practices
├── next.config.js                # ⚙️ Next.js configuration
├── package.json                  # 📦 Dependencies & scripts
├── tsconfig.json                 # 📝 TypeScript configuration
├── vercel.json                   # 🚀 Deployment configuration
└── README.md                     # 📖 Documentation
```

### **🛠️ Tool Architecture**

```
MCP Server Tools (9 total):
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

## 🔮 **Future Development Roadmap**

### **🎯 Planned Features (Not Yet Implemented)**

#### **🧠 Enhanced AI Capabilities**

- **Memory Persistence**: Conversation context across sessions
- **Multi-step Workflows**: Complex analysis with dependencies
- **Custom Agents**: Domain-specific expertise modules
- **Code Generation**: AI-powered code scaffolding and templates

#### **📊 Advanced Code Analysis**

- **Static Analysis Integration**: ESLint, SwiftLint, ktlint integration
- **Performance Profiling**: Runtime analysis and optimization suggestions
- **Security Scanning**: Vulnerability detection and remediation
- **Dependency Analysis**: Package security and update recommendations

#### **🌐 Enhanced Web Capabilities**

- **Real-time Monitoring**: Website change detection and alerts
- **API Testing**: Automated API endpoint testing and validation
- **Performance Auditing**: Core Web Vitals and accessibility scoring
- **Content Management**: Automated content extraction and organization

#### **🐍 Advanced Python Features**

- **Jupyter Integration**: Notebook-style execution and visualization
- **Machine Learning**: scikit-learn, TensorFlow, PyTorch integration
- **Database Connectivity**: PostgreSQL, MongoDB, Redis connections
- **Async Processing**: Background task execution and queuing

#### **📱 Mobile Development Tools**

- **React Native**: Cross-platform code review and analysis
- **Flutter/Dart**: Dart code review and optimization suggestions
- **CI/CD Integration**: GitHub Actions, Bitrise, Fastlane automation
- **App Store Optimization**: ASO analysis and recommendations

#### **🔧 Developer Experience**

- **IDE Extensions**: VS Code, Xcode, Android Studio plugins
- **CLI Interface**: Command-line tool for local development
- **Custom Templates**: Project scaffolding and boilerplate generation
- **Documentation**: Auto-generated API docs and code documentation

### **🚀 Contributing**

This project is **open for contributions**! Priority areas:

1. **Enhanced AI Agents**: Memory persistence, multi-step workflows
2. **Mobile Development**: React Native, Flutter integration  
3. **Performance**: Caching, optimization, concurrent processing
4. **Security**: Enhanced code scanning, vulnerability detection
5. **Documentation**: Comprehensive guides, video tutorials

**How to contribute:**
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request with detailed description

---

**Built with ❤️ using TypeScript, Next.js, OpenAI, Python, and the Model Context Protocol.**

🚀 **Ready for production deployment and continuous enhancement!**

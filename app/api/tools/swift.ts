import { z } from "zod";

// Define proper MCP response type
export interface McpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

export const swiftCodeReviewConfig = {
  name: "swift_code_review",
  description: "Comprehensive code review for Swift/iOS applications with clean architecture, SOLID principles, and best practices analysis",
  inputSchema: {
    code: z.string().describe("Swift code to review"),
    focus: z.enum(["performance", "memory", "security", "architecture", "clean_code", "solid_principles"]).optional().describe("Specific area to focus the review on"),
  },
};

export const swiftCodeReviewHandler = async ({ code, focus }: { 
  code: string; 
  focus?: string 
}): Promise<McpResponse> => {
  try {
    const analysis = analyzeSwiftCode(code, focus);
    
    return {
      content: [
        {
          type: "text",
          text: `📱 **Swift Clean Code & Architecture Review**\n\n${analysis}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ **Error during Swift code review:** ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
    };
  }
};

function analyzeSwiftCode(code: string, focus?: string): string {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const positives: string[] = [];
  const cleanCodeIssues: string[] = [];
  const architectureIssues: string[] = [];
  const solidViolations: string[] = [];

  // === CLEAN ARCHITECTURE ANALYSIS ===
  if (focus === "architecture" || focus === "clean_code" || !focus) {
    // MVVM Pattern Detection
    if (code.includes("ViewModel") || code.includes("ObservableObject")) {
      positives.push("🏗️ **MVVM Pattern**: Using Model-View-ViewModel architecture");
      
      // Check for proper MVVM separation
      if (code.includes("UIKit") && code.includes("@Published")) {
        suggestions.push("Consider using SwiftUI's native state management instead of mixing UIKit with Combine");
      }
      
      // Check for business logic in ViewModel
      if (code.includes("class") && code.includes("ViewModel") && 
          (code.includes("URLSession") || code.includes("CoreData") || code.includes("UserDefaults"))) {
        architectureIssues.push("🏗️ **Architecture Violation**: ViewModel contains data access logic - consider Repository pattern");
      }
    }

    // Repository Pattern Detection
    if (code.includes("Repository") || code.includes("DataSource")) {
      positives.push("🗄️ **Repository Pattern**: Using repository for data abstraction");
    }

    // Dependency Injection Detection
    if (code.includes("init(") && code.includes("protocol")) {
      positives.push("💉 **Dependency Injection**: Using constructor injection");
    } else if (code.includes("class") && code.includes("=") && code.includes("()")) {
      architectureIssues.push("💉 **DI Missing**: Consider dependency injection instead of direct instantiation");
    }

    // Protocol-Oriented Programming
    const protocolCount = (code.match(/protocol\s+\w+/g) || []).length;
    if (protocolCount > 0) {
      positives.push(`🔌 **Protocol-Oriented**: Using ${protocolCount} protocol(s) for abstraction`);
    }

    // Use Case/Interactor Pattern
    if (code.includes("UseCase") || code.includes("Interactor")) {
      positives.push("⚙️ **Use Case Pattern**: Implementing business logic separation");
    }
  }

  // === SOLID PRINCIPLES ANALYSIS ===
  if (focus === "solid_principles" || focus === "clean_code" || !focus) {
    // Single Responsibility Principle (SRP)
    const classMatches = code.match(/class\s+(\w+)[^{]*\{([\s\S]*?)(?=class|\Z)/g);
    if (classMatches) {
      classMatches.forEach(classCode => {
        const responsibilities = [];
        if (classCode.includes("network") || classCode.includes("URLSession")) responsibilities.push("networking");
        if (classCode.includes("CoreData") || classCode.includes("SQLite")) responsibilities.push("data persistence");
        if (classCode.includes("@IBAction") || classCode.includes("UIButton")) responsibilities.push("UI handling");
        if (classCode.includes("UserDefaults") || classCode.includes("Keychain")) responsibilities.push("storage");
        if (classCode.includes("validation") || classCode.includes("validate")) responsibilities.push("validation");
        
        if (responsibilities.length > 2) {
          solidViolations.push(`🔴 **SRP Violation**: Class handles multiple responsibilities: ${responsibilities.join(", ")}`);
        }
      });
    }

    // Open/Closed Principle (OCP)
    if (code.includes("switch") && code.includes("case") && !code.includes("protocol")) {
      solidViolations.push("🔴 **OCP Violation**: Switch statements without protocols - not open for extension");
      suggestions.push("Consider using protocol + extensions instead of switch statements for extensibility");
    }

    // Liskov Substitution Principle (LSP)
    if (code.includes("override") && code.includes("fatalError")) {
      solidViolations.push("🔴 **LSP Violation**: Override with fatalError breaks substitutability");
    }

    // Interface Segregation Principle (ISP)
    const protocolMethods = code.match(/protocol\s+\w+[^{]*\{([^}]*)\}/g);
    if (protocolMethods) {
      protocolMethods.forEach(protocol => {
        const methodCount = (protocol.match(/func\s+/g) || []).length;
        if (methodCount > 5) {
          solidViolations.push(`🔴 **ISP Violation**: Protocol with ${methodCount} methods - consider breaking into smaller protocols`);
        }
      });
    }

    // Dependency Inversion Principle (DIP)
    if (code.includes("import") && code.includes("UIKit") && !code.includes("protocol")) {
      suggestions.push("Consider using protocols to depend on abstractions rather than concrete UIKit classes");
    }
  }

  // === CLEAN CODE PRINCIPLES ===
  if (focus === "clean_code" || !focus) {
    // Function Length
    const functions = code.match(/func\s+\w+[^{]*\{([\s\S]*?)(?=\n\s*func|\n\s*\}|\Z)/g);
    if (functions) {
      functions.forEach((func, index) => {
        const lines = func.split('\n').filter(line => line.trim().length > 0).length;
        if (lines > 20) {
          cleanCodeIssues.push(`📏 **Function Too Long**: Function #${index + 1} has ${lines} lines - consider breaking down`);
        }
      });
    }

    // Meaningful Names
    const variableNames = code.match(/(?:var|let)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (variableNames) {
      variableNames.forEach(variable => {
        const name = variable.split(' ')[1];
        if (name.length < 3 && !['id', 'ui', 'os'].includes(name.toLowerCase())) {
          cleanCodeIssues.push(`🏷️ **Poor Naming**: Variable '${name}' is too short - use descriptive names`);
        }
        if (/^[a-z]+(1|2|3|Data|Info|Obj)$/.test(name)) {
          cleanCodeIssues.push(`🏷️ **Poor Naming**: Variable '${name}' uses generic suffix - be more specific`);
        }
      });
    }

    // Comments vs Self-Documenting Code
    const commentLines = (code.match(/\/\/.*$/gm) || []).length;
    const codeLines = code.split('\n').filter(line => line.trim().length > 0).length;
    const commentRatio = commentLines / codeLines;
    
    if (commentRatio > 0.3) {
      cleanCodeIssues.push("💬 **Too Many Comments**: High comment ratio suggests code isn't self-documenting");
    }

    // Magic Numbers
    const magicNumbers = code.match(/\b(?<![\w.])[0-9]{2,}\b(?![\w.])/g);
    if (magicNumbers && magicNumbers.length > 0) {
      cleanCodeIssues.push(`🔢 **Magic Numbers**: Found ${magicNumbers.length} magic numbers - use named constants`);
    }

    // Error Handling
    if (code.includes("try!")) {
      cleanCodeIssues.push("⚠️ **Forced Try**: Using 'try!' can cause crashes - use proper error handling");
    }
    if (code.includes("try?") && !code.includes("guard")) {
      suggestions.push("Consider using 'guard let' with 'try?' for better error handling flow");
    }
    if (code.includes("do {") && code.includes("try") && code.includes("catch")) {
      positives.push("✅ **Error Handling**: Using proper do-catch error handling");
    }
  }

  // === SWIFT-SPECIFIC BEST PRACTICES ===
  
  // Value Types vs Reference Types
  if (code.includes("struct") && code.includes("mutating")) {
    positives.push("🔧 **Value Types**: Using structs with mutating methods appropriately");
  }
  
  // Immutability
  const letCount = (code.match(/\blet\s+/g) || []).length;
  const varCount = (code.match(/\bvar\s+/g) || []).length;
  if (letCount > varCount) {
    positives.push("🔒 **Immutability**: Favoring 'let' over 'var' for immutable data");
  } else if (varCount > letCount * 2) {
    suggestions.push("Consider using 'let' instead of 'var' where values don't change");
  }

  // Optional Handling
  if (code.includes("guard let") || code.includes("if let")) {
    positives.push("✅ **Safe Unwrapping**: Using safe optional unwrapping patterns");
  }
  
  // Async/Await Modern Patterns
  if (code.includes("async") && code.includes("await")) {
    positives.push("⚡ **Modern Concurrency**: Using async/await for asynchronous operations");
    
    if (code.includes("Task {") && !code.includes("@MainActor")) {
      suggestions.push("Consider using @MainActor for UI updates in async contexts");
    }
  }

  // === PERFORMANCE & MEMORY (Enhanced) ===
  if (focus === "performance" || focus === "memory" || !focus) {
    // Lazy Properties
    if (code.includes("lazy var")) {
      positives.push("⚡ **Lazy Loading**: Using lazy properties for performance optimization");
    }

    // Memory Cycles
    if (code.includes("[weak self]") || code.includes("[unowned self]")) {
      positives.push("💾 **Memory Management**: Using weak/unowned references to prevent cycles");
    }

    // Collection Performance
    if (code.includes("Array") && code.includes("append") && code.includes("for")) {
      suggestions.push("🚀 **Performance**: Consider using 'reserveCapacity()' before bulk array operations");
    }

    if (code.includes("Dictionary") && code.includes("updateValue")) {
      positives.push("📊 **Efficient Updates**: Using updateValue for dictionary modifications");
    }
  }

  // === SECURITY (Enhanced) ===
  if (focus === "security" || !focus) {
    // Secure Storage
    if (code.includes("UserDefaults") && (code.includes("password") || code.includes("token") || code.includes("key"))) {
      issues.push("🔐 **Security Risk**: Sensitive data in UserDefaults - use Keychain Services");
    }

    if (code.includes("Keychain") || code.includes("SecItemAdd")) {
      positives.push("🔐 **Secure Storage**: Using Keychain for sensitive data");
    }

    // Network Security
    if (code.includes("http://") && !code.includes("localhost")) {
      issues.push("🔒 **Security**: Using HTTP instead of HTTPS for network requests");
    }

    if (code.includes("URLSessionConfiguration") && code.includes("tlsMinimumSupportedProtocolVersion")) {
      positives.push("🔒 **Network Security**: Configuring TLS protocol versions");
    }

    // Input Validation
    if (code.includes("String(") && code.includes("user") && !code.includes("validate")) {
      suggestions.push("🛡️ **Input Validation**: Consider validating user input before processing");
    }
  }

  // === ORIGINAL CHECKS (Enhanced) ===
  
  // Force Unwrapping Detection
  const forceUnwraps = code.match(/!\s*(?![=!])/g);
  if (forceUnwraps && forceUnwraps.length > 0) {
    issues.push(`🚨 **Force Unwrapping** (${forceUnwraps.length} instances): Found \`!\` operators that could cause crashes`);
    suggestions.push("Replace force unwraps with safe unwrapping: `guard let`, `if let`, or nil coalescing `??`");
  }

  // SwiftUI Enhanced Checks
  if (code.includes("@State") || code.includes("@Binding") || code.includes("SwiftUI")) {
    if (code.includes("@State") && !code.includes("private")) {
      issues.push("🏗️ **SwiftUI State**: `@State` properties should be private");
    }
    if (code.includes("@StateObject") && code.includes("@ObservedObject")) {
      positives.push("✅ **SwiftUI Data Flow**: Using both @StateObject and @ObservedObject appropriately");
    }
    if (code.includes("@Environment") || code.includes("@EnvironmentObject")) {
      positives.push("🌍 **Environment Usage**: Using SwiftUI environment for data injection");
    }
  }

  // Build comprehensive report
  let report = "";
  
  if (focus) {
    report += `**🎯 Focus Area: ${focus.replace('_', ' ').charAt(0).toUpperCase() + focus.replace('_', ' ').slice(1)}**\n\n`;
  }

  // SOLID Principles Section
  if (solidViolations.length > 0) {
    report += "🔴 **SOLID Principle Violations:**\n";
    solidViolations.forEach(violation => report += `• ${violation}\n`);
    report += "\n";
  }

  // Clean Architecture Issues
  if (architectureIssues.length > 0) {
    report += "🏗️ **Architecture Issues:**\n";
    architectureIssues.forEach(issue => report += `• ${issue}\n`);
    report += "\n";
  }

  // Clean Code Issues
  if (cleanCodeIssues.length > 0) {
    report += "🧹 **Clean Code Issues:**\n";
    cleanCodeIssues.forEach(issue => report += `• ${issue}\n`);
    report += "\n";
  }

  // General Issues
  if (issues.length > 0) {
    report += "🚨 **Critical Issues:**\n";
    issues.forEach(issue => report += `• ${issue}\n`);
    report += "\n";
  }

  // Suggestions
  if (suggestions.length > 0) {
    report += "💡 **Improvement Suggestions:**\n";
    suggestions.forEach(suggestion => report += `• ${suggestion}\n`);
    report += "\n";
  }

  // Positive Findings
  if (positives.length > 0) {
    report += "✅ **Clean Code Practices Found:**\n";
    positives.forEach(positive => report += `• ${positive}\n`);
    report += "\n";
  }

  // Overall Assessment
  const totalIssues = solidViolations.length + architectureIssues.length + cleanCodeIssues.length + issues.length;
  if (totalIssues === 0) {
    report += "🎉 **Excellent Clean Code!** Your Swift code follows clean architecture and SOLID principles!\n\n";
  } else if (totalIssues <= 3) {
    report += "👍 **Good Code Quality** with minor improvements needed.\n\n";
  } else if (totalIssues <= 6) {
    report += "⚠️ **Moderate Issues** - consider refactoring for better clean code practices.\n\n";
  } else {
    report += "🔄 **Major Refactoring Recommended** - significant clean code and architecture improvements needed.\n\n";
  }

  // Clean Architecture Recommendations
  report += "🏗️ **Clean Architecture Recommendations:**\n";
  report += "• **MVVM + Clean Architecture**: Use ViewModels with Use Cases/Interactors\n";
  report += "• **Repository Pattern**: Abstract data sources behind repositories\n";
  report += "• **Dependency Injection**: Use protocols and constructor injection\n";
  report += "• **SOLID Principles**: Follow Single Responsibility, Open/Closed, etc.\n";
  report += "• **Protocol-Oriented**: Prefer protocols over inheritance\n";
  report += "• **Value Types**: Use structs for immutable data models\n";
  report += "• **Error Handling**: Implement proper Result types and error propagation\n";
  report += "• **Testing**: Write unit tests for business logic and use cases\n";
  
  return report;
} 
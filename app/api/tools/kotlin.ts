import { z } from "zod";

// Define proper MCP response type
export interface McpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

export const kotlinCodeReviewConfig = {
  name: "kotlin_code_review",
  description: "Comprehensive code review for Kotlin/Android applications with clean architecture, SOLID principles, and best practices analysis",
  inputSchema: {
    code: z.string().describe("Kotlin code to review"),
    focus: z.enum(["performance", "memory", "security", "architecture", "clean_code", "solid_principles"]).optional().describe("Specific area to focus the review on"),
  },
};

export const kotlinCodeReviewHandler = async ({ code, focus }: { 
  code: string; 
  focus?: string 
}): Promise<McpResponse> => {
  try {
    const analysis = analyzeKotlinCode(code, focus);
    
    return {
      content: [
        {
          type: "text",
          text: `🤖 **Kotlin Clean Code & Architecture Review**\n\n${analysis}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ **Error during Kotlin code review:** ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
    };
  }
};

function analyzeKotlinCode(code: string, focus?: string): string {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const positives: string[] = [];
  const cleanCodeIssues: string[] = [];
  const architectureIssues: string[] = [];
  const solidViolations: string[] = [];

  // === CLEAN ARCHITECTURE ANALYSIS ===
  if (focus === "architecture" || focus === "clean_code" || !focus) {
    // MVVM Pattern Detection
    if (code.includes("ViewModel") || code.includes("StateFlow") || code.includes("LiveData")) {
      positives.push("🏗️ **MVVM Pattern**: Using Model-View-ViewModel architecture");
      
      // Check for proper MVVM separation
      if (code.includes("View") && code.includes("StateFlow") && code.includes("Repository")) {
        positives.push("🎯 **Clean Separation**: Good MVVM layer separation with Repository pattern");
      }
      
      // Check for business logic in ViewModel
      if (code.includes("class") && code.includes("ViewModel") && 
          (code.includes("Retrofit") || code.includes("Room") || code.includes("SharedPreferences"))) {
        architectureIssues.push("🏗️ **Architecture Violation**: ViewModel contains data access logic - consider Repository pattern");
      }
    }

    // Repository Pattern Detection
    if (code.includes("Repository") || code.includes("DataSource")) {
      positives.push("🗄️ **Repository Pattern**: Using repository for data abstraction");
    }

    // Dependency Injection Detection (Hilt/Dagger)
    if (code.includes("@Inject") || code.includes("@HiltAndroidApp") || code.includes("@Module")) {
      positives.push("💉 **Dependency Injection**: Using Hilt/Dagger for DI");
    } else if (code.includes("class") && code.includes("=") && code.includes("()")) {
      architectureIssues.push("💉 **DI Missing**: Consider dependency injection instead of direct instantiation");
    }

    // Sealed Classes/Interfaces for Clean Architecture
    if (code.includes("sealed class") || code.includes("sealed interface")) {
      positives.push("🔒 **Sealed Types**: Using sealed classes/interfaces for type safety");
    }

    // Use Case Pattern
    if (code.includes("UseCase") || code.includes("Interactor")) {
      positives.push("⚙️ **Use Case Pattern**: Implementing business logic separation");
    }

    // Clean Architecture Layers
    if (code.includes("domain") || code.includes("data") || code.includes("presentation")) {
      positives.push("🏛️ **Layered Architecture**: Following Clean Architecture layer structure");
    }
  }

  // === SOLID PRINCIPLES ANALYSIS ===
  if (focus === "solid_principles" || focus === "clean_code" || !focus) {
    // Single Responsibility Principle (SRP)
    const classMatches = code.match(/class\s+(\w+)[^{]*\{([\s\S]*?)(?=class|\Z)/g);
    if (classMatches) {
      classMatches.forEach(classCode => {
        const responsibilities = [];
        if (classCode.includes("retrofit") || classCode.includes("http")) responsibilities.push("networking");
        if (classCode.includes("Room") || classCode.includes("SQLite")) responsibilities.push("data persistence");
        if (classCode.includes("findViewById") || classCode.includes("binding")) responsibilities.push("UI handling");
        if (classCode.includes("SharedPreferences") || classCode.includes("DataStore")) responsibilities.push("storage");
        if (classCode.includes("validation") || classCode.includes("validate")) responsibilities.push("validation");
        
        if (responsibilities.length > 2) {
          solidViolations.push(`🔴 **SRP Violation**: Class handles multiple responsibilities: ${responsibilities.join(", ")}`);
        }
      });
    }

    // Open/Closed Principle (OCP)
    if (code.includes("when") && code.includes("->") && !code.includes("sealed")) {
      solidViolations.push("🔴 **OCP Violation**: When expressions without sealed classes - not open for extension");
      suggestions.push("Consider using sealed classes with when expressions for extensibility");
    }

    // Liskov Substitution Principle (LSP)
    if (code.includes("override") && code.includes("TODO()")) {
      solidViolations.push("🔴 **LSP Violation**: Override with TODO() breaks substitutability");
    }

    // Interface Segregation Principle (ISP)
    const interfaceMethods = code.match(/interface\s+\w+[^{]*\{([^}]*)\}/g);
    if (interfaceMethods) {
      interfaceMethods.forEach(interfaceCode => {
        const methodCount = (interfaceCode.match(/fun\s+/g) || []).length;
        if (methodCount > 5) {
          solidViolations.push(`🔴 **ISP Violation**: Interface with ${methodCount} methods - consider breaking into smaller interfaces`);
        }
      });
    }

    // Dependency Inversion Principle (DIP)
    if (code.includes("import android") && !code.includes("interface") && !code.includes("@Inject")) {
      suggestions.push("Consider using interfaces and dependency injection to depend on abstractions");
    }
  }

  // === CLEAN CODE PRINCIPLES ===
  if (focus === "clean_code" || !focus) {
    // Function Length
    const functions = code.match(/fun\s+\w+[^{]*\{([\s\S]*?)(?=\n\s*fun|\n\s*\}|\Z)/g);
    if (functions) {
      functions.forEach((func, index) => {
        const lines = func.split('\n').filter(line => line.trim().length > 0).length;
        if (lines > 20) {
          cleanCodeIssues.push(`📏 **Function Too Long**: Function #${index + 1} has ${lines} lines - consider breaking down`);
        }
      });
    }

    // Meaningful Names
    const variableNames = code.match(/(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (variableNames) {
      variableNames.forEach(variable => {
        const name = variable.split(' ')[1];
        if (name.length < 3 && !['id', 'ui', 'db'].includes(name.toLowerCase())) {
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
    if (code.includes("!!")) {
      cleanCodeIssues.push("⚠️ **Not-null Assertion**: Using '!!' can cause crashes - use safe calls or proper null handling");
    }
    if (code.includes("?.") && code.includes("let")) {
      positives.push("✅ **Safe Calls**: Using safe call operator and let for null safety");
    }
    if (code.includes("try {") && code.includes("catch")) {
      positives.push("✅ **Error Handling**: Using proper try-catch error handling");
    }
  }

  // === KOTLIN-SPECIFIC BEST PRACTICES ===
  
  // Data Classes
  if (code.includes("data class")) {
    positives.push("📦 **Data Classes**: Using data classes for immutable data structures");
  }
  
  // Null Safety
  if (code.includes("?") && code.includes("?.")) {
    positives.push("🛡️ **Null Safety**: Using Kotlin's null safety features");
  }
  
  // Immutability
  const valCount = (code.match(/\bval\s+/g) || []).length;
  const varCount = (code.match(/\bvar\s+/g) || []).length;
  if (valCount > varCount) {
    positives.push("🔒 **Immutability**: Favoring 'val' over 'var' for immutable data");
  } else if (varCount > valCount * 2) {
    suggestions.push("Consider using 'val' instead of 'var' where values don't change");
  }

  // Extension Functions
  if (code.includes("fun ") && code.includes(".") && code.includes("()")) {
    positives.push("🔧 **Extension Functions**: Using extension functions for clean code");
  }

  // Coroutines
  if (code.includes("suspend") && code.includes("coroutine")) {
    positives.push("⚡ **Coroutines**: Using Kotlin coroutines for asynchronous operations");
    
    if (code.includes("Dispatchers.Main") && code.includes("withContext")) {
      positives.push("🎯 **Dispatcher Usage**: Proper coroutine dispatcher usage");
    }
  }

  // === ANDROID-SPECIFIC CHECKS ===
  
  // ViewBinding/DataBinding
  if (code.includes("ViewBinding") || code.includes("DataBinding")) {
    positives.push("📱 **Modern UI**: Using ViewBinding/DataBinding instead of findViewById");
  }

  // Lifecycle Awareness
  if (code.includes("LifecycleOwner") || code.includes("observe")) {
    positives.push("🔄 **Lifecycle Aware**: Using lifecycle-aware components");
  }

  // === PERFORMANCE & MEMORY (Enhanced) ===
  if (focus === "performance" || focus === "memory" || !focus) {
    // Lazy Properties
    if (code.includes("lazy")) {
      positives.push("⚡ **Lazy Initialization**: Using lazy properties for performance optimization");
    }

    // Memory Leaks
    if (code.includes("WeakReference") || code.includes("lifecycle")) {
      positives.push("💾 **Memory Management**: Using weak references or lifecycle awareness");
    }

    // Collection Performance
    if (code.includes("mutableListOf") && code.includes("add") && code.includes("for")) {
      suggestions.push("🚀 **Performance**: Consider using ArrayList with initial capacity for bulk operations");
    }
  }

  // === SECURITY (Enhanced) ===
  if (focus === "security" || !focus) {
    // Secure Storage
    if (code.includes("SharedPreferences") && (code.includes("password") || code.includes("token") || code.includes("key"))) {
      issues.push("🔐 **Security Risk**: Sensitive data in SharedPreferences - use EncryptedSharedPreferences or Keystore");
    }

    if (code.includes("EncryptedSharedPreferences") || code.includes("Keystore")) {
      positives.push("🔐 **Secure Storage**: Using encrypted storage for sensitive data");
    }

    // Network Security
    if (code.includes("http://") && !code.includes("localhost")) {
      issues.push("🔒 **Security**: Using HTTP instead of HTTPS for network requests");
    }

    // Input Validation
    if (code.includes("EditText") && !code.includes("validate")) {
      suggestions.push("🛡️ **Input Validation**: Consider validating user input before processing");
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
    report += "🎉 **Excellent Clean Code!** Your Kotlin code follows clean architecture and SOLID principles!\n\n";
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
  report += "• **Dependency Injection**: Use Hilt/Dagger for constructor injection\n";
  report += "• **SOLID Principles**: Follow Single Responsibility, Open/Closed, etc.\n";
  report += "• **Sealed Classes**: Use sealed classes for type-safe state management\n";
  report += "• **Data Classes**: Prefer data classes for immutable models\n";
  report += "• **Coroutines**: Use structured concurrency with proper dispatchers\n";
  report += "• **Testing**: Write unit tests for business logic and use cases\n";
  
  return report;
} 
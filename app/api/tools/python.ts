import { z } from "zod";
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Define proper MCP response type
export interface McpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

export const pythonToolConfig = {
  name: "python_exec",
  description: "Execute Python code with data science libraries (pandas, numpy, matplotlib, seaborn)",
  inputSchema: {
    code: z.string().describe("Python code to execute"),
    packages: z.array(z.string()).optional().describe("Additional packages to install (optional)"),
  },
};

export const pythonHandler = async ({ code, packages }: { 
  code: string; 
  packages?: string[] 
}): Promise<McpResponse> => {
  try {
    // Create temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Create a temporary Python file
    const tempFile = path.join(tempDir, `script_${Date.now()}.py`);
    
    // Prepare Python code with required imports and package installation
    let pythonCode = `
import sys
import subprocess
import os

# Install additional packages if provided
additional_packages = ${JSON.stringify(packages || [])}
if additional_packages:
    for package in additional_packages:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"Successfully installed {package}")
        except subprocess.CalledProcessError as e:
            print(f"Failed to install {package}: {e}")

# Common imports for data science
try:
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    import seaborn as sns
    from datetime import datetime, timedelta
    import json
    import re
    print("✅ Standard data science packages loaded successfully")
except ImportError as e:
    print(f"Warning: Some packages not available: {e}")

# User code
${code}
`;

    fs.writeFileSync(tempFile, pythonCode);
    
    return new Promise((resolve) => {
      const python = spawn('python3', [tempFile], {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      let output = '';
      let error = '';
      
      python.stdout.on('data', (data: Buffer) => {
        output += data.toString();
      });
      
      python.stderr.on('data', (data: Buffer) => {
        error += data.toString();
      });
      
      python.on('close', (code: number | null) => {
        // Clean up temp file
        try {
          fs.unlinkSync(tempFile);
        } catch (cleanupError) {
          console.error('Failed to clean up temp file:', cleanupError);
        }
        
        let result = '';
        if (output) {
          result += `📊 **Output:**\n\`\`\`\n${output.trim()}\`\`\`\n\n`;
        }
        
        if (error && !error.includes('WARNING')) {
          result += `⚠️ **Errors/Warnings:**\n\`\`\`\n${error.trim()}\`\`\`\n\n`;
        }
        
        if (code !== 0) {
          result += `❌ **Exit Code:** ${code}\n`;
        } else {
          result += `✅ **Execution completed successfully**`;
        }
        
        resolve({
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        });
      });
      
      // Handle timeout
      setTimeout(() => {
        python.kill();
        resolve({
          content: [
            {
              type: "text",
              text: "❌ **Error:** Execution timed out after 30 seconds",
            },
          ],
        });
      }, 30000);
    });
    
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ **Error:** ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
    };
  }
}; 
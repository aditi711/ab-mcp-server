'use client';

import React from 'react';

export default function Home() {
  const handleAddToCursor = async () => {
    const newServer = {
      transport: {
        type: "sse",
        url: "https://ab-mcp.vercel.app/api/sse"
      }
    };

    // Create a complete configuration that can be merged with existing ones
    const config = {
      mcpServers: {
        "ab-mcp-server": newServer
      }
    };

    // Create configuration with helpful comments
    const configWithComments = `{
  "_comment": "AB MCP Server Configuration - Move this file to ~/.cursor/mcp.json",
  "_instructions": "If you already have mcp.json, just add the ab-mcp-server entry to your existing mcpServers section",
  "mcpServers": {
    "ab-mcp-server": ${JSON.stringify(newServer, null, 6).replace(/^/gm, '    ')}
  }
}`;

    const configString = JSON.stringify(config, null, 2);

    try {
      // Try to use File System Access API (modern browsers)
      if ('showSaveFilePicker' in window) {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: 'mcp.json',
          types: [{
            description: 'JSON files',
            accept: { 'application/json': ['.json'] }
          }]
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(configWithComments);
        await writable.close();
        
        alert('✅ MCP configuration saved successfully!\n\n📁 File saved as mcp.json\n\n🔧 Next steps:\n1. Move to ~/.cursor/mcp.json (or merge with existing file)\n2. Restart Cursor to connect\n\n🚀 You now have direct access to 9 powerful MCP tools!');
        return;
      }
    } catch (err) {
      // User cancelled or other error, fall back to download
    }

    try {
      // Fallback: Download the file
      const blob = new Blob([configWithComments], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mcp.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('✅ MCP configuration downloaded!\n\n📁 File: mcp.json downloaded to your Downloads folder\n\n🔧 Next steps:\n1. Move mcp.json to ~/.cursor/mcp.json (or merge with existing file)\n2. Restart Cursor to connect\n\n🚀 Direct SSE connection configured - you now have access to 9 powerful MCP tools!\n\n💡 Tip: If you already have mcp.json, just add the ab-mcp-server entry to your existing mcpServers section.');
    } catch (err) {
      // Final fallback: Copy to clipboard
      navigator.clipboard.writeText(configString).then(() => {
        alert('✅ MCP configuration copied to clipboard!\n\n📁 Next steps:\n1. Create ~/.cursor/mcp.json\n2. Paste the configuration\n3. Restart Cursor to connect\n\n🔧 Direct SSE connection configured!');
      }).catch(() => {
        alert('❌ Auto-configuration failed. Please manually create ~/.cursor/mcp.json with:\n\n' + configString);
      });
    }
  };

  const handleViewGitHub = () => {
    window.open('https://github.com/aditi711/ab-mcp-server', '_blank');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            color: 'white', 
            marginBottom: '0.5rem',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            🔬 AB MCP Server
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '1rem',
            fontWeight: '400'
          }}>
            AI-Powered Development Tools Platform
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            <strong>AB MCP Server</strong> is a comprehensive Model Context Protocol server that provides intelligent development tools powered by AI integration, Swift iOS code review, Python execution, and web scraping capabilities.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: '2rem' }}>
          {/* Top Row - 3 Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* AI Agent Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>AI Agent</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                OpenAI-powered agent for intelligent code analysis and development assistance.
              </p>
            </div>

            {/* Python Integration Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🐍</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Python Integration</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Seamless TypeScript-to-Python integration with pandas, numpy, matplotlib.
              </p>
            </div>

            {/* Web Scraping Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌐</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Web Scraping & Analysis</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Advanced web scraping with Firecrawl for clean data extraction, URL analysis, SEO insights.
              </p>
            </div>
          </div>

          {/* Bottom Row - 2 Cards (Swift & Kotlin) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* Swift Code Review Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📱</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Swift Code Review</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Comprehensive iOS code review with clean architecture, SOLID principles, and best practices.
              </p>
            </div>

            {/* Kotlin Code Review Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              position: 'relative'
            }}>
              <div style={{ 
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#22C55E',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                Available
              </div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Kotlin Code Review</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Comprehensive Android code review with clean architecture, MVVM patterns, and Kotlin best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          {['TypeScript', 'Next.js 14', 'Python', 'OpenAI', 'Firecrawl', 'Swift', 'Kotlin', 'MCP Protocol'].map(tech => (
            <span key={tech} style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem'
        }}>
          <button 
            onClick={handleAddToCursor}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#667eea',
              border: 'none',
              padding: '0.875rem 1.75rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(255, 255, 255, 1)';
              target.style.transform = 'translateY(-1px)';
              target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(255, 255, 255, 0.9)';
              target.style.transform = 'translateY(0px)';
              target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
          >
            🔌 Install to Cursor
          </button>
          <button 
            onClick={handleViewGitHub}
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              padding: '0.875rem 1.75rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(255, 255, 255, 0.1)';
              target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'transparent';
              target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              target.style.transform = 'translateY(0px)';
            }}
          >
            📂 View Source Code
          </button>
        </div>


      </div>
    </div>
  );
} 
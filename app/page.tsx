'use client';

import React from 'react';

export default function Home() {
  const handleAddToCursor = () => {
    // Try Cursor deeplink first
    const deeplink = `cursor://mcp/add?url=${encodeURIComponent('https://ab-mcp.vercel.app/api/sse')}&name=ab-mcp-server&type=sse`;
    const command = `npx mcp-remote add https://ab-mcp.vercel.app/api/sse --name ab-mcp-server --type sse`;
    
    // Attempt to open Cursor deeplink
    window.location.href = deeplink;
    
    // Copy fallback command and show instructions
    navigator.clipboard.writeText(command).then(() => {
      // Show success message with both methods
      setTimeout(() => {
        alert('🚀 Attempting to add AB MCP Server directly to Cursor...\n\n✨ If Cursor opened automatically - great! The server should be added to your MCP tools.\n\n📋 Fallback: If the direct link didn\'t work, run this command:\n\n' + command + '\n\nThen restart Cursor to access all 9 MCP tools!');
      }, 500);
    }).catch(() => {
      // Fallback if clipboard fails
      setTimeout(() => {
        alert('🚀 Attempting to open Cursor directly...\n\n📋 If that didn\'t work, manually run:\n\n' + command + '\n\n✨ This will add AB MCP Server to Cursor\'s tools & integrations!');
      }, 500);
    });
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
🚀 Add to Cursor
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
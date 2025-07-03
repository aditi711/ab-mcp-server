'use client';

import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputValue,
          system_prompt: systemPrompt || undefined,
          model: model,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          role: 'assistant',
          content: `Error: ${data.error}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Failed to send message. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.95)', 
      borderRadius: '12px', 
      padding: '1.5rem',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h3 style={{ color: '#667eea', margin: 0 }}>🤖 AI Agent Chat</h3>
        <div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              border: '1px solid #667eea',
              borderRadius: '6px',
              background: 'transparent',
              color: '#667eea',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Settings
          </button>
          <button 
            onClick={clearChat}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #667eea',
              borderRadius: '6px',
              background: '#667eea',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Clear Chat
          </button>
        </div>
      </div>

      {showSettings && (
        <div style={{ 
          background: '#f9f9f9', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <h4>Settings</h4>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              Model:
            </label>
            <select 
              value={model} 
              onChange={(e) => setModel(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="gpt-4o-mini">GPT-4o Mini</option>
              <option value="gpt-4o">GPT-4o</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              System Prompt (Optional):
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter a system prompt to customize the assistant's behavior..."
              style={{
                width: '100%',
                height: '80px',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      )}

      <div style={{ 
        height: '400px', 
        overflowY: 'auto',
        border: '1px solid #eee',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '1rem',
        background: '#fafafa'
      }}>
        {messages.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>
            Start a conversation with the AI agent...
          </p>
        ) : (
          messages.map((message, index) => (
            <div key={index} style={{ 
              marginBottom: '1rem',
              padding: '0.75rem',
              borderRadius: '4px',
              background: message.role === 'user' ? '#e3f2fd' : '#f1f8e9'
            }}>
              <div style={{ 
                fontWeight: 'bold',
                marginBottom: '0.25rem',
                color: message.role === 'user' ? '#1976d2' : '#388e3c'
              }}>
                {message.role === 'user' ? '👤 You' : '🤖 Assistant'}
              </div>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </div>
              <div style={{ 
                fontSize: '0.75rem',
                color: '#666',
                marginTop: '0.25rem'
              }}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div style={{ 
            textAlign: 'center',
            padding: '1rem',
            color: '#666'
          }}>
            🤖 Assistant is thinking...
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            background: isLoading || !inputValue.trim() ? '#ccc' : '#007bff',
            color: 'white',
            cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
} 
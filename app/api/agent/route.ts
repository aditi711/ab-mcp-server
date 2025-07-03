import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate API key on startup
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not set in environment variables');
  console.error('Please create a .env.local file with your OpenAI API key');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, system_prompt, model } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const messages = [];
    
    // Add system prompt if provided, otherwise use default
    if (system_prompt) {
      messages.push({ role: "system", content: system_prompt });
    } else {
      messages.push({ 
        role: "system", 
        content: "You are a helpful AI assistant. Provide clear, accurate, and helpful responses." 
      });
    }
    
    // Add user prompt
    messages.push({ role: "user", content: prompt });
    
    const response = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    });
    
    const content = response.choices[0]?.message?.content || "No response generated";
    
    return NextResponse.json({ 
      success: true, 
      response: content,
      model: model || "gpt-4o-mini"
    });
    
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get response from AI agent', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 
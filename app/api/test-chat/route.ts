import { NextRequest, NextResponse } from 'next/server';
import { sendToOpenAI } from '@/app/lib/openai';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json({
        error: 'Message is required'
      }, { status: 400 });
    }
    
    // Call the OpenAI function with a simple message
    const response = await sendToOpenAI([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message }
    ]);
    
    // Return the response
    return NextResponse.json({
      message: response
    });
  } catch (error: any) {
    console.error('Test chat API error:', error);
    return NextResponse.json({
      error: error.message || 'An error occurred'
    }, { status: 500 });
  }
} 
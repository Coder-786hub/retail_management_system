import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Check different ways the environment variable might be loaded
  const envCheck = {
    NEXT_PUBLIC_OPENAI_KEY: {
      exists: Boolean(process.env.NEXT_PUBLIC_OPENAI_KEY),
      firstChars: process.env.NEXT_PUBLIC_OPENAI_KEY ? 
        process.env.NEXT_PUBLIC_OPENAI_KEY.substring(0, 3) + '...' : 'undefined'
    },
    VITE_OPENAI_KEY: {
      exists: Boolean(process.env.VITE_OPENAI_KEY),
      firstChars: process.env.VITE_OPENAI_KEY ?
        process.env.VITE_OPENAI_KEY.substring(0, 3) + '...' : 'undefined'
    },
    NODE_ENV: process.env.NODE_ENV
  };

  return NextResponse.json({
    success: true,
    message: 'Environment variables check',
    environment: envCheck
  });
} 
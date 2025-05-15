'use client';

import { useState, useEffect } from 'react';
import { sendToOpenAI } from '../lib/openai';

export default function TestPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('');
  const [apiKey, setApiKey] = useState('');

  // Check environment on load
  useEffect(() => {
    // Safely get the first 5 characters of the API key if available
    const key = process.env.NEXT_PUBLIC_OPENAI_KEY || process.env.VITE_OPENAI_KEY || '';
    if (key) {
      setApiKey(`${key.substring(0, 5)}...${key.substring(key.length - 4)}`);
      setApiStatus('✅ API key found');
    } else {
      setApiStatus('❌ No API key found in environment variables');
    }
  }, []);

  const handleTest = async () => {
    if (!input.trim() || loading) return;
    
    setLoading(true);
    setError('');
    setResponse('');
    
    try {
      setApiStatus('🔄 Sending request to OpenAI...');
      const result = await sendToOpenAI([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: input }
      ], (chunk) => {
        setResponse(prev => prev + chunk);
      });
      
      setApiStatus('✅ Request completed successfully');
      console.log('Test complete with result:', result);
    } catch (error: any) {
      console.error('Test error:', error);
      setError(error.message || 'An unknown error occurred');
      setApiStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">OpenAI Integration Test</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-md">
          <h2 className="text-lg font-bold mb-2">API Status</h2>
          <p className="mb-2">{apiStatus}</p>
          {apiKey && <p className="text-sm text-gray-400">API Key: {apiKey}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Test message:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTest()}
            placeholder="Type something to test..."
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={handleTest}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test OpenAI Integration'}
        </button>
        
        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-md">
            <h3 className="font-bold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}
        
        {response && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Response:</h3>
            <div className="p-4 bg-gray-800 border border-gray-700 rounded-md whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
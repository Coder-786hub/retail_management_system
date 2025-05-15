'use client';

import { useState } from 'react';
import { sendToOpenAI, extractPortalContent } from '../../lib/openai';

export default function PortalTestPage() {
  const [input, setInput] = useState('Create a #PORTAL: visualization showing monthly sales data from Jan to Dec');
  const [response, setResponse] = useState('');
  const [portalContent, setPortalContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTest = async () => {
    if (!input.trim() || loading) return;
    
    setLoading(true);
    setError('');
    setResponse('');
    setPortalContent('');
    
    try {
      // For tracking the accumulated response
      let accumulatedResponse = '';
      
      // Add a system message that encourages portal content generation
      const result = await sendToOpenAI([
        { 
          role: 'system', 
          content: 'You are a helpful assistant that provides visualizations. When asked for data or charts, ALWAYS include a special #PORTAL: marker followed by the visualization data in JSON format or text representation of the visualization.' 
        },
        { role: 'user', content: input }
      ], (chunk) => {
        accumulatedResponse += chunk;
        setResponse(accumulatedResponse);
        
        // Check for portal content as chunks arrive
        const { message, portalContent: extractedContent } = extractPortalContent(accumulatedResponse);
        if (extractedContent) {
          setPortalContent(extractedContent);
        }
      });
      
      // Final check for portal content
      const { message, portalContent: extractedContent } = extractPortalContent(result);
      if (extractedContent && !portalContent) {
        setPortalContent(extractedContent);
      }
      
      console.log('Test complete with result:', result);
    } catch (error: any) {
      console.error('Test error:', error);
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Portal Visualization Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <div className="mb-4">
            <label className="block mb-2">Test message (include visualizations):</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="Create a visualization of monthly sales data..."
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={handleTest}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Portal Visualization'}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-md">
              <h3 className="font-bold mb-2">Error:</h3>
              <p>{error}</p>
            </div>
          )}
          
          {response && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">AI Response:</h3>
              <div className="p-4 bg-gray-800 border border-gray-700 rounded-md whitespace-pre-wrap overflow-auto max-h-80">
                {response}
              </div>
            </div>
          )}
        </div>
        
        <div className="col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 h-full min-h-[400px]">
            <h2 className="text-xl font-medium text-white mb-4">Portal Content</h2>
            {portalContent ? (
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg p-4 overflow-auto h-[calc(100%-2rem)]">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {portalContent}
                </pre>
                {/* Attempt to render JSON data if valid */}
                {(() => {
                  try {
                    const data = JSON.parse(portalContent);
                    return (
                      <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                        <h3 className="text-white font-bold mb-2">JSON Data Preview:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(data).map(([key, value]) => (
                            <div key={key} className="col-span-1">
                              <span className="text-blue-300">{key}: </span>
                              <span className="text-gray-300">
                                {typeof value === 'object' 
                                  ? '[Object/Array]' 
                                  : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } catch (e) {
                    // Not JSON, that's fine
                    return null;
                  }
                })()}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100%-2rem)] text-gray-400">
                <div className="text-center">
                  <p>No portal content yet</p>
                  <p className="text-sm mt-2">Portal content will appear here when detected in the AI response</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
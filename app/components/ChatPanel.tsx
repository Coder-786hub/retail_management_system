import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, extractPortalContent, sendToOpenAI } from '../lib/openai';
import { buildSalesContext, getQueryMode, createModeSpecificSystem } from '../lib/buildContext';

// Import required data files
import locationData from '../../data/sales-by-product-and-location.json';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface ChatPanelProps {
  onSendMessage?: (message: string) => void;
  onPortalContent?: (content: string) => void;
}

// Prepare the data for passing to context builders
const prepareData = () => {
  try {
    // For demo purposes, we'll extract some sample data from the large JSON file
    // In a real app, we'd use proper data structures based on our schema
    
    // Sample locations (assuming structure based on context)
    const locations = [
      { Location: "Denver", "Gross Sales": 258000, "Gross Profit": 125000, "Items Sold": 5200 },
      { Location: "Boulder", "Gross Sales": 185000, "Gross Profit": 98000, "Items Sold": 3800 },
      { Location: "Fort Collins", "Gross Sales": 142000, "Gross Profit": 68000, "Items Sold": 2900 },
      { Location: "Colorado Springs", "Gross Sales": 198000, "Gross Profit": 88000, "Items Sold": 4100 },
      { Location: "Pueblo", "Gross Sales": 95000, "Gross Profit": 52000, "Items Sold": 1950 }
    ];
    
    // Sample products (assuming structure based on context)
    const products = [
      { Product: "Blue Dream", Category: "Flower", "Gross Sales": 78000, "Gross Profit": 42000, "Items Sold": 1850 },
      { Product: "Sour Diesel", Category: "Flower", "Gross Sales": 65000, "Gross Profit": 35000, "Items Sold": 1540 },
      { Product: "Girl Scout Cookies", Category: "Flower", "Gross Sales": 55000, "Gross Profit": 29000, "Items Sold": 1280 },
      { Product: "OG Kush", Category: "Flower", "Gross Sales": 48000, "Gross Profit": 26000, "Items Sold": 1150 },
      { Product: "Purple Haze", Category: "Flower", "Gross Sales": 42000, "Gross Profit": 22000, "Items Sold": 980 },
      { Product: "Northern Lights Vape", Category: "Vapes", "Gross Sales": 38000, "Gross Profit": 25000, "Items Sold": 650 },
      { Product: "Indica Gummies", Category: "Edibles", "Gross Sales": 32000, "Gross Profit": 20000, "Items Sold": 2400 },
      { Product: "CBD Tincture", Category: "Tinctures", "Gross Sales": 28000, "Gross Profit": 18000, "Items Sold": 850 }
    ];
    
    return { locations, products };
  } catch (error) {
    console.error("Error preparing data:", error);
    // Return fallback data if parsing fails
    return {
      locations: [],
      products: []
    };
  }
};

// Panel component
export default function ChatPanel({ onSendMessage, onPortalContent }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [lastSystemMessage, setLastSystemMessage] = useState<string>('');
  
  // Prepare the data
  const { locations, products } = prepareData();
  
  // Mock data for initial layout
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I assist you with your cannabis retail data today?',
      role: 'assistant',
      timestamp: '10:30:00',
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add debug code to check if environment variables are loading
  useEffect(() => {
    console.log("🧪 Environment check (ChatPanel):");
    console.log("🔑 OpenAI Key available:", Boolean(process.env.NEXT_PUBLIC_OPENAI_KEY));
    console.log("🔍 First few chars:", process.env.NEXT_PUBLIC_OPENAI_KEY?.substring(0, 3) + "...");
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userInput = input.trim();
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Call the parent's onSendMessage if provided for the user message
    if (onSendMessage) {
      onSendMessage(`User: ${userInput}`);
    }
    
    setInput('');
    setIsLoading(true);
    
    // Create a temporary message for streaming
    const responseId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: responseId,
      content: '',
      role: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }]);
    
    try {
      // Build context based on the user's query
      const queryMode = getQueryMode(userInput);
      const systemMessage = buildSalesContext(locations, products, userInput);
      
      // Store system message for debugging
      setLastSystemMessage(systemMessage.content);
      
      // Format messages for OpenAI
      const apiMessages: ChatMessage[] = [
        systemMessage,
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant' as 'user' | 'assistant',
          content: msg.content
        })),
        { role: 'user' as const, content: userInput }
      ];
      
      // Log system message
      if (onSendMessage) {
        onSendMessage(`Building context and calling OpenAI API with ${apiMessages.length} messages`);
      }
      
      let fullContent = '';
      
      // Use the sendToOpenAI function with a progress callback
      await sendToOpenAI(apiMessages, (chunk) => {
        fullContent += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responseId 
              ? { ...msg, content: fullContent } 
              : msg
          )
        );
      }).catch(error => {
        console.error("Chat error:", error);
        throw error;
      });
      
      // Check for portal content
      const { message, portalContent } = extractPortalContent(fullContent);
      
      // Log AI response
      if (onSendMessage) {
        onSendMessage(`Received response from OpenAI: ${fullContent.substring(0, 50)}${fullContent.length > 50 ? '...' : ''}`);
      }
      
      if (portalContent && onPortalContent) {
        onPortalContent(portalContent);
        
        // Also log that we found portal content
        if (onSendMessage) {
          onSendMessage(`Portal: Found visualization data`);
        }
      }
      
      // Update the message with the final content
      setMessages(prev => 
        prev.map(msg => 
          msg.id === responseId 
            ? { ...msg, content: message } 
            : msg
        )
      );
    } catch (error: any) {
      console.error('Error fetching response:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === responseId 
            ? { ...msg, content: `Sorry, I encountered an error while processing your request: ${error.message}` } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle debug mode
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Toggle debug mode with Ctrl+Shift+D
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      setDebugMode(!debugMode);
    }
    
    // Send message with Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg h-full flex flex-col">
      <div className="text-lg font-medium text-white px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <span>Chat</span>
        {debugMode && <span className="text-xs text-indigo-400">Debug Mode</span>}
      </div>
      
      {/* Debug overlay */}
      {debugMode && (
        <div className="bg-gray-900 border-b border-gray-700 p-3 text-xs font-mono text-gray-400 max-h-40 overflow-y-auto">
          <p className="font-semibold text-indigo-400 mb-1">Last System Message:</p>
          <pre className="whitespace-pre-wrap">{lastSystemMessage}</pre>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.role === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'}`}
            >
              <div className={`p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-gray-700 border border-gray-600 rounded-tl-none'
              }`}>
                <p className="text-sm">{message.content || (isLoading && message.role === 'assistant' ? 'Thinking...' : '')}</p>
              </div>
              <div className={`text-xs text-gray-400 mt-1 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}>
                {message.timestamp}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 outline-none transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg px-4 py-2 transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
} 
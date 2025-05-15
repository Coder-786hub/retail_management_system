import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import Command types manually since cmdk module doesn't have proper typescript support
const { Command } = require('cmdk');

interface CommandInputProps {
  onSendMessage?: (message: string) => void;
  onPortalContent?: (content: string) => void;
}

interface CommandResult {
  id: string;
  query: string;
  content: string;
  timestamp: string;
  type: 'insight' | 'chart' | 'error' | 'system';
}

export default function CommandInput({ onSendMessage, onPortalContent }: CommandInputProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<CommandResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resultsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [results]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleCommand = async () => {
    if (!input.trim() || isLoading) return;
    
    const userInput = input.trim();
    
    const newResult: CommandResult = {
      id: Date.now().toString(),
      query: userInput,
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    
    setResults(prev => [...prev, newResult]);
    
    if (onSendMessage) {
      onSendMessage(`User: ${userInput}`);
    }
    
    setInput('');
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a response based on the command
      let responseResult: CommandResult;
      
      if (userInput.toLowerCase().includes('top location') || userInput.toLowerCase().includes('best location')) {
        responseResult = {
          id: Date.now().toString(),
          query: userInput,
          content: `
## Top Locations

🏆 **Denver** — $258,000
📈 **Colorado Springs** — Strong Growth
🌱 **Boulder** — $185,000
          `,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'insight'
        };
        
        // Also send visualization data to the portal
        if (onPortalContent) {
          onPortalContent(JSON.stringify({
            chart_type: 'bar',
            title: 'Top Locations by Sales',
            labels: ['Denver', 'Colorado Springs', 'Boulder', 'Fort Collins', 'Pueblo'],
            data: [258000, 198000, 185000, 142000, 95000],
            colors: ['bg-neon-blue', 'bg-neon-purple', 'bg-neon-green', 'bg-neon-cyan', 'bg-zinc-500']
          }));
        }
      } else if (userInput.toLowerCase().includes('top product') || userInput.toLowerCase().includes('best product')) {
        responseResult = {
          id: Date.now().toString(),
          query: userInput,
          content: `
## Top Products

🔥 **Blue Dream** — $78,000
💪 **Sour Diesel** — $65,000
🌟 **Girl Scout Cookies** — $55,000
          `,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'insight'
        };
        
        if (onPortalContent) {
          onPortalContent(JSON.stringify({
            chart_type: 'bar',
            title: 'Top Products by Sales',
            labels: ['Blue Dream', 'Sour Diesel', 'GSC', 'OG Kush', 'Purple Haze'],
            data: [78000, 65000, 55000, 48000, 42000],
            colors: ['bg-neon-green', 'bg-neon-blue', 'bg-neon-purple', 'bg-neon-cyan', 'bg-zinc-500']
          }));
        }
      } else if (userInput.toLowerCase().includes('margin') || userInput.toLowerCase().includes('profit')) {
        responseResult = {
          id: Date.now().toString(),
          query: userInput,
          content: `
## Profit Margins

📊 **Vapes**: 65.8%
📈 **Flower**: 53.2%
💰 **Edibles**: 62.5%
          `,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'chart'
        };
        
        if (onPortalContent) {
          onPortalContent(JSON.stringify({
            chart_type: 'pie',
            title: 'Profit Margins by Category',
            labels: ['Vapes', 'Flower', 'Edibles', 'Tinctures', 'Other'],
            data: [65.8, 53.2, 62.5, 64.3, 48.7]
          }));
        }
      } else {
        responseResult = {
          id: Date.now().toString(),
          query: userInput,
          content: `I've analyzed your query about "${userInput}". Would you like to see:

- Top selling locations
- Product performance 
- Profit margin analysis`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'system'
        };
      }
      
      setResults(prev => [...prev, responseResult]);
      
      if (onSendMessage) {
        onSendMessage(`AI response: ${responseResult.content.substring(0, 50)}...`);
      }
    } catch (error: any) {
      console.error('Error processing command:', error);
      
      setResults(prev => [...prev, {
        id: Date.now().toString(),
        query: userInput,
        content: `Error processing your command: ${error.message || 'Unknown error'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800/50 backdrop-blur-sm flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Copilot</h2>
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">⌘</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">K</kbd>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {results.map((result) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="mb-1.5 flex items-center">
                <div className="flex items-center text-xs text-zinc-400">
                  <span className="mr-2">{`> ${result.query}`}</span>
                </div>
                <div className="flex-1 h-px bg-zinc-800 ml-2"></div>
                <div className="text-xs text-zinc-500 ml-2">{result.timestamp}</div>
              </div>
              <div className={`cmd-result ${
                result.type === 'insight' ? 'glow-green' : 
                result.type === 'chart' ? 'glow-blue' :
                result.type === 'error' ? 'text-red-400' : ''
              }`}>
                <div className="prose prose-invert prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: result.content.replace(/\n/g, '<br>') }} />
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="flex items-center space-x-2 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="h-4 w-4 relative">
                  <div className="absolute inset-0 border-t-2 border-l-2 border-neon-blue rounded-full animate-spin"></div>
                </div>
                <span className="text-zinc-400 text-sm">Processing your command...</span>
              </div>
            </motion.div>
          )}
          <div ref={resultsEndRef} />
        </AnimatePresence>
      </div>
      
      <div className="p-4 mt-auto">
        <Command className="relative">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple opacity-75 group-hover:opacity-100 blur rounded-lg transition-opacity"></div>
            <div className="relative">
              <Command.Input
                ref={inputRef}
                value={input}
                onValueChange={setInput}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCommand();
                  }
                }}
                placeholder="Ask anything or type a command..."
                disabled={isLoading}
                className="cmd-input"
              />
            </div>
          </div>
          {isOpen && (
            <Command.List className="absolute bottom-full mb-1 w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl max-h-80 overflow-y-auto z-10">
              <Command.Empty>No suggestions found</Command.Empty>
              <Command.Group heading="Suggestions">
                <Command.Item onSelect={() => setInput("Show top locations")}>
                  Show top locations
                </Command.Item>
                <Command.Item onSelect={() => setInput("Compare product margins")}>
                  Compare product margins
                </Command.Item>
                <Command.Item onSelect={() => setInput("Find best selling products")}>
                  Find best selling products
                </Command.Item>
              </Command.Group>
            </Command.List>
          )}
        </Command>
      </div>
    </div>
  );
} 
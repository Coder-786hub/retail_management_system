import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Column, Button, Badge } from './ui';

interface CopilotPanelProps {
  className?: string;
  onSendMessage?: (message: string) => void;
}

// Sample insight data for demo
const insights = [
  {
    id: '1',
    query: 'show top locations',
    result: 'Denver - $258,000',
    type: 'insight',
    hasChart: true
  },
  {
    id: '2',
    query: 'compare margins',
    result: 'Denver: 42%, Boulder: 38%, Colorado Springs: 35%',
    type: 'insight',
    hasChart: false
  }
];

const CopilotPanel: React.FC<CopilotPanelProps> = ({ className = '', onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState(insights);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user command to history
    const newEntry = {
      id: Date.now().toString(),
      query: inputValue,
      result: '',
      type: 'command',
      hasChart: false
    };
    
    setHistory(prev => [...prev, newEntry]);
    
    // Clear input and show processing state
    setInputValue('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Add AI response after delay
      const newResult = {
        id: (Date.now() + 1).toString(),
        query: '',
        result: `Analyzing ${inputValue}... Found trend in Denver sales.`,
        type: Math.random() > 0.5 ? 'insight' : 'chart',
        hasChart: Math.random() > 0.5
      };
      
      setHistory(prev => [...prev, newResult]);
      setIsProcessing(false);
      
      // If callback provided, send to parent
      if (onSendMessage) {
        onSendMessage(inputValue);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render different card types
  const renderCard = (item: any) => {
    if (item.type === 'command') {
      return (
        <div className="py-1.5 px-3 text-text-primary font-mono text-[12px] truncate">
          <span className="text-neon-green mr-1">&gt;</span> {item.query}
        </div>
      );
    }
    
    if (item.type === 'chart') {
      return (
        <div className="card-chart py-2 px-3">
          <div className="flex items-center">
            <Badge color="accent" variant="filled" size="sm" className="py-0.5 px-1.5 mr-1.5">
              <span className="text-[9px]">Chart</span>
            </Badge>
            <div className="text-[10px] text-text-muted">Data visualization</div>
          </div>
          <div className="font-medium text-[13px] text-neon-blue text-glow-accent truncate">{item.result}</div>
          {item.hasChart && (
            <div className="h-32 bg-panel-darker rounded-lg flex items-center justify-center border border-zinc-800/50 mt-2">
              <div className="text-text-muted text-xs">Chart Visualization</div>
            </div>
          )}
        </div>
      );
    }
    
    // Default insight card
    return (
      <div className="card-insight py-2 px-3">
        <div className="flex items-center">
          <Badge color="primary" variant="filled" size="sm" className="py-0.5 px-1.5 mr-1.5">
            <span className="text-[9px]">Insight</span>
          </Badge>
          <div className="text-[10px] text-text-muted">AI analysis</div>
        </div>
        <div className="font-medium text-[13px] text-neon-green text-glow-subtle truncate">{item.result}</div>
        {item.hasChart && (
          <Button variant="ghost" size="sm" className="mt-2 text-[11px]">
            View details
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={`${className} h-full flex flex-col`}>
      <div className="floating-column flex flex-col h-full p-0 overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center panel-header flex-shrink-0">
          <h3 className="font-heading text-lg font-medium text-text-primary flex-1 overflow-hidden text-ellipsis">
            Copilot
          </h3>
        </div>
        
        {/* Messages area - scrollable */}
        <div className="flex-1 overflow-y-auto px-5 pb-20">
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderCard(item)}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ai-active bg-panel-darker rounded-lg py-2 px-3 text-sm"
              >
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-neon-green animate-pulse"></div>
                  <span className="text-neon-green">AI thinking...</span>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </div>
        
        {/* Input area - fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-[#111111] border-t border-zinc-800/30">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or type a command..."
              className="w-full bg-panel-darker border-0 rounded-lg px-4 py-3 text-text-primary pr-10 focus:outline-none shadow-sm"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-green opacity-75 hover:opacity-100 disabled:opacity-30 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotPanel; 
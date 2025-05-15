import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Column, Button, Badge, TabGroup } from './ui';

// Define entry types
interface LogEntry {
  id: string;
  message: string;
  type: 'system' | 'ai' | 'risk' | 'insight' | 'trend' | 'error' | 'portal';
  timestamp: string;
  priority?: 'high' | 'medium' | 'low';
  metadata?: {
    prompt?: string;
    source?: string;
    confidence?: number;
    tracePath?: string[];
    relatedLogs?: string[];
  };
}

interface InsightsPanelProps {
  logs?: LogEntry[];
  className?: string;
  onSendMessage?: (message: string) => void;
}

// Sample insights with priority
const enhancedLogs: LogEntry[] = [
  {
    id: '2',
    message: 'Top location: Denver ($258,000)',
    type: 'insight',
    timestamp: '10:30:05',
    priority: 'high',
    metadata: {
      prompt: 'identify top performing locations',
      confidence: 0.95,
      source: 'Sales Analytics Module',
      tracePath: ['query_processor', 'location_analyzer', 'rank_algorithm']
    }
  },
  {
    id: '3',
    message: 'Colorado Springs showing strong growth',
    type: 'trend',
    timestamp: '10:30:10',
    priority: 'high',
    metadata: {
      confidence: 0.87,
      source: 'Trend Detection Module',
      tracePath: ['time_series_analyzer', 'growth_detector']
    }
  },
  {
    id: '5',
    message: 'Boulder location has 5 products below minimum stock level',
    type: 'risk',
    timestamp: '10:30:20',
    priority: 'high',
    metadata: {
      confidence: 0.82,
      source: 'Inventory Control',
      tracePath: ['stock_monitoring', 'threshold_analysis']
    }
  },
  {
    id: '1',
    message: 'Sales data loaded - 5 locations, awaiting queries',
    type: 'system',
    timestamp: '10:30:00',
    priority: 'low',
    metadata: {
      source: 'Database Connector',
      tracePath: ['startup', 'database_init', 'data_load']
    }
  },
  {
    id: '4',
    message: 'Running margin comparison across locations',
    type: 'system',
    timestamp: '10:30:15',
    priority: 'low',
    metadata: {
      prompt: 'compare margins last 7d',
      source: 'Command Processor',
      tracePath: ['command_parser', 'intent_classifier', 'margin_analyzer']
    }
  }
];

export default function InsightsPanel({ logs = enhancedLogs, className = '', onSendMessage }: InsightsPanelProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [processingAnimation, setProcessingAnimation] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showAllInsights, setShowAllInsights] = useState(false);
  
  // Scroll to bottom when logs change
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, showAllInsights]);
  
  // Filter logs based on search term and type
  const filteredLogs = logs.filter(log => {
    // First apply type filter if set
    if (filter && log.type !== filter) return false;
    
    // Then apply search term if any
    if (searchTerm.trim() === '') return true;
    return log.message.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get high priority logs
  const highPriorityLogs = filteredLogs.filter(log => log.priority === 'high');
  
  // Get top 3 priority logs or filtered logs if filter is applied
  const topLogs = filter ? filteredLogs : (showAllInsights ? filteredLogs : highPriorityLogs.slice(0, 3));
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setInputValue('');
    setProcessingAnimation(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessingAnimation(false);
      
      // If callback provided, send to parent
      if (onSendMessage) {
        onSendMessage(inputValue);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Get icon for log type
  const getLogIcon = (type: string) => {
    switch(type) {
      case 'system':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'trend':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'insight':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'risk':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'portal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  // Get class for log type
  const getLogClass = (type: string) => {
    switch(type) {
      case 'system':
        return 'text-zinc-400';
      case 'trend':
        return 'text-neon-blue';
      case 'insight':
        return 'text-neon-green';
      case 'risk':
        return 'text-neon-warn';
      case 'portal':
        return 'text-neon-cyan';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };
  
  // Render expanded metadata
  const renderMetadata = (log: LogEntry) => {
    if (!log.metadata) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-2 p-2 bg-zinc-800/30 rounded-md text-xs border border-zinc-700/30"
      >
        <div className="mb-1.5 text-[10px] uppercase tracking-wider text-zinc-500">Metadata</div>
        <div className="grid grid-cols-2 gap-2">
          {log.metadata.prompt && (
            <div>
              <span className="text-zinc-500">Prompt:</span>{' '}
              <span className="font-mono text-neon-blue">{log.metadata.prompt}</span>
            </div>
          )}
          {log.metadata.source && (
            <div>
              <span className="text-zinc-500">Source:</span>{' '}
              <span className="font-mono text-neon-purple">{log.metadata.source}</span>
            </div>
          )}
          {log.metadata.confidence && (
            <div>
              <span className="text-zinc-500">Confidence:</span>{' '}
              <span className="font-mono text-neon-green">{log.metadata.confidence.toFixed(2)}</span>
            </div>
          )}
          {log.metadata.tracePath && (
            <div className="col-span-2">
              <span className="text-zinc-500">Trace:</span>{' '}
              <span className="font-mono text-zinc-400">
                {log.metadata.tracePath.map((path, i) => (
                  <span key={i}>
                    {i > 0 && <span className="mx-1 text-zinc-600">→</span>}
                    <span>{path}</span>
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };
  
  return (
    <Column 
      title="Insights Log"
      floating={true}
      className={`${className} panel`}
      header={
        <div className={`flex items-center justify-between w-full header-gradient`}>
          {/* AI summary at the top */}
          <div className="text-xs text-zinc-200 max-w-[300px] truncate">
            Denver leads sales, but Boulder shows stock risks. Convert pre-rolls this week.
          </div>
        </div>
      }
      footer={
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type: 'show top SKUs' or 'compare margins'..."
            className={`w-full bg-panel-darker rounded-lg px-4 py-3 text-text-primary pr-10 focus:outline-none border-0 shadow-sm ${processingAnimation || isFocused ? 'shadow-md' : ''}`}
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
      }
    >
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setFilter(null)}
            glowColor={!filter ? 'primary' : 'none'}
          >
            All
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setFilter(filter === 'system' ? null : 'system')}
            glowColor={filter === 'system' ? 'primary' : 'none'}
          >
            System
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setFilter(filter === 'risk' ? null : 'risk')}
            glowColor={filter === 'risk' ? 'primary' : 'none'}
          >
            Risk
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setFilter(filter === 'insight' ? null : 'insight')}
            glowColor={filter === 'insight' ? 'primary' : 'none'}
          >
            Insight
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setFilter(filter === 'trend' ? null : 'trend')}
            glowColor={filter === 'trend' ? 'primary' : 'none'}
          >
            Trend
          </Button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter logs..."
            className={`bg-panel-darker rounded-md py-1 px-2 text-xs w-24 focus:w-32 transition-all duration-300 focus:outline-none border-0 shadow-sm ${processingAnimation ? 'shadow-md' : ''}`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="terminal flex-1 p-3 overflow-y-auto font-mono text-sm">
        <div className="space-y-0.5">
          {topLogs.length === 0 ? (
            <div className="text-zinc-500 text-center py-4">
              {searchTerm ? 'No matching logs found' : 'No logs yet'}
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {topLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex flex-col py-1 px-2 rounded-md hover:bg-zinc-800/50 ${
                    expandedLogId === log.id ? 'bg-zinc-800/50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex items-center space-x-2 min-w-[85px] text-xs text-zinc-500">
                      <span className="opacity-70">{log.timestamp}</span>
                    </div>
                    
                    <div className={`px-1.5 py-0.5 rounded text-xs flex items-center mr-2 ${getLogClass(log.type)}`}>
                      <span className="mr-1">{getLogIcon(log.type)}</span>
                      <span className="uppercase text-[10px] tracking-wider">{log.type}</span>
                    </div>
                    
                    <div className={`flex-1 ${getLogClass(log.type)}`}>
                      <span className="font-normal">{log.message}</span>
                    </div>
                    
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      {log.metadata && (
                        <button 
                          onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                          className="p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
                          title={expandedLogId === log.id ? "Collapse" : "Expand"}
                        >
                          {expandedLogId === log.id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                      )}
                      <button 
                        onClick={() => setFilter(filter === log.type ? null : log.type)}
                        className="p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white ml-1"
                        title={filter === log.type ? "Clear filter" : `Filter by ${log.type}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Expandable metadata */}
                  <AnimatePresence>
                    {expandedLogId === log.id && renderMetadata(log)}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {/* Show more insights toggle */}
          {!filter && filteredLogs.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-center"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAllInsights(!showAllInsights)}
                className="text-xs"
              >
                {showAllInsights ? "Show less insights" : `See ${filteredLogs.length - 3} more insights`}
              </Button>
            </motion.div>
          )}
        </div>
        
        {/* Always rendered for scrolling */}
        <div ref={logsEndRef} />
      </div>
    </Column>
  );
} 
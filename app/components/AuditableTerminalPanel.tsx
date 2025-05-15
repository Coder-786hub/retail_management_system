import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Column, TabGroup, Button, Badge } from './ui';

// Define entry types
interface LogEntry {
  id: string;
  message: string;
  type: 'system' | 'ai' | 'trend' | 'insight' | 'error' | 'portal';
  timestamp: string;
  metadata?: {
    prompt?: string;
    source?: string;
    confidence?: number;
    tracePath?: string[];
    relatedLogs?: string[];
  };
}

interface DatabaseEntry {
  id: string;
  location: string;
  product: string;
  sales: number;
  timestamp: string;
}

interface AuditableTerminalPanelProps {
  logs?: LogEntry[];
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Sample database entries
const databaseEntries: DatabaseEntry[] = [
  {
    id: '1',
    location: 'Denver',
    product: 'Blue Dream',
    sales: 15800,
    timestamp: '10:15:22',
  },
  {
    id: '2',
    location: 'Boulder',
    product: 'Sour Diesel',
    sales: 12400,
    timestamp: '10:18:45',
  },
  {
    id: '3',
    location: 'Colorado Springs',
    product: 'Girl Scout Cookies',
    sales: 9800,
    timestamp: '10:22:13',
  },
  {
    id: '4',
    location: 'Pueblo',
    product: 'OG Kush',
    sales: 8500,
    timestamp: '10:25:30',
  },
  {
    id: '5',
    location: 'Fort Collins',
    product: 'Purple Haze',
    sales: 7200,
    timestamp: '10:28:55',
  },
];

// Example of logs with metadata
const enhancedLogs: LogEntry[] = [
  {
    id: '1',
    message: 'Sales data loaded - 5 locations, awaiting queries',
    type: 'system',
    timestamp: '10:30:00',
    metadata: {
      source: 'Database Connector',
      tracePath: ['startup', 'database_init', 'data_load']
    }
  },
  {
    id: '2',
    message: 'Top location: Denver ($258,000)',
    type: 'insight',
    timestamp: '10:30:05',
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
    metadata: {
      confidence: 0.87,
      source: 'Trend Detection Module',
      tracePath: ['time_series_analyzer', 'growth_detector']
    }
  },
  {
    id: '4',
    message: 'Running margin comparison across locations',
    type: 'ai',
    timestamp: '10:30:15',
    metadata: {
      prompt: 'compare margins last 7d',
      source: 'Command Processor',
      tracePath: ['command_parser', 'intent_classifier', 'margin_analyzer']
    }
  },
  {
    id: '5',
    message: 'Projected Q3 growth for Denver: +22% QoQ',
    type: 'insight',
    timestamp: '10:30:20',
    metadata: {
      confidence: 0.82,
      source: 'Forecasting Module',
      tracePath: ['time_series_analyzer', 'forecasting_model', 'growth_calculator']
    }
  }
];

export default function AuditableTerminalPanel({ 
  logs = enhancedLogs, 
  className = '',
  isCollapsed = false,
  onToggleCollapse
}: AuditableTerminalPanelProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [view, setView] = useState<'audit' | 'memory' | 'database'>('audit');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [processingAnimation, setProcessingAnimation] = useState(false);
  
  // Simulate occasional processing animation
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAnimate = Math.random() > 0.7;
      if (shouldAnimate) {
        setProcessingAnimation(true);
        setTimeout(() => {
          setProcessingAnimation(false);
        }, 2000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Scroll to bottom when logs change
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, view]);
  
  // Filter logs based on search term
  const filteredLogs = logs.filter(log => {
    // First apply type filter if set
    if (filter && log.type !== filter) return false;
    
    // Then apply search term if any
    if (searchTerm.trim() === '') return true;
    return log.message.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Filter database entries based on search term
  const filteredDbEntries = databaseEntries.filter(entry => {
    if (searchTerm.trim() === '') return true;
    return (
      entry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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
      case 'ai':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
        return 'terminal-system';
      case 'ai':
        return 'terminal-ai';
      case 'trend':
        return 'terminal-trend';
      case 'insight':
        return 'terminal-insight';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {log.metadata.prompt && (
            <div className="break-words">
              <span className="text-zinc-500">Prompt:</span>{' '}
              <span className="font-mono text-neon-blue">{log.metadata.prompt}</span>
            </div>
          )}
          {log.metadata.source && (
            <div className="break-words">
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
            <div className="col-span-full">
              <span className="text-zinc-500">Trace:</span>{' '}
              <span className="font-mono text-zinc-400 break-words">
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

  const tabs = [
    { id: 'audit', label: 'Audit' },
    { id: 'memory', label: 'Memory' },
    { id: 'database', label: 'Database' }
  ];
  
  return (
    <Column 
      title="Terminal Feed"
      floating={true}
      isActive={processingAnimation}
      className={`h-full flex flex-col ${className}`}
      header={
        <div className="flex items-center justify-end w-full">
          {onToggleCollapse && (
            <button 
              onClick={onToggleCollapse}
              className="p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
              title="Toggle Terminal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      }
    >
      <div className="flex justify-between mb-4 flex-shrink-0">
        <TabGroup
          tabs={tabs}
          activeTabId={view}
          onChange={(tabId) => setView(tabId as 'audit' | 'memory' | 'database')}
          size="sm"
        />
        
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={view === 'database' ? "Filter entries..." : "Filter logs..."}
            className="bg-panel-darker border border-zinc-800/50 rounded-md py-1 px-2 text-xs w-24 focus:w-32 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-neon-green/30"
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
      
      <div className="terminal flex-1 p-3 pb-5 overflow-y-auto overflow-x-hidden min-h-0 font-mono text-sm">
        {/* Pulse beam animation for processing */}
        {processingAnimation && (
          <motion.div 
            className="absolute top-0 bottom-0 w-1 bg-neon-cyan/20 z-10"
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: '100%', opacity: [0, 0.3, 0.2, 0.5, 0] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
        
        {view !== 'database' ? (
          <div className="flex space-y-1.5 flex-col">
            {filteredLogs.length === 0 ? (
              <div className="text-zinc-500 text-center py-4">
                {searchTerm ? 'No matching logs found' : 'No logs yet'}
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {filteredLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`group flex flex-col py-2 px-3 mb-1.5 rounded-md hover:bg-eclipse/70 ${
                      index === filteredLogs.length - 1 ? 'animate-pulse-slow' : ''
                    } ${expandedLogId === log.id ? 'bg-panel-darker' : ''}`}
                  >
                    <div className="flex items-start w-full text-wrap">
                      <div className="text-[11px] text-zinc-500 mr-2 w-[65px] shrink-0">
                        {log.timestamp}
                      </div>
                      
                      <div className={`px-1 py-0.5 rounded text-[10px] flex-shrink-0 flex items-center mr-2 ${getLogClass(log.type)}`}>
                        <span className="mr-0.5">{getLogIcon(log.type)}</span>
                        <span className="uppercase text-[9px] tracking-wider">{log.type}</span>
                      </div>
                      
                      <div className={`flex-1 min-w-0 text-[13px] text-nowrap overflow-hidden text-ellipsis ${getLogClass(log.type)}`}>
                        {log.message}
                      </div>
                    </div>
                    
                    <div className="flex mt-1 ml-[65px]">
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {log.metadata && (
                          <button 
                            onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                            className="p-1 rounded hover:bg-panel-darker text-zinc-400 hover:text-white"
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
                          className="p-1 rounded hover:bg-panel-darker text-zinc-400 hover:text-white ml-1"
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
          </div>
        ) : (
          // Database view
          <div className="space-y-0.5">
            {filteredDbEntries.length === 0 ? (
              <div className="text-zinc-500 text-center py-4">
                {searchTerm ? 'No matching entries found' : 'No database entries'}
              </div>
            ) : (
              <>
                {/* Table header */}
                <div className="flex items-center border-b border-slate-blue/50 py-2 px-2 mb-2 text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                  <div className="w-[65px] shrink-0">Time</div>
                  <div className="w-[90px] shrink-0">Location</div>
                  <div className="flex-1 min-w-0">Product</div>
                  <div className="w-[70px] text-right shrink-0">Sales</div>
                </div>
                
                <AnimatePresence initial={false}>
                  {filteredDbEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center py-2 px-3 mb-1 rounded hover:bg-eclipse/70 group w-full"
                    >
                      <div className="w-[65px] text-[11px] text-zinc-500 shrink-0">
                        {entry.timestamp}
                      </div>
                      <div className="w-[90px] text-[13px] text-neon-blue truncate shrink-0">
                        {entry.location}
                      </div>
                      <div className="flex-1 text-[13px] text-neon-purple truncate min-w-0">
                        {entry.product}
                      </div>
                      <div className="w-[70px] text-[13px] text-neon-green text-right shrink-0">
                        {formatCurrency(entry.sales)}
                      </div>
                      
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                        <button 
                          className="p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
                          title="View details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            )}
          </div>
        )}
        
        {/* Always rendered for scrolling */}
        <div ref={logsEndRef} />
      </div>
      
      <div className="pt-3 mt-2 border-t border-slate-blue/50 flex items-center justify-between flex-shrink-0">
        {view === 'database' ? (
          <>
            <div className="flex space-x-3">
              <Button variant="secondary" size="sm">
                Export CSV
              </Button>
              <Button variant="ghost" size="sm">
                Refresh
              </Button>
            </div>
            <div className="text-xs text-zinc-500">{filteredDbEntries.length} database entries</div>
          </>
        ) : (
          <div className="flex items-center justify-end w-full">
            <Badge color="muted" size="sm">{filteredLogs.length} entries</Badge>
            {view === 'memory' && (
              <Button variant="secondary" size="sm" glowColor="accent" className="ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Replay</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </Column>
  );
} 
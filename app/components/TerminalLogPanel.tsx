import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: string;
  message: string;
  type: 'system' | 'ai' | 'trend' | 'insight' | 'error' | 'portal';
  timestamp: string;
}

interface DatabaseEntry {
  id: string;
  location: string;
  product: string;
  sales: number;
  timestamp: string;
}

interface TerminalLogPanelProps {
  logs?: LogEntry[];
  className?: string;
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

export default function TerminalLogPanel({ logs = [], className = '' }: TerminalLogPanelProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [view, setView] = useState<'logs' | 'database'>('logs');
  
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
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className={`glass-panel h-full flex flex-col ${className}`}>
      <div className="p-4 border-b border-zinc-800/50 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-white">Terminal Feed</h2>
          
          {/* Toggle switch */}
          <div className="flex p-0.5 bg-zinc-800 rounded-md">
            <button
              onClick={() => setView('logs')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                view === 'logs' 
                  ? 'bg-zinc-700 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Logs
            </button>
            <button
              onClick={() => setView('database')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                view === 'database' 
                  ? 'bg-zinc-700 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Database
            </button>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={view === 'logs' ? "Filter logs..." : "Filter entries..."}
              className="bg-zinc-800 border border-zinc-700 rounded-md py-1 px-2 text-xs w-24 focus:w-32 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-neon-blue"
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
      </div>
      
      <div className="terminal flex-1 p-3 overflow-y-auto font-mono text-sm">
        {view === 'logs' ? (
          <div className="space-y-0.5">
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
                    className={`group flex items-start py-1 px-2 rounded hover:bg-zinc-800/50 ${index === filteredLogs.length - 1 ? 'animate-pulse-slow' : ''}`}
                  >
                    <div className="flex items-center space-x-2 min-w-[85px] text-xs text-zinc-500">
                      <span className="opacity-50">{log.timestamp}</span>
                    </div>
                    
                    <div className={`px-1.5 py-0.5 rounded text-xs flex items-center mr-2 ${getLogClass(log.type)}`}>
                      <span className="mr-1">{getLogIcon(log.type)}</span>
                      <span className="uppercase text-[10px] tracking-wider">{log.type}</span>
                    </div>
                    
                    <div className={`flex-1 ${getLogClass(log.type)}`}>
                      <span className="font-normal">{log.message}</span>
                    </div>
                    
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setFilter(filter === log.type ? null : log.type)}
                        className="p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
                        title={filter === log.type ? "Clear filter" : `Filter by ${log.type}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </button>
                    </div>
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
                <div className="flex items-center border-b border-zinc-800 py-2 px-2 mb-2 text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  <div className="w-[100px]">Timestamp</div>
                  <div className="w-[120px]">Location</div>
                  <div className="w-[140px]">Product</div>
                  <div className="w-[100px] text-right">Sales</div>
                </div>
                
                <AnimatePresence initial={false}>
                  {filteredDbEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center py-1.5 px-2 rounded hover:bg-zinc-800/50 group"
                    >
                      <div className="w-[100px] text-xs text-zinc-500">
                        {entry.timestamp}
                      </div>
                      <div className="w-[120px] text-neon-blue">
                        {entry.location}
                      </div>
                      <div className="w-[140px] text-neon-purple">
                        {entry.product}
                      </div>
                      <div className="w-[100px] text-neon-green text-right">
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
        
        {/* Make sure this is ALWAYS rendered, even if there are no logs */}
        <div ref={logsEndRef} />
      </div>
      
      <div className="px-3 py-2 border-t border-zinc-800/50 flex items-center justify-between">
        {view === 'logs' ? (
          <>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilter(null)} 
                className={`px-2 py-0.5 rounded text-xs ${!filter ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'} transition-colors`}
              >
                All
              </button>
              {['system', 'ai', 'trend', 'insight'].map(type => (
                <button 
                  key={type}
                  onClick={() => setFilter(filter === type ? null : type)}
                  className={`px-2 py-0.5 rounded text-xs ${filter === type ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'} transition-colors`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <div className="text-xs text-zinc-500">{filteredLogs.length} log entries</div>
          </>
        ) : (
          <>
            <div className="flex space-x-2">
              <button className="px-2 py-0.5 rounded text-xs text-neon-blue border border-zinc-800 hover:bg-zinc-800 transition-colors">
                Export CSV
              </button>
              <button className="px-2 py-0.5 rounded text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                Refresh
              </button>
            </div>
            <div className="text-xs text-zinc-500">{filteredDbEntries.length} database entries</div>
          </>
        )}
      </div>
    </div>
  );
} 
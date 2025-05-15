import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuditableTerminalPanel from '../app/components/AuditableTerminalPanel';
import VisualizationPanel from '../app/components/VisualizationPanel';
import CopilotPanel from '../app/components/CopilotPanel';
import { Button } from '../app/components/ui';

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

export default function App() {
  const [portalData, setPortalData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'locations' | 'products' | 'analytics'>('locations');
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([
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
    }
  ]);

  // Handler for receiving portal content (visualization data)
  const handlePortalContent = (content: string) => {
    try {
      const jsonData = JSON.parse(content);
      setPortalData(jsonData);
      
      // Log this event
      addLogEntry({
        message: `Visualization data updated: ${jsonData.title || 'Chart'}`,
        type: 'portal',
        metadata: {
          source: 'Visualization Engine',
          tracePath: ['command_parser', 'data_processor', 'viz_generator']
        }
      });
    } catch (error) {
      console.error('Error parsing portal content:', error);
      addLogEntry({
        message: `Error: Could not parse visualization data`,
        type: 'error',
        metadata: {
          source: 'Error Handler',
          tracePath: ['json_parser', 'error_handler']
        }
      });
    }
  };
  
  // Handler for receiving log messages
  const handleLogMessage = (message: string) => {
    let type: 'system' | 'ai' | 'trend' | 'insight' | 'error' | 'portal' = 'system';
    
    // Try to determine the type based on the message content
    if (message.toLowerCase().includes('error')) {
      type = 'error';
    } else if (message.toLowerCase().includes('ai')) {
      type = 'ai';
    } else if (message.toLowerCase().includes('trend')) {
      type = 'trend';
    } else if (message.toLowerCase().includes('top') || message.toLowerCase().includes('highest') || message.toLowerCase().includes('best')) {
      type = 'insight';
    } else if (message.toLowerCase().includes('portal') || message.toLowerCase().includes('viz') || message.toLowerCase().includes('chart')) {
      type = 'portal';
    }
    
    // Generate metadata based on message type
    const metadata: any = {
      source: type === 'ai' ? 'AI Engine' : 
             type === 'trend' ? 'Trend Analyzer' : 
             type === 'insight' ? 'Insight Generator' : 
             type === 'portal' ? 'Visualization Engine' : 
             type === 'error' ? 'Error Handler' : 'System',
      tracePath: ['command_processor', type === 'insight' ? 'insight_generator' : 
                                       type === 'trend' ? 'trend_analyzer' : 
                                       type === 'portal' ? 'viz_generator' : 'message_handler'],
    };
    
    // Add confidence for insights and trends
    if (type === 'insight' || type === 'trend') {
      metadata.confidence = 0.75 + Math.random() * 0.2; // Random confidence between 0.75 and 0.95
    }
    
    // Add prompt for AI messages
    if (message.toLowerCase().includes('user:')) {
      const userMessage = message.substring(message.indexOf('User:') + 5).trim();
      metadata.prompt = userMessage;
    }
    
    addLogEntry({
      message,
      type,
      metadata
    });
  };
  
  // Add a log entry to the list
  const addLogEntry = ({message, type, metadata}: {message: string; type: 'system' | 'ai' | 'trend' | 'insight' | 'error' | 'portal'; metadata?: any}) => {
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      metadata
    };
    
    setLogEntries(prev => [...prev, newEntry]);
  };

  return (
    <div className="h-screen flex flex-col bg-obsidian overflow-hidden">
      {/* Header Bar - Made more minimal */}
      <motion.header 
        className="border-b border-slate-blue/30 backdrop-blur-sm bg-gunmetal/30 px-4 py-3 flex items-center justify-between panel-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 text-cyber-teal">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 10C7.67157 10 7 9.32843 7 8.5C7 7.67157 7.67157 7 8.5 7C9.32843 7 10 7.67157 10 8.5C10 9.32843 9.32843 10 8.5 10Z" fill="currentColor"/>
              <path d="M15.5 17C14.6716 17 14 16.3284 14 15.5C14 14.6716 14.6716 14 15.5 14C16.3284 14 17 14.6716 17 15.5C17 16.3284 16.3284 17 15.5 17Z" fill="currentColor"/>
              <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="currentColor"/>
              <path d="M8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7ZM15.5 14C14.6716 14 14 14.6716 14 15.5C14 16.3284 14.6716 17 15.5 17C16.3284 17 17 16.3284 17 15.5C17 14.6716 16.3284 14 15.5 14ZM7.89644 10.4018L14.8964 14.4018L14.1036 15.5982L7.10356 11.5982L7.89644 10.4018Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-lg font-heading font-medium bg-clip-text text-transparent bg-gradient-to-r from-ghost-white to-soft-gray">Cannabis Analytics</h1>
        </div>
        
        <div className="flex space-x-2">
          {/* Tab Bar - More subtle/ambient */}
          <div className="flex space-x-1 px-2 py-1 rounded-lg bg-panel-darker">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('locations')}
              glowColor={activeTab === 'locations' ? "primary" : "none"}
            >
              Locations
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('products')}
              glowColor={activeTab === 'products' ? "primary" : "none"}
            >
              Products
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('analytics')}
              glowColor={activeTab === 'analytics' ? "primary" : "none"}
            >
              Analytics
            </Button>
          </div>
        </div>
      </motion.header>
      
      {/* Main Content - Three column layout with fixed height */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 p-3 overflow-hidden h-[calc(100vh-56px)] bg-panel-gradient">
        {!terminalCollapsed && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-4 h-full overflow-x-hidden"
          >
            <AuditableTerminalPanel 
              logs={logEntries} 
              className="h-full" 
              onToggleCollapse={() => setTerminalCollapsed(!terminalCollapsed)}
              isCollapsed={terminalCollapsed}
            />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={terminalCollapsed ? "md:col-span-6 h-full overflow-x-hidden" : "md:col-span-4 h-full overflow-x-hidden"}
        >
          <VisualizationPanel data={portalData} className="h-full" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={terminalCollapsed ? "md:col-span-6 h-full overflow-x-hidden" : "md:col-span-4 h-full overflow-x-hidden"}
        >
          <CopilotPanel onSendMessage={handleLogMessage} className="h-full" />
        </motion.div>
        
        {terminalCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 left-4 z-10"
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setTerminalCollapsed(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Show Terminal
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
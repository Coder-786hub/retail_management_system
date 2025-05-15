import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'user' | 'system' | 'ai';
}

interface LogPanelProps {
  logs: LogEntry[];
}

export default function LogPanel({ logs = [] }: LogPanelProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Use actual logs or empty array
  const displayLogs = logs.length ? logs : [];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg h-full flex flex-col">
      <div className="text-lg font-medium text-white px-4 py-3 border-b border-gray-700">Log</div>
      <div className="p-4 overflow-auto flex-1">
        {displayLogs.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            No logs yet. Start a conversation to see activity.
          </div>
        ) : (
          <div className="space-y-2">
            {displayLogs.map((log) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm"
              >
                <span className="text-xs font-mono text-gray-400 mr-2">{log.timestamp}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs mr-2 ${
                  log.type === 'user' ? 'bg-blue-500/30 text-blue-300' : 
                  log.type === 'system' ? 'bg-gray-500/30 text-gray-300' : 
                  'bg-purple-500/30 text-purple-300'
                }`}>
                  {log.type === 'user' ? 'USER' : 
                   log.type === 'system' ? 'SYSTEM' : 
                   'AI'}
                </span>
                <span className="text-white">{log.message}</span>
              </motion.div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
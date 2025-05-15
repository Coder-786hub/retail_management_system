import { motion } from 'framer-motion';

interface PortalPanelProps {
  content?: React.ReactNode;
}

export default function PortalPanel({ content }: PortalPanelProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg h-full flex flex-col">
      <div className="text-lg font-medium text-white px-4 py-3 border-b border-gray-700">Portal</div>
      <motion.div 
        className="p-4 flex-1 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {content ? (
          content
        ) : (
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-indigo-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Visualization Portal</h3>
            <p className="text-gray-400 max-w-sm">
              AI-generated visualizations, charts, and data will appear here based on your conversation.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
} 
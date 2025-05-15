import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Column, Button, Badge } from './ui';

// Import recharts with require to avoid TypeScript errors
let ResponsiveContainer: any, BarChart: any, Bar: any, XAxis: any, YAxis: any, Tooltip: any, PieChart: any, Pie: any, Cell: any;
try {
  const recharts = require('recharts');
  ResponsiveContainer = recharts.ResponsiveContainer;
  BarChart = recharts.BarChart;
  Bar = recharts.Bar;
  XAxis = recharts.XAxis;
  YAxis = recharts.YAxis;
  Tooltip = recharts.Tooltip;
  PieChart = recharts.PieChart;
  Pie = recharts.Pie;
  Cell = recharts.Cell;
} catch (e) {
  // Recharts might not be available, especially during SSR
  console.warn('Recharts could not be loaded', e);
}

interface VisualizationPanelProps {
  data?: any;
  className?: string;
}

// Sample insight cards for demo
const defaultCards = [
  {
    id: '1',
    title: 'Denver Sales Performance',
    type: 'chart',
    summary: 'Denver is the top performing location with $258,000 in sales.',
    isPinned: true
  },
  {
    id: '2',
    title: 'Quarterly Growth Analysis',
    type: 'insight',
    summary: 'Q3 showing +22% growth in Colorado Springs compared to previous quarter.',
    isPinned: false
  },
  {
    id: '3',
    title: 'Inventory Risk Assessment',
    type: 'risk',
    summary: 'Boulder location has 5 products below minimum stock level.',
    isPinned: false
  }
];

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ data, className = '' }) => {
  const [cards, setCards] = useState(defaultCards);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Toggle expand/collapse of a card
  const toggleCardExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };
  
  // Toggle pin status of a card
  const togglePinCard = (id: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, isPinned: !card.isPinned } : card
    ));
  };
  
  // Remove a card
  const removeCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };
  
  // Get card styles based on type
  const getCardClassName = (type: string) => {
    switch(type) {
      case 'chart':
        return 'card-chart';
      case 'risk':
        return 'card-risk';
      case 'insight':
      default:
        return 'card-insight';
    }
  };
  
  // Get badge styles based on type
  const getBadgeProps = (type: string) => {
    switch(type) {
      case 'chart':
        return { color: 'accent' as const, label: 'Chart' };
      case 'risk':
        return { color: 'warn' as const, label: 'Risk' };
      case 'insight':
      default:
        return { color: 'primary' as const, label: 'Insight' };
    }
  };

  return (
    <Column 
      title="Interactive Canvas" 
      floating={true}
      isActive={isProcessing}
      className={className}
      fixedHeight={true}
      contentClassName="overflow-x-hidden"
      header={
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-xs">
            Clear All
          </Button>
        </div>
      }
    >
      {cards.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="text-text-muted mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
            <p className="text-lg font-medium mb-2">Interactive Canvas</p>
            <p className="text-sm">Use the command input to generate visualizations and insights</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="text-xs"
              onClick={() => setIsProcessing(true)}
            >
              Show top locations
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="text-xs"
              onClick={() => setIsProcessing(true)}
            >
              Compare margins
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 pb-2">
          <AnimatePresence initial={false}>
            {cards.map((card) => {
              const isExpanded = expandedCardId === card.id;
              const badgeProps = getBadgeProps(card.type);
              
              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${getCardClassName(card.type)} ${isExpanded ? 'z-10 relative' : ''}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center">
                      <Badge color={badgeProps.color} variant="filled" size="sm" className="mr-1.5 py-0.5 px-1.5">
                        <span className="text-[9px]">{badgeProps.label}</span>
                      </Badge>
                      <h4 className="font-medium text-[13px] truncate max-w-[190px]">
                        {card.title}
                      </h4>
                    </div>
                    
                    <div className="flex space-x-0.5 ml-1">
                      <button 
                        onClick={() => togglePinCard(card.id)}
                        className={`p-1 rounded-full hover:bg-zinc-700/50 transition-colors ${card.isPinned ? 'text-neon-green' : 'text-zinc-500 hover:text-white'}`}
                        title={card.isPinned ? "Unpin" : "Pin"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => toggleCardExpand(card.id)}
                        className="p-1 rounded-full hover:bg-zinc-700/50 text-zinc-500 hover:text-white transition-colors"
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {isExpanded ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          )}
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => removeCard(card.id)}
                        className="p-1 rounded-full hover:bg-zinc-700/50 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className={`text-[12px] ${isExpanded ? '' : 'line-clamp-1 text-ellipsis overflow-hidden whitespace-nowrap'}`}>{card.summary}</p>
                  
                  <AnimatePresence>
                    {isExpanded && card.type === 'chart' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3"
                      >
                        <div className="h-40 bg-panel-darker rounded-lg flex items-center justify-center border border-zinc-800/50">
                          <div className="text-text-muted text-xs">Chart Visualization</div>
                        </div>
                        
                        <div className="flex justify-between mt-3">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Export
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs text-neon-blue">
                            Analyze
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    
                    {isExpanded && card.type === 'insight' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 space-y-2"
                      >
                        <div className="p-2 rounded-lg bg-panel-darker border border-zinc-800/50">
                          <div className="text-xs text-zinc-500 mb-1">Impact</div>
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-green rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        
                        <div className="p-2 rounded-lg bg-panel-darker border border-zinc-800/50">
                          <div className="text-xs text-zinc-500 mb-1">Confidence</div>
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-blue rounded-full" style={{ width: '88%' }}></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="text-xs text-neon-green">
                            Generate Chart
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    
                    {isExpanded && card.type === 'risk' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3"
                      >
                        <div className="p-3 rounded-lg bg-panel-darker border border-zinc-800/50 text-xs space-y-2">
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Severity:</span>
                            <span className="text-neon-warn">Medium</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Required action:</span>
                            <span className="text-text-primary">Restock</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Timeline:</span>
                            <span className="text-text-primary">Within 7 days</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-3">
                          <Button variant="ghost" size="sm" className="text-xs text-neon-warn">
                            Create Alert
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </Column>
  );
};

export default VisualizationPanel; 
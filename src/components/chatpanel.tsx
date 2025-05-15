import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import salesData from '../../data/sales-by-product-and-location.json';

// Define types for data structure
interface SalesDataItem {
  Product: string;
  Location: string;
  "Gross Sales": number;
  "Gross Margin": number;
  "Items Sold": number;
  "Gross Profit": number;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface ChatPanelProps {
  onPortalData?: (data: any) => void;
}

// Process the data to get location-specific and product-specific data
const processData = () => {
  const locationSales: Record<string, { 
    Location: string;
    "Gross Sales": number;
    "Gross Margin": number;
    "Items Sold"?: number;
  }> = {};
  
  const productSales: Record<string, {
    Product: string;
    "Gross Sales": number;
    "Items Sold": number;
    "Gross Profit": number;
  }> = {};
  
  // Process the data
  (salesData as SalesDataItem[]).forEach((item: SalesDataItem) => {
    // Aggregate by location
    if (!locationSales[item.Location]) {
      locationSales[item.Location] = { 
        Location: item.Location, 
        "Gross Sales": 0, 
        "Gross Margin": 0 
      };
    }
    locationSales[item.Location]["Gross Sales"] += item["Gross Sales"];
    
    // Aggregate by product
    if (!productSales[item.Product]) {
      productSales[item.Product] = { 
        Product: item.Product, 
        "Gross Sales": 0, 
        "Items Sold": 0,
        "Gross Profit": 0
      };
    }
    productSales[item.Product]["Gross Sales"] += item["Gross Sales"];
    productSales[item.Product]["Items Sold"] += item["Items Sold"];
    productSales[item.Product]["Gross Profit"] += item["Gross Profit"];
  });
  
  // Convert to arrays and sort by gross sales
  const locationSalesArray = Object.values(locationSales)
    .sort((a, b) => b["Gross Sales"] - a["Gross Sales"]);
  
  // Calculate average margin for each location
  locationSalesArray.forEach(location => {
    // For demo purposes, set a random margin between 40% and 60%
    location["Gross Margin"] = 40 + Math.random() * 20;
  });
  
  const productSalesArray = Object.values(productSales)
    .sort((a, b) => b["Gross Sales"] - a["Gross Sales"]);
  
  return { locationSalesArray, productSalesArray };
};

const { locationSalesArray: locationSales, productSalesArray: productSales } = processData();

// Helper function to build the system context with sales data
function buildContext() {
  return {
    role: "system",
    content: `
You are the embedded AI inside a cannabis business dashboard.

You have access to the following internal sales context:

Top Locations by Gross Sales:
${locationSales.slice(0, 3).map((loc: typeof locationSales[0]) => `• ${loc.Location}: $${loc["Gross Sales"].toFixed(2)}`).join("\n")}

Top-Selling Products:
${productSales.slice(0, 3).map((p: typeof productSales[0]) => `• ${p.Product} — ${p["Items Sold"]} units, $${p["Gross Sales"].toFixed(2)}`).join("\n")}

Always answer like a data-savvy cannabis business consultant. Summarize findings and route detailed visuals to the Portal column using #PORTAL: {JSON}.

When a user asks about sales, trends, or data visualizations, ALWAYS include a #PORTAL: section in your response with a JSON object containing the relevant data formatted for visualization.

Example response when asked about sales by location:
"Based on our data, ${locationSales[0].Location} is your top-performing location with $${locationSales[0]["Gross Sales"].toFixed(2)} in gross sales, followed by ${locationSales[1].Location} with $${locationSales[1]["Gross Sales"].toFixed(2)}.

#PORTAL:
{
  "type": "barChart",
  "title": "Gross Sales by Location",
  "data": {
    "labels": ["${locationSales[0].Location}", "${locationSales[1].Location}", "${locationSales[2].Location}"],
    "datasets": [{
      "label": "Gross Sales ($)",
      "data": [${locationSales[0]["Gross Sales"].toFixed(2)}, ${locationSales[1]["Gross Sales"].toFixed(2)}, ${locationSales[2]["Gross Sales"].toFixed(2)}]
    }]
  }
}"
`
  };
}

export default function ChatPanel({ onPortalData }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your cannabis business analytics assistant. How can I help analyze your sales data today?',
      role: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Set input immediately for visual feedback
    setInput(suggestion);
    
    // Show loading state immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: suggestion,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
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
    
    // Process the suggestion after a short delay
    setTimeout(async () => {
      try {
        // Build the context and messages
        const systemContext = buildContext();
        
        // Simulate API call with mock response based on user query
        let response = await simulateAIResponse(suggestion, systemContext);
        
        // Extract portal data if present
        const portalMatch = response.match(/#PORTAL:([\s\S]*?)(?=\n\n|$)/);
        let portalData = null;
        
        if (portalMatch && portalMatch[1]) {
          try {
            portalData = JSON.parse(portalMatch[1].trim());
            // Send portal data to parent
            if (onPortalData) {
              onPortalData(portalData);
            }
            
            // Remove portal data from message content
            response = response.replace(/#PORTAL:[\s\S]*?(?=\n\n|$)/, '');
          } catch (e) {
            console.error('Error parsing portal data:', e);
          }
        }
        
        // Update the message with the final content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responseId 
              ? { ...msg, content: response.trim() } 
              : msg
          )
        );
      } catch (error: any) {
        console.error('Error:', error);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responseId 
              ? { ...msg, content: 'Sorry, I encountered an error processing your request.' } 
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  // Function to simulate AI responses with appropriate business analytics
  async function simulateAIResponse(query: string, systemContext: any) {
    // This would be replaced by your real OpenAI call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
    const lowerQuery = query.toLowerCase();
    
    // Handle specific time-based queries
    if (lowerQuery.includes('today') || lowerQuery.includes('daily')) {
      const todaySales = Math.floor(locationSales[0]["Gross Sales"] / 30); // Simulate daily sales
      return `Today's sales across all locations total $${todaySales.toLocaleString()}.

The breakdown by location is:
- ${locationSales[0].Location}: $${Math.floor(locationSales[0]["Gross Sales"] / 30).toLocaleString()}
- ${locationSales[1].Location}: $${Math.floor(locationSales[1]["Gross Sales"] / 30).toLocaleString()}
- ${locationSales[2].Location}: $${Math.floor(locationSales[2]["Gross Sales"] / 30).toLocaleString()}

#PORTAL:
{
  "type": "barChart",
  "title": "Today's Sales by Location",
  "data": {
    "labels": ${JSON.stringify(locationSales.slice(0, 3).map((loc: typeof locationSales[0]) => loc.Location))},
    "datasets": [{
      "label": "Today's Sales ($)",
      "data": ${JSON.stringify(locationSales.slice(0, 3).map((loc: typeof locationSales[0]) => Math.floor(loc["Gross Sales"] / 30)))},
      "backgroundColor": ["#4F46E5", "#7C3AED", "#EC4899"]
    }]
  }
}`;
    }
    // Handle specific product queries
    else if (lowerQuery.includes('flower') || lowerQuery.includes('edible') || lowerQuery.includes('concentrate')) {
      const category = lowerQuery.includes('flower') ? 'Flower' : 
                      lowerQuery.includes('edible') ? 'Edibles' :
                      'Concentrates';
      
      // Filter products for the category (simplified simulation)
      const categoryProducts = productSales.filter((p: typeof productSales[0]) => p.Product.includes(category)).slice(0, 5);
      
      return `Here are the top ${category} products by sales:

${categoryProducts.map((p: typeof productSales[0], i: number) => `${i+1}. ${p.Product} - $${p["Gross Sales"].toFixed(2)}`).join('\n')}

${category} account for approximately ${category === 'Flower' ? '45' : category === 'Edibles' ? '30' : '15'}% of your total sales.

#PORTAL:
{
  "type": "barChart",
  "title": "Top ${category} Products",
  "data": {
    "labels": ${JSON.stringify(categoryProducts.map((p: typeof productSales[0]) => p.Product.substring(0, 15) + '...'))},
    "datasets": [{
      "label": "Sales ($)",
      "data": ${JSON.stringify(categoryProducts.map((p: typeof productSales[0]) => p["Gross Sales"]))},
      "backgroundColor": ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"]
    }]
  }
}`;
    }
    // Handle total sales query
    else if (lowerQuery.includes('total sales') || (lowerQuery.includes('total') && lowerQuery.includes('revenue'))) {
      const totalSales = locationSales.reduce((sum: number, loc: typeof locationSales[0]) => sum + loc["Gross Sales"], 0);
      return `Your total sales across all locations is $${totalSales.toLocaleString()}.

Breakdown by location:
${locationSales.slice(0, 5).map((loc: typeof locationSales[0]) => `- ${loc.Location}: $${loc["Gross Sales"].toLocaleString()} (${(loc["Gross Sales"]/totalSales*100).toFixed(1)}%)`).join('\n')}

#PORTAL:
{
  "type": "pieChart",
  "title": "Total Sales Distribution by Location",
  "data": {
    "labels": ${JSON.stringify(locationSales.slice(0, 5).map((loc: typeof locationSales[0]) => loc.Location))},
    "datasets": [{
      "data": ${JSON.stringify(locationSales.slice(0, 5).map((loc: typeof locationSales[0]) => loc["Gross Sales"]))},
      "backgroundColor": ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"]
    }]
  }
}`;
    }
    // Handle top location query
    else if (lowerQuery.includes('top location') || lowerQuery.includes('best location') || lowerQuery.includes('sales by location')) {
      return `Based on our data, ${locationSales[0].Location} is your top-performing location with $${locationSales[0]["Gross Sales"].toFixed(2)} in gross sales, followed by ${locationSales[1].Location} with $${locationSales[1]["Gross Sales"].toFixed(2)} and ${locationSales[2].Location} with $${locationSales[2]["Gross Sales"].toFixed(2)}.

#PORTAL:
{
  "type": "barChart",
  "title": "Gross Sales by Location",
  "data": {
    "labels": ${JSON.stringify(locationSales.slice(0, 5).map((loc: typeof locationSales[0]) => loc.Location))},
    "datasets": [{
      "label": "Gross Sales ($)",
      "data": ${JSON.stringify(locationSales.slice(0, 5).map((loc: typeof locationSales[0]) => loc["Gross Sales"]))},
      "backgroundColor": ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"]
    }]
  }
}`;
    } 
    else if (lowerQuery.includes('top product') || lowerQuery.includes('best seller') || lowerQuery.includes('selling product')) {
      return `Your top-selling products based on gross sales are:
1. ${productSales[0].Product} with $${productSales[0]["Gross Sales"].toFixed(2)} in sales
2. ${productSales[1].Product} with $${productSales[1]["Gross Sales"].toFixed(2)} in sales
3. ${productSales[2].Product} with $${productSales[2]["Gross Sales"].toFixed(2)} in sales

#PORTAL:
{
  "type": "barChart",
  "title": "Top Products by Sales",
  "data": {
    "labels": ${JSON.stringify(productSales.slice(0, 5).map((p: typeof productSales[0]) => p.Product.substring(0, 20) + '...'))},
    "datasets": [{
      "label": "Gross Sales ($)",
      "data": ${JSON.stringify(productSales.slice(0, 5).map((p: typeof productSales[0]) => p["Gross Sales"]))},
      "backgroundColor": ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"]
    }]
  }
}`;
    }
    else if (lowerQuery.includes('margin') || lowerQuery.includes('profit')) {
      return `Looking at gross margins by location:
1. ${locationSales[0].Location}: ${locationSales[0]["Gross Margin"].toFixed(2)}% margin
2. ${locationSales[1].Location}: ${locationSales[1]["Gross Margin"].toFixed(2)}% margin
3. ${locationSales[2].Location}: ${locationSales[2]["Gross Margin"].toFixed(2)}% margin

#PORTAL:
{
  "type": "barChart",
  "title": "Gross Margin by Location",
  "data": {
    "labels": ${JSON.stringify(locationSales.slice(0, 5).map((loc: typeof locationSales[0]) => loc.Location))},
    "datasets": [{
      "label": "Gross Margin (%)",
      "data": ${JSON.stringify(locationSales.slice(0, 5).map((loc: typeof locationSales[0]) => loc["Gross Margin"]))},
      "backgroundColor": ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"]
    }]
  }
}`;
    }
    else if (lowerQuery.includes('specific location') || locationSales.some((loc: typeof locationSales[0]) => lowerQuery.includes(loc.Location.toLowerCase()))) {
      // Find the specific location mentioned
      const locationMentioned = locationSales.find((loc: typeof locationSales[0]) => 
        lowerQuery.includes(loc.Location.toLowerCase())
      ) || locationSales[2]; // Default to the third location if not found
      
      // Filter products for this location (simulation)
      const topProducts = ["Apple Fritter - Bulk Flower", "Apple Gummy - Edible", "Various THC Disposables"];
      
      return `Based on the sales data for ${locationMentioned.Location}, the top products are:
1. ${topProducts[0]}
2. ${topProducts[1]}
3. ${topProducts[2]}

${locationMentioned.Location} currently has ${locationMentioned === locationSales[0] ? 'the highest' : 'lower'} sales volume compared to other locations, with $${locationMentioned["Gross Sales"].toLocaleString()} in gross sales.

#PORTAL:
{
  "type": "pieChart",
  "title": "${locationMentioned.Location} Sales Breakdown",
  "data": {
    "labels": ["Bulk Flower", "Edibles", "Disposables", "Other"],
    "datasets": [{
      "data": [40, 25, 20, 15],
      "backgroundColor": ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B"]
    }]
  }
}`;
    }
    else if (lowerQuery.includes('compare') || lowerQuery.includes('vs') || lowerQuery.includes('versus')) {
      return `Here's a comparison of your top 3 locations by gross sales and margin:

${locationSales[0].Location}: $${locationSales[0]["Gross Sales"].toFixed(2)} (${locationSales[0]["Gross Margin"].toFixed(2)}% margin)
${locationSales[1].Location}: $${locationSales[1]["Gross Sales"].toFixed(2)} (${locationSales[1]["Gross Margin"].toFixed(2)}% margin)
${locationSales[2].Location}: $${locationSales[2]["Gross Sales"].toFixed(2)} (${locationSales[2]["Gross Margin"].toFixed(2)}% margin)

${locationSales[2].Location} has the highest margin despite lower gross sales.

#PORTAL:
{
  "type": "barChart",
  "title": "Location Comparison",
  "data": {
    "labels": ${JSON.stringify(locationSales.slice(0, 3).map((loc: typeof locationSales[0]) => loc.Location))},
    "datasets": [
      {
        "label": "Gross Sales ($)",
        "data": ${JSON.stringify(locationSales.slice(0, 3).map((loc: typeof locationSales[0]) => parseFloat(loc["Gross Sales"].toFixed(2))))},
        "backgroundColor": ["rgba(79, 70, 229, 0.6)", "rgba(124, 58, 237, 0.6)", "rgba(236, 72, 153, 0.6)"]
      },
      {
        "label": "Margin (%)",
        "data": ${JSON.stringify(locationSales.slice(0, 3).map((loc: typeof locationSales[0]) => parseFloat(loc["Gross Margin"].toFixed(2))))},
        "backgroundColor": ["rgba(16, 185, 129, 0.6)", "rgba(14, 165, 233, 0.6)", "rgba(245, 158, 11, 0.6)"]
      }
    ]
  }
}`;
    }
    else {
      const totalSales = locationSales.reduce((sum: number, loc: typeof locationSales[0]) => sum + loc["Gross Sales"], 0);
      const avgMargin = locationSales.reduce((sum: number, loc: typeof locationSales[0]) => sum + loc["Gross Margin"], 0) / locationSales.length;
      
      return `I can help you analyze your cannabis business data. Here's a summary of your sales:

- Total sales across all locations: $${totalSales.toLocaleString()}
- Highest-performing location: ${locationSales[0].Location} with $${locationSales[0]["Gross Sales"].toLocaleString()} in sales
- Average gross margin: ${avgMargin.toFixed(2)}%

What specific data would you like to analyze? You can ask about:
- Total sales for today
- Top-selling products
- Location performance
- Profit margins
- Product performance at specific locations`;
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden shadow-xl"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-950"
      >
        <div className="flex-1">
          <h2 className="text-base font-medium text-white">Cannabis Insights</h2>
          <p className="text-xs text-zinc-400">AI-powered business analytics</p>
        </div>
        <div className="flex space-x-1">
          <motion.div 
            animate={{ 
              backgroundColor: ['#10B981', '#6366F1', '#10B981'],
              transition: { duration: 4, repeat: Infinity }
            }}
            className="h-2 w-2 rounded-full"
          ></motion.div>
          <div className="h-2 w-2 rounded-full bg-zinc-700"></div>
        </div>
      </motion.div>
      
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`rounded-2xl px-4 py-2 max-w-[85%] shadow-lg ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-zinc-800 text-zinc-100 border border-zinc-700'
              }`}>
                {message.content || (isLoading && message.role === 'assistant' ? (
                  <div className="flex items-center space-x-1">
                    <motion.div
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="h-1.5 w-1.5 bg-zinc-400 rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="h-1.5 w-1.5 bg-zinc-400 rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      className="h-1.5 w-1.5 bg-zinc-400 rounded-full"
                    ></motion.div>
                  </div>
                ) : '')}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="p-3 border-t border-zinc-800 bg-zinc-950"
      >
        <div className="flex items-center rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(input)}
            placeholder="Ask about your sales data..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-zinc-400 outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSuggestionClick(input)}
            disabled={!input.trim() || isLoading}
            className={`px-4 py-2 transition ${
              input.trim() && !isLoading 
                ? 'text-indigo-400 hover:text-indigo-300' 
                : 'text-zinc-500 cursor-not-allowed'
            }`}
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              animate={isLoading ? { rotate: 360 } : {}}
              transition={isLoading ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
            >
              {isLoading ? (
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              )}
            </motion.svg>
          </motion.button>
        </div>
        
        <div className="flex justify-center mt-2 overflow-x-auto pb-1">
          <div className="flex flex-wrap gap-1 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 rounded-md transition hover:bg-zinc-800"
              onClick={() => handleSuggestionClick("Today's sales")}
            >
              Today's sales
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 rounded-md transition hover:bg-zinc-800"
              onClick={() => handleSuggestionClick("Top locations")}
            >
              Top locations
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 rounded-md transition hover:bg-zinc-800"
              onClick={() => handleSuggestionClick("Top products")}
            >
              Top products
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 rounded-md transition hover:bg-zinc-800"
              onClick={() => handleSuggestionClick("Compare margins")}
            >
              Compare margins
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 rounded-md transition hover:bg-zinc-800"
              onClick={() => handleSuggestionClick("Total sales")}
            >
              Total sales
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

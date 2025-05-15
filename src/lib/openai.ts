import axios from "axios";
// Import the actual data file we have available and then create two smaller mock data sets from it
import rawSalesData from '../../data/sales-by-product-and-location.json';

// Create mock location sales data
const locationSales = [
  { Location: "Denver", "Gross Sales": 258000, "Gross Margin": 48.5, "Items Sold": 5200 },
  { Location: "Boulder", "Gross Sales": 185000, "Gross Margin": 53.0, "Items Sold": 3800 },
  { Location: "Fort Collins", "Gross Sales": 142000, "Gross Margin": 47.9, "Items Sold": 2900 },
  { Location: "Colorado Springs", "Gross Sales": 198000, "Gross Margin": 44.4, "Items Sold": 4100 },
  { Location: "Pueblo", "Gross Sales": 95000, "Gross Margin": 54.7, "Items Sold": 1950 }
];

// Create mock product sales data
const productSales = [
  { Product: "Blue Dream", "Gross Sales": 78000, "Gross Profit": 42000, "Items Sold": 1850 },
  { Product: "Sour Diesel", "Gross Sales": 65000, "Gross Profit": 35000, "Items Sold": 1540 },
  { Product: "Girl Scout Cookies", "Gross Sales": 55000, "Gross Profit": 29000, "Items Sold": 1280 },
  { Product: "OG Kush", "Gross Sales": 48000, "Gross Profit": 26000, "Items Sold": 1150 },
  { Product: "Purple Haze", "Gross Sales": 42000, "Gross Profit": 22000, "Items Sold": 980 }
];

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Helper function to build context
export function buildContext(locationSales: any[], productSales: any[]): ChatMessage {
  return {
    role: "system" as const,
    content: `
You are an embedded AI assistant inside a cannabis operations platform.

Location Insights:
${locationSales.slice(0, 5).map(l => `- ${l.Location}: Gross $${l["Gross Sales"].toFixed(0)}, Margin ${l["Gross Margin"].toFixed(1)}%`).join("\n")}

Top Products:
${productSales.slice(0, 5).map(p => `- ${p.Product}: ${p["Items Sold"]} sold, $${p["Gross Profit"]} GP`).join("\n")}

Focus on profitability, performance insights, and markdown analysis.

When asked to provide visualizations, ALWAYS include a #PORTAL: marker followed by a valid JSON object that can be used for visualization.
    `
  };
}

export async function sendToOpenAI(messages: ChatMessage[]) {
  try {
    // First, check if we need to inject sales data context
    let enhancedMessages = [...messages];
    const hasSystemMessage = messages.some(msg => msg.role === 'system');
    
    // If no system message exists, add our context
    if (!hasSystemMessage) {
      enhancedMessages = [
        buildContext(locationSales, productSales),
        ...enhancedMessages
      ];
    }
    
    // Get the OpenAI API key
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please add NEXT_PUBLIC_OPENAI_KEY to your .env.local file.');
    }

    // Make the API call to OpenAI
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // You can also use "gpt-4o" if you have access
        messages: enhancedMessages,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error("OpenAI API Error:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    
    throw new Error(error?.response?.data?.error?.message || error.message);
  }
}

// For testing purposes without making actual API calls
export async function simulateOpenAIResponse(messages: ChatMessage[]) {
  // Extract the user message
  const userMessage = messages.find(m => m.role === 'user')?.content || '';
  const lowerQuery = userMessage.toLowerCase();
  
  // Sleep to simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate appropriate responses based on keywords
  if (lowerQuery.includes('location') || lowerQuery.includes('store')) {
    return `Based on our data, Denver is your top-performing location with $258,000 in gross sales, followed by Colorado Springs with $198,000 and Boulder with $185,000.

#PORTAL:
{
  "chart_type": "bar",
  "title": "Gross Sales by Location",
  "labels": ${JSON.stringify(locationSales.slice(0, 5).map(loc => loc.Location))},
  "data": ${JSON.stringify(locationSales.slice(0, 5).map(loc => loc["Gross Sales"]))},
  "colors": ["#5773FF", "#A855F7", "#22C55E", "#0EA5E9", "#6366F1"]
}`;
  } 
  else if (lowerQuery.includes('product') || lowerQuery.includes('sell') || lowerQuery.includes('selling')) {
    return `Your top-selling products based on gross sales are:
1. ${productSales[0].Product} with $${productSales[0]["Gross Sales"].toFixed(2)} in sales
2. ${productSales[1].Product} with $${productSales[1]["Gross Sales"].toFixed(2)} in sales
3. ${productSales[2].Product} with $${productSales[2]["Gross Sales"].toFixed(2)} in sales

#PORTAL:
{
  "chart_type": "bar",
  "title": "Top Products by Sales",
  "labels": ${JSON.stringify(productSales.slice(0, 5).map(p => p.Product))},
  "data": ${JSON.stringify(productSales.slice(0, 5).map(p => p["Gross Sales"]))},
  "colors": ["#22C55E", "#5773FF", "#A855F7", "#0EA5E9", "#6366F1"]
}`;
  }
  else if (lowerQuery.includes('margin') || lowerQuery.includes('profit')) {
    return `Here's an analysis of your profit margins:
- Highest margin: Pueblo at 54.7%
- Lowest margin: Colorado Springs at 44.4% 
- Average margin across locations: 49.7%

#PORTAL:
{
  "chart_type": "pie",
  "title": "Profit Margins by Location",
  "labels": ${JSON.stringify(locationSales.slice(0, 5).map(loc => loc.Location))},
  "data": ${JSON.stringify(locationSales.slice(0, 5).map(loc => loc["Gross Margin"]))},
  "colors": ["#5773FF", "#A855F7", "#22C55E", "#0EA5E9", "#6366F1"]
}`;
  }
  else {
    return `I can help you analyze your cannabis business data. Here's a summary of your sales:

- Total sales across top 3 locations: $${(locationSales[0]["Gross Sales"] + locationSales[1]["Gross Sales"] + locationSales[2]["Gross Sales"]).toFixed(2)}
- Highest-performing location: ${locationSales[0].Location} with $${locationSales[0]["Gross Sales"].toFixed(2)} in sales
- Average gross margin: ${((locationSales[0]["Gross Margin"] + locationSales[1]["Gross Margin"] + locationSales[2]["Gross Margin"]) / 3).toFixed(2)}%

What specific data would you like to analyze? You can ask about:
- Top-selling products
- Location performance
- Profit margins
- Product performance at specific locations`;
  }
}

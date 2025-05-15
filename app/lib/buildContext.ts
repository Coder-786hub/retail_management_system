import { ChatMessage } from './openai';

interface SalesLocation {
  Location: string;
  "Gross Sales": number;
  "Gross Profit": number;
  "Items Sold": number;
}

interface SalesProduct {
  Product: string;
  "Gross Sales": number;
  "Gross Profit": number;
  "Items Sold": number;
  Category?: string;
}

/**
 * Summarizes location data to provide the most relevant insights
 */
export function summarizeLocations(locations: SalesLocation[]): string {
  // Sort by Gross Sales
  const byRevenue = [...locations]
    .sort((a, b) => b["Gross Sales"] - a["Gross Sales"])
    .slice(0, 5)
    .map(loc => `${loc.Location}: $${loc["Gross Sales"].toFixed(0)}, GP $${loc["Gross Profit"].toFixed(0)}`);

  // Sort by Profit Margin
  const byMargin = [...locations]
    .sort((a, b) => (b["Gross Profit"] / b["Gross Sales"]) - (a["Gross Profit"] / a["Gross Sales"]))
    .slice(0, 3)
    .map(loc => {
      const margin = (loc["Gross Profit"] / loc["Gross Sales"] * 100).toFixed(1);
      return `${loc.Location}: ${margin}% margin on $${loc["Gross Sales"].toFixed(0)} sales`;
    });

  return `
🏪 Top Stores by Revenue:
${byRevenue.join("\n")}

💰 Top Stores by Margin:
${byMargin.join("\n")}
`;
}

/**
 * Summarizes product data to provide the most relevant insights
 */
export function summarizeProducts(products: SalesProduct[]): string {
  // Sort by Gross Sales
  const byRevenue = [...products]
    .sort((a, b) => b["Gross Sales"] - a["Gross Sales"])
    .slice(0, 5)
    .map(p => `${p.Product}: $${p["Gross Sales"].toFixed(0)} (${p["Items Sold"]} units)`);

  // Sort by Profit Margin
  const byMargin = [...products]
    .sort((a, b) => (b["Gross Profit"] / b["Gross Sales"]) - (a["Gross Profit"] / a["Gross Sales"]))
    .slice(0, 3)
    .map(p => {
      const margin = (p["Gross Profit"] / p["Gross Sales"] * 100).toFixed(1);
      return `${p.Product}: ${margin}% margin on $${p["Gross Sales"].toFixed(0)} sales`;
    });

  // Sort by Volume
  const byVolume = [...products]
    .sort((a, b) => b["Items Sold"] - a["Items Sold"])
    .slice(0, 3)
    .map(p => `${p.Product}: ${p["Items Sold"]} units at $${(p["Gross Sales"] / p["Items Sold"]).toFixed(2)}/unit`);

  return `
🌿 Top Products by Revenue:
${byRevenue.join("\n")}

💵 Top Products by Margin:
${byMargin.join("\n")}

📊 Top Products by Volume:
${byVolume.join("\n")}
`;
}

/**
 * Filters location data based on user query
 */
export function filterLocations(locations: SalesLocation[], query: string): SalesLocation[] {
  query = query.toLowerCase();
  return locations.filter(loc => loc.Location.toLowerCase().includes(query));
}

/**
 * Filters product data based on user query
 */
export function filterProducts(products: SalesProduct[], query: string): SalesProduct[] {
  query = query.toLowerCase();
  return products.filter(p => 
    p.Product.toLowerCase().includes(query) || 
    (p.Category && p.Category.toLowerCase().includes(query))
  );
}

/**
 * Build the system context based on sales data
 */
export function buildSalesContext(
  locations: SalesLocation[], 
  products: SalesProduct[],
  userQuery?: string
): ChatMessage {
  let filteredLocations = locations;
  let filteredProducts = products;
  
  // If there's a user query, check if we need to filter the data
  if (userQuery) {
    const query = userQuery.toLowerCase();
    
    // Check if query contains location names
    const locationSpecific = locations.some(loc => 
      query.includes(loc.Location.toLowerCase())
    );
    
    // Check if query contains product names or categories
    const productSpecific = products.some(p => 
      query.includes(p.Product.toLowerCase()) || 
      (p.Category && query.includes(p.Category.toLowerCase()))
    );
    
    // Apply filters if needed
    if (locationSpecific) {
      filteredLocations = filterLocations(locations, query);
    }
    
    if (productSpecific) {
      filteredProducts = filterProducts(products, query);
    }
  }
  
  const locationSummary = summarizeLocations(filteredLocations);
  const productSummary = summarizeProducts(filteredProducts);
  
  // Detect visualization requests
  const wantsVisualization = userQuery && (
    userQuery.toLowerCase().includes('chart') ||
    userQuery.toLowerCase().includes('graph') ||
    userQuery.toLowerCase().includes('plot') ||
    userQuery.toLowerCase().includes('show') ||
    userQuery.toLowerCase().includes('visual')
  );

  return {
    role: 'system',
    content: `
You are an embedded AI assistant inside a cannabis retail dashboard.

Use the following data context for reasoning:

${locationSummary}

${productSummary}

${wantsVisualization ? `
IMPORTANT: The user wants to see a visualization. You MUST generate JSON data for the Portal panel using this format:
#PORTAL: { "chart_type": "bar|line|pie", "labels": [...], "data": [...], "title": "..." }
` : `
You may generate JSON data for the Portal panel using this format:
#PORTAL: { "chart_type": "bar|line|pie", "labels": [...], "data": [...], "title": "..." }
`}

Avoid guessing numbers — stick to what you know from the provided data.
    `
  };
}

/**
 * Detect mode from user query and adjust system instructions
 */
export function getQueryMode(query: string): 'chart' | 'profit' | 'sales' | 'general' {
  query = query.toLowerCase();
  
  if (query.includes('chart') || query.includes('graph') || query.includes('visual') || query.includes('show')) {
    return 'chart';
  } else if (query.includes('profit') || query.includes('margin') || query.includes('profitable')) {
    return 'profit';
  } else if (query.includes('sales') || query.includes('revenue') || query.includes('selling')) {
    return 'sales';
  } else {
    return 'general';
  }
}

/**
 * Create system message with mode-specific instructions
 */
export function createModeSpecificSystem(
  mode: 'chart' | 'profit' | 'sales' | 'general',
  locationSummary: string,
  productSummary: string
): ChatMessage {
  let instructions = '';
  
  switch (mode) {
    case 'chart':
      instructions = `
IMPORTANT: The user wants to see a visualization. You MUST include a "#PORTAL:" marker in your response followed by visualization data in JSON format.

Example response format:
"Here's the visualization of your data.

#PORTAL:
{
  "chart_type": "bar", 
  "labels": ["Store A", "Store B", "Store C"], 
  "data": [5000, 3000, 2000], 
  "title": "Store Performance"
}
"`;
      break;
    case 'profit':
      instructions = `Focus on providing profit and margin insights. Highlight the most profitable products and stores.`;
      break;
    case 'sales':
      instructions = `Focus on providing sales and revenue insights. Highlight the best-selling products and top-performing stores.`;
      break;
    default:
      instructions = `You may generate JSON data for the Portal panel using this format:
#PORTAL: { "chart_type": "bar|line|pie", "labels": [...], "data": [...], "title": "..." }`;
  }
  
  return {
    role: 'system',
    content: `
You are an embedded AI assistant inside a cannabis retail dashboard.

Use the following data context for reasoning:

${locationSummary}

${productSummary}

${instructions}

Avoid guessing numbers — stick to what you know from the provided data.
    `
  };
} 
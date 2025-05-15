const fs = require('fs');
const path = require('path');

// Path to the .env.local file
const envPath = path.join(process.cwd(), '.env.local');

// Check if the file exists
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found');
  process.exit(1);
}

// Read the current content
const content = fs.readFileSync(envPath, 'utf8');

// Parse the VITE_OPENAI_KEY
const viteKeyMatch = content.match(/VITE_OPENAI_KEY=(.*?)(\n|$)/s);
if (!viteKeyMatch) {
  console.log('❌ VITE_OPENAI_KEY not found in .env.local');
  process.exit(1);
}

// Extract the actual API key value
const apiKeyValue = viteKeyMatch[1].trim();
console.log('✅ Found API key');

// Check if the NEXT_PUBLIC_OPENAI_KEY is using variable interpolation
if (content.includes('NEXT_PUBLIC_OPENAI_KEY=${VITE_OPENAI_KEY}')) {
  console.log('⚠️ NEXT_PUBLIC_OPENAI_KEY is using variable interpolation, fixing...');
  
  // Create the updated content with direct assignment
  const updatedContent = content.replace(
    'NEXT_PUBLIC_OPENAI_KEY=${VITE_OPENAI_KEY}',
    `NEXT_PUBLIC_OPENAI_KEY=${apiKeyValue}`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(envPath, updatedContent);
  console.log('✅ .env.local file updated with direct API key assignment');
} else {
  console.log('✅ NEXT_PUBLIC_OPENAI_KEY appears to be properly configured');
}

console.log('🔍 Environment variables are now properly set up');
console.log('🔄 Please restart your Next.js server for the changes to take effect'); 
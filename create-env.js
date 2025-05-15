const fs = require('fs');
const path = require('path');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const exists = fs.existsSync(envPath);

if (exists) {
  console.log('✅ .env.local file already exists');
  
  // Read it to check for OpenAI key
  const content = fs.readFileSync(envPath, 'utf8');
  
  if (content.includes('NEXT_PUBLIC_OPENAI_KEY=')) {
    console.log('✅ NEXT_PUBLIC_OPENAI_KEY found in .env.local');
  } else if (content.includes('VITE_OPENAI_KEY=')) {
    console.log('⚠️ VITE_OPENAI_KEY found but not NEXT_PUBLIC_OPENAI_KEY');
    console.log('⚠️ Adding NEXT_PUBLIC_OPENAI_KEY that points to VITE_OPENAI_KEY');
    
    const newContent = content + '\n# Added by setup script\nNEXT_PUBLIC_OPENAI_KEY=${VITE_OPENAI_KEY}\n';
    fs.writeFileSync(envPath, newContent);
    
    console.log('✅ Updated .env.local with NEXT_PUBLIC_OPENAI_KEY');
  } else {
    console.log('❌ No OpenAI key found in .env.local');
    console.log('⚠️ Please add your OpenAI key to .env.local:');
    console.log('NEXT_PUBLIC_OPENAI_KEY=your_openai_api_key_here');
  }
} else {
  console.log('❌ .env.local file does not exist');
  console.log('⚠️ Creating .env.local with placeholder for OpenAI key');
  
  const content = `# OpenAI API key
NEXT_PUBLIC_OPENAI_KEY=your_openai_api_key_here

# If you already have a VITE_OPENAI_KEY set up
# VITE_OPENAI_KEY=your_openai_api_key_here
`;
  
  fs.writeFileSync(envPath, content);
  console.log('✅ Created .env.local file');
  console.log('⚠️ Please edit .env.local and add your actual OpenAI API key');
}

console.log('\n🔍 Next steps:');
console.log('1. Make sure your .env.local has NEXT_PUBLIC_OPENAI_KEY set properly');
console.log('2. Restart your Next.js dev server');
console.log('3. Visit http://localhost:3006 to test the application\n'); 
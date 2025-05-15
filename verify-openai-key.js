const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

// Function to verify the OpenAI API key
async function verifyOpenAIKey() {
  console.log('🔍 Verifying OpenAI API Key...');
  
  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    console.log('Please create a .env.local file with your OpenAI API key:');
    console.log('NEXT_PUBLIC_OPENAI_KEY=your_openai_api_key_here');
    return false;
  }
  
  // Read .env.local and check for API key
  const envContent = fs.readFileSync(envPath, 'utf8');
  const apiKeyMatch = envContent.match(/NEXT_PUBLIC_OPENAI_KEY=([^\s]+)/);
  const viteKeyMatch = envContent.match(/VITE_OPENAI_KEY=([^\s]+)/);
  
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY || process.env.VITE_OPENAI_KEY;
  
  if (!apiKey) {
    console.log('❌ No OpenAI API key found in environment variables');
    console.log('API Key from file:', apiKeyMatch ? 'Found' : 'Not found');
    console.log('VITE Key from file:', viteKeyMatch ? 'Found' : 'Not found');
    console.log('Please check your .env.local file and restart the server.');
    return false;
  }
  
  console.log('✅ API key found in environment');
  
  // Verify the API key with OpenAI
  try {
    console.log('🔄 Testing API key with OpenAI...');
    
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    console.log('✅ API key is valid! Available models:');
    const models = response.data.data.slice(0, 5).map(model => model.id);
    console.log(models.join(', ') + '...');
    
    return true;
  } catch (error) {
    console.log('❌ API key verification failed');
    console.log('Error:', error.response?.data?.error?.message || error.message);
    return false;
  }
}

// Install dotenv if it's not installed
if (!fs.existsSync(path.join(process.cwd(), 'node_modules/dotenv'))) {
  console.log('📦 Installing dotenv package...');
  require('child_process').execSync('npm install dotenv --no-save', { stdio: 'inherit' });
}

// Run the verification
verifyOpenAIKey().then(isValid => {
  if (isValid) {
    console.log('\n🚀 Your OpenAI API key is valid and working!');
    console.log('You can now use the chat functionality with real AI responses.');
  } else {
    console.log('\n⚠️ Your OpenAI API key setup needs attention.');
    console.log('Please fix the issues above and try again.');
  }
}); 
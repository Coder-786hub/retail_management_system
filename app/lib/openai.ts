// This is a placeholder for the OpenAI integration
// In Phase 2, this will be implemented with actual OpenAI API calls

import axios from 'axios';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionResponse {
  message: ChatMessage;
  rawResponse?: any;
}

export async function getChatCompletion(
  messages: ChatMessage[],
  onChunk?: (chunk: string) => void
): Promise<ChatCompletionResponse> {
  try {
    // Log the key availability (not the actual key)
    console.log("🔑 OpenAI Key available:", Boolean(process.env.NEXT_PUBLIC_OPENAI_KEY));
    
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please add NEXT_PUBLIC_OPENAI_KEY to your .env.local file.');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        stream: Boolean(onChunk),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("🔴 OpenAI API Error:", {
        status: response.status,
        statusText: response.statusText,
        data: error
      });
      throw new Error(error.error?.message || `Failed to fetch from OpenAI API: ${response.status} ${response.statusText}`);
    }

    if (onChunk) {
      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk
            .split('\n')
            .filter(line => line.trim() !== '' && line.trim() !== 'data: [DONE]');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const json = JSON.parse(data);
                const content = json.choices[0]?.delta?.content || '';
                if (content) {
                  fullContent += content;
                  onChunk(content);
                }
              } catch (err) {
                console.error('Error parsing streaming data:', err);
              }
            }
          }
        }
      }

      return {
        message: {
          role: 'assistant',
          content: fullContent,
        }
      };
    } else {
      // Handle normal response
      const data = await response.json();
      return {
        message: {
          role: 'assistant',
          content: data.choices[0]?.message?.content || '',
        },
        rawResponse: data
      };
    }
  } catch (error: any) {
    console.error('🔴 Error calling OpenAI API:', error);
    throw error;
  }
}

// Utility function to check if text contains portal markers
export function extractPortalContent(text: string): { message: string, portalContent: string | null } {
  const portalMarker = '#PORTAL:';
  const portalIndex = text.indexOf(portalMarker);
  
  if (portalIndex === -1) {
    return { message: text, portalContent: null };
  }
  
  const message = text.substring(0, portalIndex).trim();
  const portalContent = text.substring(portalIndex + portalMarker.length).trim();
  
  return { message, portalContent };
}

// Function that uses fetch with streaming to send requests to OpenAI
export async function sendToOpenAI(messages: ChatMessage[], onProgress?: (text: string) => void): Promise<string> {
  try {
    console.log("🔑 Checking for API key...");
    // Get API key from environment variables
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY || process.env.VITE_OPENAI_KEY;
    
    console.log("🔑 API Key available:", Boolean(API_KEY));
    
    if (!API_KEY) {
      throw new Error('OpenAI API key is not configured. Please check your .env.local file.');
    }

    // Add system instructions for portal visualization if not present
    let enhancedMessages = [...messages];
    const hasSystemMessage = messages.some(msg => msg.role === 'system');
    const userMessageContent = messages.find(msg => msg.role === 'user')?.content || '';
    
    // Check for visualization or image requests
    const wantsPicture = userMessageContent.toLowerCase().includes('picture') || 
                         userMessageContent.toLowerCase().includes('image') || 
                         userMessageContent.toLowerCase().includes('photo');
                         
    const wantsVisualization = userMessageContent.toLowerCase().includes('graph') || 
                              userMessageContent.toLowerCase().includes('chart') || 
                              userMessageContent.toLowerCase().includes('visual') || 
                              userMessageContent.toLowerCase().includes('plot') ||
                              userMessageContent.toLowerCase().includes('portal');
    
    // If user wants a picture/image
    if (wantsPicture && !wantsVisualization) {
      // Insert special system message for ASCII art
      enhancedMessages = [
        { 
          role: 'system', 
          content: `You are a helpful AI assistant that can create ASCII art representations of images.

IMPORTANT INSTRUCTION: When the user requests a picture or image, create an ASCII art representation and include it in a code block. Also include a "#PORTAL:" marker followed by the same ASCII art in a JSON format.

Example response format:
"Here's an ASCII art representation of a dog:

\`\`\`
  / \\__
 (    @\\___
 /         O
/   (_____/
/_____/   U
\`\`\`

#PORTAL:
{
  "type": "asciiArt",
  "subject": "dog",
  "art": "  / \\__\\n (    @\\___\\n /         O\\n/   (_____/\\n/_____/   U"
}"`
        },
        ...messages.filter(msg => msg.role !== 'system')
      ];
    }
    // If user wants a visualization (chart/graph)
    else if (wantsVisualization || !hasSystemMessage) {
      // Insert special system message to force portal content
      enhancedMessages = [
        { 
          role: 'system', 
          content: `You are a helpful AI assistant that specializes in creating visualizations.
          
IMPORTANT INSTRUCTION: When the user requests ANY data, chart, graph, or visualization, you MUST include a "#PORTAL:" marker in your response followed by visualization data in JSON format.

Example response format when visualization is requested:
"Here's your explanation...

#PORTAL:
{
  "type": "lineChart",
  "title": "Data Visualization",
  "data": {
    "labels": ["Jan", "Feb", "Mar"],
    "datasets": [
      {
        "label": "Sales",
        "data": [50, 60, 70],
        "borderColor": "blue",
        "fill": false
      }
    ]
  }
}"

For stock market data, ALWAYS include a complete JSON object with the "#PORTAL:" marker.`
        },
        ...messages.filter(msg => msg.role !== 'system')
      ];
    }

    // Make the real API call to OpenAI
    console.log("🔄 Making real OpenAI API call with fetch");
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can also use "gpt-4o" if you have access
        messages: enhancedMessages,
        temperature: 0.7,
        stream: Boolean(onProgress),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("🔴 OpenAI API Error:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });

      // Handle rate limiting specifically
      if (response.status === 429) {
        console.log("⚠️ Rate limited by OpenAI API, using fallback response");
        
        // Get the user's message for a personalized mock response
        const userMessage = messages.find(m => m.role === 'user')?.content || '';
        
        const fallbackResponse = `I received your message: "${userMessage}". However, we're currently being rate limited by the OpenAI API. Please try again in a few minutes.`;
        
        if (onProgress) {
          // Simulate streaming for better UX
          const words = fallbackResponse.split(' ');
          for (const word of words) {
            await new Promise(resolve => setTimeout(resolve, 50));
            onProgress(word + ' ');
          }
        }
        
        return fallbackResponse;
      }
      
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    // If streaming is enabled and we have a progress callback
    if (onProgress && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '' && line.trim().startsWith('data: '));
        
        for (const line of lines) {
          const data = line.replace(/^data: /, '');
          if (data === '[DONE]') continue;
          
          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              onProgress(content);
            }
          } catch (err) {
            console.error('Error parsing streaming data:', err);
          }
        }
      }

      return fullContent;
    } else {
      // Handle regular non-streaming responses
      const data = await response.json();
      return data.choices[0].message.content;
    }
  } catch (error: any) {
    console.error("🔴 Error:", {
      status: error?.response?.status || error?.status,
      data: error?.response?.data || error?.data,
      message: error?.message,
    });
    
    throw new Error(error?.response?.data?.error?.message || error.message);
  }
} 
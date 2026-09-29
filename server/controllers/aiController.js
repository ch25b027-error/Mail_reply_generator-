import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Collect all available keys, filtering out undefined/empty ones
const apiKeys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean);

if (apiKeys.length === 0) {
  console.warn("WARNING: No GEMINI_API_KEY_X found in environment variables.");
}

let currentKeyIndex = 0;

/**
 * Helper to call Gemini and rotate keys if rate limited or overloaded.
 */
const callGeminiWithFallback = async (model, contents) => {
  if (apiKeys.length === 0) {
    throw new Error("No Gemini API keys available");
  }

  const maxAttempts = apiKeys.length * 2;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const apiKey = apiKeys[currentKeyIndex];
      const ai = new GoogleGenAI({ apiKey });
      
      console.log(`🚀 CALLING GEMINI API (Attempt ${attempt + 1}/${maxAttempts}, Key Index: ${currentKeyIndex})`);
      
      const response = await ai.models.generateContent({
        model,
        contents,
      });
      
      return response;
    } catch (error) {
      // Look for 429 (Too Many Requests) or 503 (Service Unavailable)
      const status = error?.status || error?.response?.status;
      
      if (status === 429) {
        console.warn(`[429 Rate Limit] Key ${currentKeyIndex} exhausted. Rotating to next key.`);
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
        attempt++;
        // Retry immediately with the new key
        continue;
      } else if (status === 503) {
        console.warn(`[503 High Demand] Service unavailable. Rotating and pausing before retry.`);
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
        attempt++;
        // Pause 1.5s before retrying
        await new Promise(resolve => setTimeout(resolve, 1500));
        continue;
      }
      
      // If it's a different error (like 400 Bad Request), throw it immediately
      throw error;
    }
  }

  throw new Error(`Failed to generate content after ${maxAttempts} attempts due to API limits.`);
};

export const generateReply = async (req, res) => {
  try {
    const { emailContext, tone = 'Concise and Professional', previousDraft, userPrompt } = req.body;

    if (!emailContext) {
      return res.status(400).json({ error: 'Email context is required' });
    }

    let prompt = \`You are an intelligent email assistant. Draft a reply to the following email.
    
Email Context:
From: \${emailContext.sender}
Subject: \${emailContext.subject}
Body: \${emailContext.body}

Required Tone: \${tone}
\`;

    if (previousDraft && userPrompt) {
      prompt += \`
The user previously generated this draft:
"\${previousDraft}"

The user wants you to refine it with this specific instruction:
"\${userPrompt}"

Output ONLY the refined email body text. Do not include subject lines, placeholders for names unless necessary, or introductory conversational filler like "Here is the refined draft:". Just the raw email text.\`;
    } else {
      prompt += \`\\nOutput ONLY the raw email body text. Do not include subject lines or conversational filler.\`;
    }

    const response = await callGeminiWithFallback('gemini-3.8-flash', prompt);

    res.json({ draft: response.text });
  } catch (error) {
    console.error('Error generating reply:', error);
    res.status(500).json({ error: 'Failed to generate reply' });
  }
};

export const processCommand = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });
    
    const systemPrompt = \`You are an AI inbox organizer acting on behalf of the user. 
    The user has issued the following command: "\${prompt}"
    
    Analyze the command and return a JSON object with a list of 'actions' that should be taken.
    Example: { "actions": ["Categorize all emails from marketing as Promotions", "Archive emails older than 30 days"] }
    
    Respond strictly in valid JSON.\`;
    
    const response = await callGeminiWithFallback('gemini-3.8-flash', systemPrompt);
    
    let jsonResponse = response.text;
    try {
        jsonResponse = JSON.parse(response.text.replace(/\`\`\`json\\n?|\\n?\`\`\`/g, ''));
    } catch(e) {}
    
    res.json({ result: jsonResponse });
  } catch (error) {
    console.error('Error processing command:', error);
    res.status(500).json({ error: 'Failed to process command' });
  }
};

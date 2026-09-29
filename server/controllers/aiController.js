import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateReply = async (req, res) => {
  try {
    const { emailContext, tone = 'Concise and Professional', previousDraft, userPrompt } = req.body;

    if (!emailContext) {
      return res.status(400).json({ error: 'Email context is required' });
    }

    let prompt = `You are an intelligent email assistant. Draft a reply to the following email.
    
Email Context:
From: ${emailContext.sender}
Subject: ${emailContext.subject}
Body: ${emailContext.body}

Required Tone: ${tone}
`;

    if (previousDraft && userPrompt) {
      prompt += `
The user previously generated this draft:
"${previousDraft}"

The user wants you to refine it with this specific instruction:
"${userPrompt}"

Output ONLY the refined email body text. Do not include subject lines, placeholders for names unless necessary, or introductory conversational filler like "Here is the refined draft:". Just the raw email text.`;
    } else {
      prompt += `\nOutput ONLY the raw email body text. Do not include subject lines or conversational filler.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

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
    
    const systemPrompt = `You are an AI inbox organizer acting on behalf of the user. 
    The user has issued the following command: "${prompt}"
    
    Analyze the command and return a JSON object with a list of 'actions' that should be taken.
    Example: { "actions": ["Categorize all emails from marketing as Promotions", "Archive emails older than 30 days"] }
    
    Respond strictly in valid JSON.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
    });
    
    let jsonResponse = response.text;
    try {
        jsonResponse = JSON.parse(response.text.replace(/```json\n?|\n?```/g, ''));
    } catch(e) {}
    
    res.json({ result: jsonResponse });
  } catch (error) {
    console.error('Error processing command:', error);
    res.status(500).json({ error: 'Failed to process command' });
  }
};

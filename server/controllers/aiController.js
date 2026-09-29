import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// 1. Gather all Groq keys from .env
const apiKeys = [
  process.env.GROQ_API_KEY_1 || process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3
].filter(Boolean);

let currentKeyIndex = 0;

// Fallback models in priority order
// Replace the MODELS array in server/controllers/aiController.js
const MODELS = [
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-20b'
];

/**
 * Helper to execute completion requests with Key Rotation + Model Fallback
 */
const callGroqWithFallback = async (messages, responseFormat = null) => {
  if (apiKeys.length === 0) {
    throw new Error('No Groq API keys configured in .env');
  }

  let attempts = 0;
  const maxAttempts = apiKeys.length * MODELS.length;

  while (attempts < maxAttempts) {
    const activeKey = apiKeys[currentKeyIndex];
    const groq = new Groq({ apiKey: activeKey });
    
    // Pick model based on current attempt phase
    const model = MODELS[attempts % MODELS.length];

    try {
      console.log(`🚀 Calling Groq API [Key #${currentKeyIndex + 1} | Model: ${model}]`);

      const params = {
        messages,
        model,
        temperature: 0.3,
      };

      if (responseFormat) {
        params.response_format = responseFormat;
      }

      const completion = await groq.chat.completions.create(params);
      return completion.choices[0]?.message?.content || '';

    } catch (error) {
      attempts++;
      const status = error.status || error.code;

      console.warn(`⚠️ Groq Request Failed (Status: ${status} | Key #${currentKeyIndex + 1} | Model: ${model})`);

      if (status === 429) {
        // Rate limit reached -> Rotate key immediately
        console.warn(`Rotating to Key #${((currentKeyIndex + 1) % apiKeys.length) + 1}...`);
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      } else if (status === 503 || status === 500) {
        // High demand / server hiccup -> Pause briefly and rotate key
        await new Promise((resolve) => setTimeout(resolve, 1000));
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      } else {
        throw error;
      }
    }
  }

  throw new Error('All Groq API keys and model fallbacks exhausted.');
};

export const generateReply = async (req, res) => {
  try {
    const { emailContext, tone = 'Concise and Professional', previousDraft, userPrompt } = req.body;

    if (!emailContext) {
      return res.status(400).json({ error: 'Email context is required' });
    }

    let userInstruction = `Draft a reply to this email:
From: ${emailContext.sender}
Subject: ${emailContext.subject}
Body: ${emailContext.body}

Required Tone: ${tone}`;

    if (previousDraft && userPrompt) {
      userInstruction += `\n\nPrevious draft: "${previousDraft}"\nRefine it with this instruction: "${userPrompt}"`;
    }

    const messages = [
      {
        role: 'system',
        content: 'You are an intelligent email assistant. Output ONLY the raw email body text. Do not include subject lines, greetings, placeholders, or conversational filler like "Here is your draft:".'
      },
      {
        role: 'user',
        content: userInstruction
      }
    ];

    const draft = await callGroqWithFallback(messages);
    res.json({ draft });

  } catch (error) {
    console.error('Error generating reply:', error);
    res.status(500).json({ error: error.message || 'Failed to generate reply' });
  }
};

export const processCommand = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    const messages = [
      {
        role: 'system',
        content: 'You are an AI inbox organizer. Analyze the user command and return a JSON object with key "actions" containing a list of strings representing recommended actions.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    // Enforce JSON output mode on Groq
    const rawResponse = await callGroqWithFallback(messages, { type: 'json_object' });

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(rawResponse);
    } catch (e) {
      jsonResponse = { actions: [rawResponse] };
    }

    res.json({ result: jsonResponse });

  } catch (error) {
    console.error('Error processing command:', error);
    res.status(500).json({ error: error.message || 'Failed to process command' });
  }
};
export const getHistory = async (req, res) => {
  res.json({
    metrics: { actionsThisWeek: 38, messagesAffected: 216, timeSaved: '3.4 hrs', successRate: '98.7%' },
    actions: [
      {
        id: 'h1',
        title: 'Auto-sorted inbox by priority',
        description: '147 messages affected',
        status: 'Completed',
        time: 'Today, 9:46 AM',
        previewSubject: 'Auto-Sort Execution Log',
        previewBody: 'Moved 147 marketing and promotional emails into the Newsletters folder based on sender patterns and prior engagement metrics.'
      },
      {
        id: 'h2',
        title: 'Drafted reply to Maya Chen',
        description: '1 message affected',
        status: 'Awaiting approval',
        time: 'Today, 9:43 AM',
        previewSubject: 'Re: Q4 launch plan - final review',
        previewBody: 'Hi Maya, confirmed - the revised rollout dates look good, including the October 14 beta announcement. I\'ll bring the final launch checklist to our 3 PM sync.'
      },
      {
        id: 'h3',
        title: 'Marked newsletters as read',
        description: '31 messages affected',
        status: 'Completed',
        time: 'Yesterday, 4:12 PM',
        previewSubject: 'Bulk Action: Mark Read',
        previewBody: 'Identified and marked 31 known newsletters as read to clear primary inbox clutter.'
      },
      {
        id: 'h4',
        title: 'Archived old receipts',
        description: '18 messages affected',
        status: 'Completed',
        time: 'Sep 22, 2:06 PM',
        previewSubject: 'Bulk Action: Archive',
        previewBody: 'Archived 18 historical receipts older than 30 days.'
      }
    ]
  });
};

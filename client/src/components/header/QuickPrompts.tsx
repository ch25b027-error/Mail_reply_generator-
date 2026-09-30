import React, { useState } from 'react';
import axios from 'axios';
import CommonBar from './CommonBar';
import { useEmail } from '../../context/EmailContext';

export default function QuickPrompts() {
  const [promptText, setPromptText] = useState('');
  const { isAiProcessing, setIsAiProcessing, setIsAssistantOpen, emails } = useEmail();

  const prompts = [
    { id: 'sort', label: 'Auto-Sort Inbox', icon: 'M4 6h16M4 12h16M4 18h7' },
    { id: 'newsletters', label: 'Mark Newsletters as Read', icon: 'M5 13l4 4L19 7' },
    { id: 'draft', label: 'Draft Follow-up Email', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  ];

  const handleExecute = async (textToExecute = promptText) => {
    if (!textToExecute.trim()) return;
    
    setIsAiProcessing(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/ai/command', {
        prompt: textToExecute
      }, {
        withCredentials: true
      });
      console.log("AI Response:", response.data);
      
      // Auto-open assistant if draft or reply related
      if (textToExecute.toLowerCase().includes('draft') || textToExecute.toLowerCase().includes('reply')) {
          setIsAssistantOpen(true);
      }
    } catch (error) {
      console.error("Command failed:", error);
    } finally {
      setIsAiProcessing(false);
      // Clear input bar only if it was fired from the text bar (not from a quick prompt that passes string directly)
      if (textToExecute === promptText) {
        setPromptText('');
      }
    }
  };

  const handlePromptClick = async (label: string) => {
    if (label === 'Auto-Sort Inbox') {
      const prompt = "Auto-Sort Inbox into Priority, Work, Newsletters, and Receipts";
      await handleExecute(prompt);
      // Optional: trigger re-fetch or toast here
    } else if (label === 'Mark Newsletters as Read') {
      const prompt = "Mark all newsletter emails as read";
      await handleExecute(prompt);
      
      try {
        const newsletterIds = emails.filter(e => e.category === 'newsletters').map(e => e.id);
        if (newsletterIds.length > 0) {
          await axios.post('http://localhost:5000/api/emails/mark-read', { emailIds: newsletterIds }, { withCredentials: true });
        }
      } catch (err) {
        console.error("Failed to mark read:", err);
      }
    } else if (label === 'Draft Follow-up Email') {
      const prompt = "Draft a concise follow-up email for the latest unanswered thread";
      setPromptText(prompt);
      handleExecute(prompt);
    }
  };

  return (
    <div className="bg-[#0B1120] rounded-xl border border-slate-800 p-4 mb-6 mt-2 shadow-sm">
      <CommonBar 
        promptText={promptText} 
        setPromptText={setPromptText} 
        onExecute={() => handleExecute()} 
        isProcessing={isAiProcessing} 
      />
      
      <div className="flex items-center gap-3 mt-4 px-2 overflow-x-auto scrollbar-hide pb-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Quick Prompts</span>
        <div className="flex gap-2">
          {prompts.map(prompt => (
            <button 
              key={prompt.id} 
              onClick={() => handlePromptClick(prompt.label)}
              disabled={isAiProcessing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-200 transition-colors whitespace-nowrap disabled:opacity-50"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={prompt.icon} />
              </svg>
              {prompt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

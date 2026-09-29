import React from 'react';
import CommonBar from './CommonBar';

export default function QuickPrompts() {
  const prompts = [
    { id: 'sort', label: 'Auto-Sort Inbox', icon: 'M4 6h16M4 12h16M4 18h7' },
    { id: 'newsletters', label: 'Mark Newsletters as Read', icon: 'M5 13l4 4L19 7' },
    { id: 'draft', label: 'Draft Follow-up Email', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  ];

  const handlePromptClick = (label: string) => {
    console.log("Triggering Quick Prompt:", label);
  };

  return (
    <div className="bg-[#0B1120] rounded-xl border border-slate-800 p-4 mb-6 mt-2 shadow-sm">
      <CommonBar />
      
      <div className="flex items-center gap-3 mt-4 px-2 overflow-x-auto scrollbar-hide pb-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Quick Prompts</span>
        <div className="flex gap-2">
          {prompts.map(prompt => (
            <button 
              key={prompt.id} 
              onClick={() => handlePromptClick(prompt.label)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-200 transition-colors whitespace-nowrap"
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

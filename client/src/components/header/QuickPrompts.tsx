import React from 'react';
import { Sparkles, Command, ArrowRight } from 'lucide-react';

export default function QuickPrompts() {
  const prompts = [
    { id: 'sort', label: 'Auto-Sort Inbox', icon: 'M4 6h16M4 12h16M4 18h7' },
    { id: 'newsletters', label: 'Mark Newsletters as Read', icon: 'M5 13l4 4L19 7' },
    { id: 'draft', label: 'Draft Follow-up Email', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  ];

  return (
    <div className="bg-[#0B1120] rounded-xl border border-slate-800 p-4 mb-6 mt-2 shadow-sm">
      <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg border border-slate-800 p-2 pl-4">
        <Sparkles className="w-5 h-5 text-indigo-400" />
        <input 
          type="text" 
          placeholder="Ask AI to organize, draft, summarize, or find anything..." 
          className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500"
        />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 border border-slate-700">
            <Command className="w-3 h-3" />
            <span>↵</span>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
            <ArrowRight className="w-4 h-4" />
            Execute
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mt-4 px-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Prompts</span>
        <div className="flex gap-2">
          {prompts.map(prompt => (
            <button key={prompt.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-200 transition-colors">
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

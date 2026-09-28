import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function Replygenerator() {
  return (
    <div className="rounded-xl border border-indigo-500/40 bg-[#0c1222] shadow-[0_0_15px_rgba(99,102,241,0.05)] overflow-hidden">
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold text-slate-200 tracking-wide">AI reply generator</span>
        </div>
        <div className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 border border-slate-700 text-slate-400">
          Concise · Professional
        </div>
      </div>
      <div className="p-3.5 text-[13px] text-slate-300 leading-relaxed font-medium">
        Hi Maya, confirmed - the revised rollout dates look good, including the October 14 beta announcement. 
        I'll bring the final launch checklist to our 3 PM sync. Thanks for turning this around.
      </div>
      <div className="p-3 bg-[#0c1222]">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm border border-slate-500/50"></div>
          <input 
            type="text" 
            placeholder="Refine Prompt..." 
            className="w-full bg-[#131A2B] border border-slate-700/80 rounded-lg py-2 pl-9 pr-8 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 p-1">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

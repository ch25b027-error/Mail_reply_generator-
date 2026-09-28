import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ActionLogitemProps {
  id: string;
  title: string;
  meta: string;
  status: string;
  statusColor: string;
  time: string;
  iconColor: string;
  isPending?: boolean;
}

export default function ActionLogitem({ title, meta, status, statusColor, time, iconColor, isPending }: ActionLogitemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-xl border transition-colors overflow-hidden ${
      isPending ? 'bg-indigo-900/10 border-indigo-500/20' : 'bg-[#0B1120]/50 border-slate-800/50 hover:bg-[#0B1120]'
    }`}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${iconColor}`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">{meta}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
            isPending ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            {status}
          </div>
          <span className="text-[11px] text-slate-500 w-24 text-right">{time}</span>
          <button className="text-slate-500 hover:text-slate-300">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-16 pb-4 pt-2 border-t border-slate-800/50">
          <div className="text-xs text-slate-400">
            <strong>Details:</strong> Action executed successfully without issues. 
            Detailed email bodies or drafts involved would be shown here.
          </div>
        </div>
      )}
    </div>
  );
}

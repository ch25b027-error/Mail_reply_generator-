import React from 'react';
import { Sparkles, Command, ArrowRight, Loader2 } from 'lucide-react';

interface CommonBarProps {
  promptText: string;
  setPromptText: (val: string) => void;
  onExecute: () => void;
  isProcessing: boolean;
}

export default function CommonBar({ promptText, setPromptText, onExecute, isProcessing }: CommonBarProps) {
  return (
    <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg border border-slate-800 p-2 pl-4">
      <Sparkles className="w-5 h-5 text-indigo-400" />
      <input 
        type="text" 
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        placeholder="Ask AI to organize, draft, summarize, or find anything..." 
        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500"
        onKeyDown={(e) => e.key === 'Enter' && onExecute()}
      />
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 border border-slate-700">
          <Command className="w-3 h-3" />
          <span>↵</span>
        </div>
        <button 
          onClick={onExecute}
          disabled={isProcessing || !promptText.trim()}
          className="flex items-center justify-center min-w-[100px] gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ArrowRight className="w-4 h-4" />
              Execute
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, ChevronRight } from 'lucide-react';
import EmailReader from './EmailReader';
import Replygenerator from './Replygenerator';
import { useEmail } from '../../context/EmailContext';

export default function AssistantPanel() {
  const { selectedEmail, setSelectedEmail } = useEmail();
  const [isOpen, setIsOpen] = useState(true);

  // If no email selected or panel closed
  if (!isOpen || !selectedEmail) {
    if (!isOpen && selectedEmail) {
      // Small handle to reopen
      return (
        <button 
          onClick={() => setIsOpen(true)}
          className="h-full border-l border-slate-800 bg-[#0B1120] p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 mb-2 -rotate-180" />
          <span className="writing-vertical text-xs font-semibold uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>AI Assistant</span>
        </button>
      );
    }
    return null;
  }

  return (
    <div className="w-[360px] flex-shrink-0 border-l border-slate-800 bg-[#0B1120] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/50 flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mt-1 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-slate-100">AI Assistant</h2>
            <p className="text-[11px] text-indigo-400 font-medium">Reading selected email</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 text-slate-500 hover:text-slate-300 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* AI PARSING Section */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Parsing</h3>
          <div className="space-y-2.5">
            {[
              'Detected request and deadline',
              'Retrieved Q4 launch context',
              'Drafted concise confirmation'
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 bg-emerald-500/10 rounded-full" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <EmailReader email={selectedEmail} />
        
        <Replygenerator />
      </div>

      {/* Footer Buttons */}
      <div className="p-4 border-t border-slate-800/50 space-y-3 bg-[#0B1120]">
        <button className="w-full py-2.5 rounded-lg border border-slate-700 bg-[#131A2B] text-[13px] font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
          Confirm & Send Email
        </button>
        <button className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-[13px] font-semibold text-white transition-colors flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Approve & Send
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import EmailReader from './EmailReader';
import Replygenerator from './Replygenerator';
import { useEmail } from '../../context/EmailContext';

export default function AssistantPanel() {
  const { selectedEmail, isAnalyzingSummary, aiSummary, isAssistantOpen: isOpen, setIsAssistantOpen: setIsOpen, rightPanelWidth } = useEmail();
  

  if (!isOpen || !selectedEmail) {
    if (!isOpen && selectedEmail) {
      return (
        <button 
          onClick={() => setIsOpen(true)}
          className="h-full border-l border-slate-800 bg-[#0c1222] p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 mb-2 -rotate-180" />
          <span className="writing-vertical text-xs font-semibold uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>AI Assistant</span>
        </button>
      );
    }
    return null;
  }

  return (
    <div className="w-[360px] h-full flex flex-col justify-between overflow-hidden bg-[#0c1222] border-l border-slate-800/80 relative">
      <div className="p-4 border-b border-slate-800/50 flex items-start justify-between flex-shrink-0">
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

      <div className="flex-1 overflow-hidden p-4 flex flex-col min-h-0 relative">
        {isAnalyzingSummary && (
          <div className="absolute inset-0 bg-[#0c1222]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center">
             <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
             <p className="text-sm font-semibold text-indigo-300 mb-2">Consulting AI Engine...</p>
             <p className="text-xs text-slate-400">Analyzing thread context and generating response</p>
          </div>
        )}
        
        {aiSummary && !isAnalyzingSummary ? (
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 overflow-y-auto max-h-full scrollbar-hide">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">AI Summary</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{aiSummary}</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4 flex-shrink-0">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Parsing</h3>
              <div className="space-y-2.5">
                {[
                  'Detected request and deadline',
                  'Retrieved Q4 launch context',
                  'Drafted concise confirmation'
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 bg-emerald-500/10 rounded-full flex-shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <EmailReader email={selectedEmail} />
            <Replygenerator />
          </>
        )}
      </div>

      {!aiSummary && (
        <div className="p-4 border-t border-slate-800/50 space-y-3 bg-[#0c1222] flex-shrink-0">
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
      )}
    </div>
  );
}

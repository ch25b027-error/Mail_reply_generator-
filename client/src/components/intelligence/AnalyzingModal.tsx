import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function AnalyzingModal() {
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('Initializing scan...');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsOpen(false), 1000);
          return 100;
        }
        
        // Update step text based on progress
        if (prev > 75) setLoadingStep('Preparing suggested actions...');
        else if (prev > 40) setLoadingStep('Identifying priorities...');
        else if (prev > 10) setLoadingStep('Classifying messages and intent...');
        
        return prev + 2; // increment speed
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-sm">
      <div className="bg-[#0B1120] border border-slate-700 rounded-2xl p-8 w-[450px] shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/20 rounded-full blur-[50px]"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-[50px]"></div>
        
        <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6 relative z-10 animate-pulse">
          <Sparkles className="w-6 h-6 text-teal-400" />
        </div>
        
        <h2 className="text-xl font-bold text-white mb-3 relative z-10">Gemini is analyzing your inbox...</h2>
        <p className="text-sm text-slate-400 mb-8 relative z-10 px-4">
          Reviewing 147 conversations, identifying priorities, and preparing suggested actions.
        </p>
        
        <div className="w-full relative z-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-semibold text-teal-400 tracking-wider uppercase">{loadingStep}</span>
            <span className="text-[10px] font-bold text-slate-500">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

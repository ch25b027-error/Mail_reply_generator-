import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUp, Loader2, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useEmail } from '../../context/EmailContext';

export default function Replygenerator() {
  const { selectedEmail } = useEmail();
  const [draftContent, setDraftContent] = useState('');
  const [selectedTone, setSelectedTone] = useState("Concise & Professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState("");
  const [isToneDropdownOpen, setIsToneDropdownOpen] = useState(false);

  const tones = ["Concise & Professional", "Friendly & Approchable", "Formal", "Direct"];

  const generateReply = async (tone = selectedTone, instructions = "", previousDraft = "") => {
    if (!selectedEmail) return;
    
    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:5000/api/ai/reply', {
        emailContext: selectedEmail,
        tone,
        previousDraft,
        userPrompt: instructions
      }, {
        withCredentials: true
      });
      setDraftContent(response.data.draft);
    } catch (error) {
      console.error('Failed to generate AI reply:', error);
      setDraftContent("Error connecting to Nexus AI Engine. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (selectedEmail && !isGenerating) {
      setDraftContent('');
      generateReply(selectedTone);
    }
  }, [selectedEmail?.id]);

  const handleRefine = () => {
    if (!refinePrompt.trim()) return;
    generateReply(selectedTone, refinePrompt, draftContent);
    setRefinePrompt("");
  };

  const handleToneSelect = (tone) => {
    setSelectedTone(tone);
    setIsToneDropdownOpen(false);
    generateReply(tone);
  };

  if (!selectedEmail) return null;

  return (
    <div className="rounded-xl border border-indigo-500/40 bg-[#0c1222] shadow-[0_0_15px_rgba(99,102,241,0.05)] overflow-hidden">
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between relative">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold text-slate-200 tracking-wide">AI reply generator</span>
        </div>
        
        <div 
          onClick={() => setIsToneDropdownOpen(!isToneDropdownOpen)}
          className="relative group cursor-pointer px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 border border-slate-700 text-slate-400 flex items-center gap-1 hover:bg-slate-700 transition-colors"
        >
          {selectedTone}
          <ChevronDown className="w-3 h-3" />
          
          {isToneDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-20 py-1">
              {tones.map(t => (
                <div 
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToneSelect(t);
                  }}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3.5 text-[13px] text-slate-300 leading-relaxed font-medium min-h-[100px] relative">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[#0c1222]/80 backdrop-blur-sm z-10">
            <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
            <span className="text-xs text-indigo-400 animate-pulse">Consulting Gemini 2.5 Flash...</span>
          </div>
        ) : null}
        <textarea 
          className="w-full h-full bg-transparent border-none outline-none resize-none text-slate-300 min-h-[120px]"
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          placeholder="AI generated draft will appear here..."
        />
      </div>
      
      <div className="p-3 bg-[#0c1222]">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm border border-slate-500/50"></div>
          <input 
            type="text" 
            value={refinePrompt}
            onChange={(e) => setRefinePrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
            placeholder="Refine Prompt..." 
            className="w-full bg-[#131A2B] border border-slate-700/80 rounded-lg py-2 pl-9 pr-8 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
          <button 
            onClick={handleRefine}
            disabled={isGenerating || !refinePrompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 p-1 disabled:opacity-50 transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

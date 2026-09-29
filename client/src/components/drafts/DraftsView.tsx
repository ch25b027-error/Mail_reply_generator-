import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Sparkles, SlidersHorizontal, HelpCircle, Bell, PanelRight, Loader2, ChevronDown, ArrowUp } from 'lucide-react';
import { useEmail } from '../../context/EmailContext';

export default function DraftsView() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<any | null>(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // AI Writing Studio State
  const [tone, setTone] = useState("Concise & Professional");
  const [refinePrompt, setRefinePrompt] = useState("");
  const [isToneDropdownOpen, setIsToneDropdownOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const tones = ["Concise & Professional", "Friendly & Approchable", "Formal", "Direct"];

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/drafts', { withCredentials: true });
        setDrafts(res.data);
      } catch (err) {
        console.error("Failed to fetch drafts", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  const handleQuickPrompt = async (prompt: string) => {
    console.log("Triggering bulk AI operation on drafts:", prompt);
    // In real app, call /api/ai/command
  };

  const handleRefine = async () => {
    if (!refinePrompt.trim() || !selectedDraft) return;
    setIsGenerating(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/reply', {
        emailContext: selectedDraft,
        tone,
        previousDraft: selectedDraft.body,
        userPrompt: refinePrompt
      }, { withCredentials: true });
      
      setSelectedDraft({ ...selectedDraft, body: res.data.draft });
      setRefinePrompt("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToneSelect = async (t: string) => {
    setTone(t);
    setIsToneDropdownOpen(false);
    if (!selectedDraft) return;
    setIsGenerating(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/reply', {
        emailContext: selectedDraft,
        tone: t,
        previousDraft: selectedDraft.body,
      }, { withCredentials: true });
      setSelectedDraft({ ...selectedDraft, body: res.data.draft });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!selectedDraft) return;
    setIsSending(true);
    try {
      await axios.post('http://localhost:5000/api/emails/send', {
        draftId: selectedDraft.id,
        recipient: selectedDraft.recipient,
        subject: selectedDraft.subject,
        body: selectedDraft.body
      }, { withCredentials: true });
      
      setDrafts(drafts.filter(d => d.id !== selectedDraft.id));
      setSelectedDraft(null);
      alert("Email dispatched successfully!");
    } catch (err) {
      console.error("Failed to send", err);
    } finally {
      setIsSending(false);
    }
  };

  const filteredDrafts = drafts.filter(d => {
    if (filter !== 'All') {
      if (filter === 'AI Drafted' && d.status !== 'AI Drafted') return false;
      if (filter === 'Scheduled' && d.status !== 'Scheduled') return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!d.subject?.toLowerCase().includes(q) && !d.recipient?.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex h-full w-full relative">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6">
        {/* Top Bar */}
        <div className="h-14 flex-shrink-0 flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-100">Drafts</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-slate-200 transition-colors"><HelpCircle className="w-5 h-5" /></button>
            <button className="hover:text-slate-200 transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="hover:text-slate-200 transition-colors"><PanelRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Command Bar */}
        <div className="bg-[#0B1120] rounded-xl border border-slate-800 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg border border-slate-800 p-2 pl-4">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <input 
              type="text" 
              placeholder="Ask AI to organize, draft, summarize, or find anything..." 
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500"
            />
          </div>
          <div className="flex items-center gap-3 mt-4 px-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Quick Prompts</span>
            <div className="flex gap-2">
              <button onClick={() => handleQuickPrompt('Finish priority drafts')} className="px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs text-slate-300 hover:bg-slate-800">Finish priority drafts</button>
              <button onClick={() => handleQuickPrompt('Schedule follow-ups')} className="px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs text-slate-300 hover:bg-slate-800">Schedule follow-ups</button>
              <button onClick={() => handleQuickPrompt('Review unanswered mail')} className="px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs text-slate-300 hover:bg-slate-800">Review unanswered mail</button>
            </div>
          </div>
        </div>
        
        {/* Drafts Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-slate-100">Drafts</h2>
            <span className="text-sm font-medium text-slate-500">{drafts.length} saved messages</span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drafts" 
              className="bg-slate-900/50 border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-12 py-1.5 focus:outline-none focus:border-indigo-500/50 w-64"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4">
          {['All', 'AI Drafted', 'Scheduled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={\`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors \${filter === f ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300' : 'border-slate-800 text-slate-400 hover:bg-slate-800/50'}\`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
          {isLoading ? (
             <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div>
          ) : filteredDrafts.length === 0 ? (
             <div className="py-12 text-center text-slate-500">No drafts found.</div>
          ) : (
            <div className="flex flex-col border border-slate-800/60 rounded-xl overflow-hidden bg-[#0A0F1C]/50">
              {filteredDrafts.map(draft => (
                <div 
                  key={draft.id} 
                  onClick={() => setSelectedDraft(draft)}
                  className={\`flex items-start gap-4 p-4 cursor-pointer border-b border-slate-800/50 transition-colors \${selectedDraft?.id === draft.id ? 'bg-indigo-600/10 border-l-2 border-l-indigo-500' : 'hover:bg-slate-800/30'}\`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {draft.recipient.substring(0,2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-200 truncate">To: {draft.recipient}</span>
                      {draft.status && (
                        <span className={\`text-[10px] px-2 py-0.5 rounded-full \${draft.status === 'AI Drafted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'}\`}>
                          {draft.status}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-slate-300 truncate mb-1">{draft.subject}</div>
                    <div className="text-xs text-slate-500 truncate">{draft.body}</div>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">{draft.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Writing Studio Panel */}
      {selectedDraft && (
        <div className="w-[380px] flex-shrink-0 bg-[#0B1120] border-l border-slate-800 flex flex-col h-full right-0 top-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold text-slate-200">AI Writing Studio</span>
            </div>
            <span className="text-xs text-slate-500">Draft ready for review</span>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            <div className="bg-[#131A2B] rounded-lg p-3 mb-4 border border-slate-800/60">
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Recipient & Context</div>
              <div className="text-sm text-slate-200 font-semibold truncate">{selectedDraft.recipient}</div>
              <div className="text-xs text-slate-400 mt-1 line-clamp-2">{selectedDraft.context}</div>
            </div>

            <div className="rounded-xl border border-indigo-500/40 bg-[#0c1222] overflow-hidden flex flex-col">
              <div className="p-3 border-b border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-200 tracking-wide">AI generated draft</span>
              </div>
              
              <div className="p-3.5 text-[13px] text-slate-300 leading-relaxed font-medium min-h-[200px] relative">
                {isGenerating && (
                  <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[#0c1222]/80 backdrop-blur-sm z-10">
                    <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                  </div>
                )}
                <textarea 
                  className="w-full h-full bg-transparent border-none outline-none resize-none text-slate-300 min-h-[200px]"
                  value={selectedDraft.body}
                  onChange={(e) => setSelectedDraft({...selectedDraft, body: e.target.value})}
                />
              </div>

              <div className="p-3 bg-[#0c1222] border-t border-slate-800/80">
                <div className="mb-2">
                  <div className="text-[10px] text-slate-400 mb-1">Tone</div>
                  <div className="relative inline-block w-full">
                    <div 
                      onClick={() => setIsToneDropdownOpen(!isToneDropdownOpen)}
                      className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-between hover:bg-slate-700 transition-colors"
                    >
                      {tone}
                      <ChevronDown className="w-3 h-3" />
                    </div>
                    {isToneDropdownOpen && (
                      <div className="absolute bottom-full left-0 mb-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg z-20 py-1">
                        {tones.map(t => (
                          <div 
                            key={t}
                            onClick={() => handleToneSelect(t)}
                            className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative group">
                  <input 
                    type="text" 
                    value={refinePrompt}
                    onChange={(e) => setRefinePrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                    placeholder="Refine Prompt..." 
                    className="w-full bg-[#131A2B] border border-slate-700/80 rounded-lg py-2 pl-3 pr-8 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
                  />
                  <button 
                    onClick={handleRefine}
                    disabled={isGenerating || !refinePrompt.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-800 flex gap-3 bg-[#0B1120]">
            <button 
              className="flex-1 py-2 rounded-lg text-sm font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
              onClick={() => console.log('Scheduling via /api/drafts/schedule')}
            >
              Schedule
            </button>
            <button 
              className="flex-1 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center"
              onClick={handleSend}
              disabled={isSending}
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve & Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

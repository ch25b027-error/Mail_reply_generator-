import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, HelpCircle, Bell, PanelRight, Sparkles, Loader2, CheckCircle, Clock, ArrowLeft, X } from 'lucide-react';
import { useEmail } from '../../context/EmailContext';

export default function SentView({ navigateToDrafts, navigateHome }: { navigateToDrafts?: () => void; navigateHome?: () => void }) {
  const [sentEmails, setSentEmails] = useState<any[]>([]);
  const [selectedSentEmail, setSelectedSentEmail] = useState<any | null>(null);
  const [sentFilter, setSentFilter] = useState('All');
  const [sentSearchQuery, setSentSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDraftingFollowUp, setIsDraftingFollowUp] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const { rightPanelWidth, setRightPanelWidth } = useEmail();

  const handleRightDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = rightPanelWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth - (moveEvent.clientX - startX);
      if (newWidth < 300) newWidth = 300;
      if (newWidth > 550) newWidth = 550;
      setRightPanelWidth(newWidth);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/emails/sent', { withCredentials: true });
        setSentEmails(res.data || []);
      } catch (err) {
        console.error("Failed to fetch sent emails", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSent();
  }, []);

  const handleDraftFollowUp = async () => {
    if (!selectedSentEmail) return;
    setIsDraftingFollowUp(true);
    
    try {
      await axios.post('http://localhost:5000/api/ai/reply', {
        emailContext: {
          sender: selectedSentEmail.recipient, 
          subject: selectedSentEmail.subject,
          body: selectedSentEmail.body
        },
        userPrompt: "Draft a polite follow-up email asking for status on this thread",
        tone: "Direct & Professional"
      }, { withCredentials: true });
      
      // The backend generates and saves the draft to MongoDB automatically!
      navigateToDrafts();
    } catch (err) {
      console.error(err);
      alert("Failed to draft follow-up");
    } finally {
      setIsDraftingFollowUp(false);
    }
  };

  const filteredSent = sentEmails.filter(email => {
    if (sentFilter !== 'All') {
      if (sentFilter === 'Delivered' && email.status !== 'Delivered') return false;
      if (sentFilter === 'Opened' && email.status !== 'Opened') return false;
      if (sentFilter === 'Follow-up due' && email.status !== 'Follow-up due') return false;
    }
    if (sentSearchQuery) {
      const q = sentSearchQuery.toLowerCase();
      if (!email.subject?.toLowerCase().includes(q) && !email.recipient?.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex h-full w-full relative">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6">
        <div className="h-14 flex-shrink-0 flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Sent</h1>
            <span className="text-xs text-slate-500">Track delivery, opens, and AI-recommended follow-ups</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-slate-200 transition-colors"><HelpCircle className="w-5 h-5" /></button>
            <button className="hover:text-slate-200 transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="hover:text-slate-200 transition-colors"><PanelRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="bg-[#0B1120] rounded-xl border border-slate-800 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg border border-slate-800 p-2 pl-4">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <input 
              type="text" 
              placeholder="Ask AI to organize, draft, summarize, or find anything..." 
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-2">
              Execute
            </button>
          </div>
          <div className="flex items-center gap-3 mt-4 px-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Quick Prompts</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs text-slate-300 hover:bg-slate-800">Finish priority drafts</button>
              <button className="px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs text-slate-300 hover:bg-slate-800">Schedule follow-ups</button>
              <button className="px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/30 text-xs text-slate-300 hover:bg-slate-800">Review unanswered mail</button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-slate-100">Sent</h2>
            <span className="text-sm font-medium text-slate-500">{sentEmails.length} messages this month</span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={sentSearchQuery}
              onChange={(e) => setSentSearchQuery(e.target.value)}
              placeholder="Search sent mail" 
              className="bg-slate-900/50 border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-4 py-1.5 focus:outline-none focus:border-indigo-500/50 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {['All', 'Delivered', 'Opened', 'Follow-up due'].map(f => (
            <button
              key={f}
              onClick={() => setSentFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${sentFilter === f ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300' : 'border-slate-800 bg-[#0B1120] text-slate-400 hover:bg-slate-800/50'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
          {isLoading ? (
             <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div>
          ) : filteredSent.length === 0 ? (
             <div className="py-12 text-center text-slate-500">No sent emails found. Send an email to see it here!</div>
          ) : (
            <div className="flex flex-col border border-slate-800/60 rounded-xl overflow-hidden bg-[#0A0F1C]/50">
              {filteredSent.map(email => (
                <div 
                  key={email.id} 
                  onClick={() => { setSelectedSentEmail(email); setIsRightPanelOpen(true); }}
                  className={`flex items-start gap-4 p-4 cursor-pointer border-b border-slate-800/50 transition-colors ${selectedSentEmail?.id === email.id ? 'bg-indigo-600/10 border-l-2 border-l-indigo-500' : 'hover:bg-slate-800/30'}`}
                >
                  <div className="pt-1">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" onClick={e => e.stopPropagation()} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {email.recipient.substring(0,2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-200 truncate">To: {email.recipient}</span>
                      {email.status && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          email.status === 'Opened' ? 'bg-emerald-500/20 text-emerald-400' : 
                          email.status === 'Follow-up due' ? 'bg-amber-500/20 text-amber-500' : 
                          'bg-teal-500/20 text-teal-400'
                        }`}>
                          {email.status}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-slate-300 truncate mb-1">{email.subject}</div>
                    <div className="text-xs text-slate-500 truncate line-clamp-1">{email.body}</div>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">{email.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isRightPanelOpen && selectedSentEmail && (
        <>

      <div 
        onMouseDown={handleRightDrag}
        className="w-1 cursor-col-resize hover:bg-indigo-500/50 bg-transparent transition-colors z-50 hidden md:block flex-shrink-0"
      />
        <div style={{ width: `${rightPanelWidth}px` }} className="flex-shrink-0 bg-[#0B1120] border-l border-slate-800 flex flex-col h-full right-0 top-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-200">Message details</div>
              <div className="text-[10px] text-emerald-400 font-medium">Opened by recipient</div>
            </div>
            <button className="text-slate-500 hover:text-slate-300" onClick={() => setSelectedSentEmail(null)}>✕</button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 scrollbar-hide">
            <div className="bg-[#131A2B] rounded-xl p-4 mb-6 border border-slate-800/60">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-slate-200 font-bold mb-1">To: {selectedSentEmail.recipient}</div>
                  <div className="text-[10px] text-slate-500">recipient@example.com</div>
                </div>
                <div className="text-[10px] text-slate-500">{selectedSentEmail.time}</div>
              </div>
              <div className="text-sm text-slate-200 font-bold mb-3">{selectedSentEmail.subject}</div>
              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {selectedSentEmail.body}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Delivery & Activity</div>
              <div className="relative pl-3 border-l border-slate-800 space-y-6 ml-2">
                {(selectedSentEmail.trackingEvents || []).map((event: any, i: number) => (
                  <div key={i} className="relative">
                    <div className="absolute w-2 h-2 rounded-full bg-teal-500 -left-[17px] top-1.5 ring-4 ring-[#0B1120]"></div>
                    <div className="text-xs font-semibold text-slate-200">{event.description}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedSentEmail.status === 'Follow-up due' && selectedSentEmail.aiSuggestion && (
              <div className="rounded-xl border border-teal-500/40 bg-gradient-to-b from-teal-900/20 to-[#0c1222] overflow-hidden mb-4 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-bold text-slate-200">AI follow-up suggestion</span>
                </div>
                <div className="text-[10px] text-teal-400 font-semibold mb-2">{selectedSentEmail.aiSuggestion.recommendedTime}</div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">{selectedSentEmail.aiSuggestion.rationale}</p>
                
                <div className="bg-[#131A2B] rounded-lg p-3 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-200 mb-2">Re: {selectedSentEmail.subject}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{selectedSentEmail.aiSuggestion.preview}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-800 flex gap-3 bg-[#0B1120]">
            <button 
              onClick={handleDraftFollowUp}
              disabled={isDraftingFollowUp}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-2"
            >
              {isDraftingFollowUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Draft Follow-up</>}
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
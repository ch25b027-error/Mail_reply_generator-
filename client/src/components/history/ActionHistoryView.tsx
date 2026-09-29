import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, HelpCircle, Bell, PanelRight, CheckCircle, Clock } from 'lucide-react';

export default function ActionHistoryView({ navigateToDrafts }: { navigateToDrafts: () => void }) {
  const [actions, setActions] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<any | null>(null);
  const [timeFilter, setTimeFilter] = useState('All actions');
  const [searchQuery, setSearchQuery] = useState('');
  const [metrics, setMetrics] = useState({ actionsThisWeek: 0, messagesAffected: 0, timeSaved: '0 hrs', successRate: '0%' });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ai/history', { withCredentials: true });
        setActions(res.data.actions || []);
        setMetrics(res.data.metrics || { actionsThisWeek: 38, messagesAffected: 216, timeSaved: '3.4 hrs', successRate: '98.7%' });
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, []);

  const filteredActions = actions.filter(a => {
    if (timeFilter !== 'All actions') {
      if (timeFilter === 'Completed' && a.status !== 'Completed') return false;
      if (timeFilter === 'Awaiting approval' && a.status !== 'Awaiting approval') return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!a.title?.toLowerCase().includes(q) && !a.description?.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex h-full w-full relative">
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-6">
        {/* Top Bar */}
        <div className="h-14 flex-shrink-0 flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">AI Action History</h1>
            <span className="text-xs text-slate-500">Review every Gemini action across your inbox.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-slate-200 transition-colors"><HelpCircle className="w-5 h-5" /></button>
            <button className="hover:text-slate-200 transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="hover:text-slate-200 transition-colors"><PanelRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">Actions this week</div>
            <div className="text-2xl font-bold text-white">{metrics.actionsThisWeek}</div>
          </div>
          <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">Messages affected</div>
            <div className="text-2xl font-bold text-white">{metrics.messagesAffected}</div>
          </div>
          <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">Time saved</div>
            <div className="text-2xl font-bold text-white">{metrics.timeSaved}</div>
          </div>
          <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">Success rate</div>
            <div className="text-2xl font-bold text-white">{metrics.successRate}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {['All actions', 'Completed', 'Awaiting approval', 'Last 7 days'].map(f => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={\`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors \${timeFilter === f ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300' : 'border-slate-800 bg-[#0B1120] text-slate-400 hover:bg-slate-800/50'}\`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search actions" 
              className="bg-[#0B1120] border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-12 py-1.5 focus:outline-none focus:border-indigo-500/50 w-64"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-500">⌘K</div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
          <div className="flex flex-col gap-2">
            {filteredActions.map(action => (
              <div 
                key={action.id} 
                onClick={() => setSelectedAction(action)}
                className={\`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-colors \${selectedAction?.id === action.id ? 'bg-indigo-600/10 border-indigo-500/40' : 'bg-[#0B1120] border-slate-800 hover:border-slate-700'}\`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 text-sm">{action.title}</div>
                    <div className="text-xs text-slate-500">{action.description} • Gemini 3.8</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={\`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full \${action.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}\`}>
                    {action.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {action.status}
                  </div>
                  <div className="text-xs text-slate-500 w-24 text-right">{action.time}</div>
                </div>
              </div>
            ))}
            {filteredActions.length === 0 && (
              <div className="py-12 text-center text-slate-500">No actions found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Action Preview Drawer */}
      {selectedAction && (
        <div className="w-[400px] flex-shrink-0 bg-[#0B1120] border-l border-slate-800 flex flex-col h-full right-0 top-0">
          <div className="p-6 overflow-y-auto flex-1">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Action Preview</div>
            <h2 className="text-xl font-bold text-slate-100 mb-1">{selectedAction.title}</h2>
            <div className="text-xs text-slate-500 mb-6">{selectedAction.time} • {selectedAction.messagesAffected || 1} message affected</div>

            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Gemini Response</div>
            <div className="bg-[#131A2B] border border-indigo-500/30 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">{selectedAction.previewSubject || 'Re: Draft'}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{selectedAction.previewBody || selectedAction.description}</p>
            </div>
            
            {selectedAction.status === 'Awaiting approval' && (
              <>
                <p className="text-xs text-slate-500 mb-4">Used thread context and your concise, professional tone preference. No message was sent; approval is still required.</p>
                <button 
                  onClick={navigateToDrafts}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  Review draft
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

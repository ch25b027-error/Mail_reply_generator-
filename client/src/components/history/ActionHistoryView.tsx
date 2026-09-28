import React, { useState } from 'react';
import ActionLogitem from './ActionLogitem';
import { Search } from 'lucide-react';

export default function ActionHistoryView() {
  const [timeFilter, setTimeFilter] = useState('Last 7 days');
  
  const stats = [
    { label: 'Actions this week', value: '38' },
    { label: 'Messages affected', value: '216' },
    { label: 'Time saved', value: '3.4 hrs' },
    { label: 'Success rate', value: '98.7%' },
  ];

  const logs = [
    {
      id: '1',
      title: 'Auto-sorted inbox by priority',
      meta: '147 messages affected · Gemini 1.5',
      status: 'Completed',
      statusColor: 'text-emerald-400',
      time: 'Today, 9:48 AM',
      iconColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: '2',
      title: 'Drafted reply to Maya Chen',
      meta: '1 message affected · Gemini 1.5',
      status: 'Awaiting approval',
      statusColor: 'text-indigo-400',
      time: 'Today, 9:43 AM',
      iconColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      isPending: true
    }
  ];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">AI Action History</h1>
          <p className="text-sm text-slate-500 mt-1">Review every Gemini action across your inbox.</p>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-slate-200">?</button>
          <button className="hover:text-slate-200">🔔</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0B1120] border border-slate-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs text-slate-500 font-medium mb-2">{stat.label}</h3>
            <div className="text-3xl font-bold text-slate-100">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-4">
        <div className="flex gap-2">
          {['All actions', 'Completed', 'Awaiting approval', 'Last 7 days'].map(tab => (
            <button
              key={tab}
              onClick={() => { if (tab === 'Last 7 days' || tab === 'All time') setTimeFilter(tab); }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                (tab === 'Last 7 days' && timeFilter === 'Last 7 days') || tab === 'All actions'
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search actions" 
            className="bg-[#0B1120] border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-12 py-1.5 focus:outline-none focus:border-indigo-500/50 w-64"
          />
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-340px)]">
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
          {logs.map(log => (
            <ActionLogitem key={log.id} {...log} />
          ))}
        </div>
        
        {/* Right side preview panel placeholder */}
        <div className="w-[320px] bg-[#0B1120] border border-slate-800 rounded-xl p-5 flex-shrink-0">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Action Preview</h4>
          <h3 className="text-lg font-bold text-slate-200 mb-1">Drafted reply to Maya Chen</h3>
          <p className="text-xs text-slate-500 mb-6">Today, 9:43 AM · 1 message affected</p>
          
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gemini Response</h5>
            <div className="border border-indigo-500/30 rounded-lg p-3 bg-indigo-900/10 text-xs text-slate-300">
              <span className="font-semibold text-slate-200 block mb-2">Re: Q4 launch plan - final review</span>
              Hi Maya, confirmed - the revised rollout dates look good...
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold transition-colors">
              Review draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

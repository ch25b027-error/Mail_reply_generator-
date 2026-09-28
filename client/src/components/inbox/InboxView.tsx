import React, { useState } from 'react';
import QuickPrompts from '../header/QuickPrompts';
import FilterTabs from './FilterTabs';
import EmailList from './EmailList';
import { Search, SlidersHorizontal, HelpCircle, Bell, PanelRight } from 'lucide-react';

export default function InboxView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Nexus Mail Top Bar (Moved from old CommonBar) */}
      <div className="h-14 flex-shrink-0 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm">Nexus Mail</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-slate-200 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="hover:text-slate-200 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hover:text-slate-200 transition-colors">
            <PanelRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <QuickPrompts />
      
      <div className="flex items-center justify-between mb-6 mt-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-bold text-slate-100">Inbox</h1>
          <span className="text-sm font-medium text-slate-500">24 conversations</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mail" 
              className="bg-slate-900/50 border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-12 py-1.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 w-64 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-500 flex gap-0.5 pointer-events-none">
              <span className="bg-slate-800 px-1 rounded">⌘</span>
              <span className="bg-slate-800 px-1 rounded">K</span>
            </div>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg hover:bg-slate-800/50 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
        <EmailList activeFilter={activeFilter} searchQuery={searchQuery} />
      </div>
    </div>
  );
}

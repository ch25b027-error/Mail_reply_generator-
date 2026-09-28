import React from 'react';
import QuickPrompts from '../header/QuickPrompts';
import FilterTabs from './FilterTabs';
import EmailList from './EmailList';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function InboxView() {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
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
              placeholder="Search mail" 
              className="bg-slate-900/50 border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-12 py-1.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 w-64 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-500 flex gap-0.5">
              <span className="bg-slate-800 px-1 rounded">⌘</span>
              <span className="bg-slate-800 px-1 rounded">K</span>
            </div>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg hover:bg-slate-800/50 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <FilterTabs />
      
      <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
        <EmailList />
      </div>
    </div>
  );
}

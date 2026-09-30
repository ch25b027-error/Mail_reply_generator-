import React, { useState } from 'react';
import QuickPrompts from '../header/QuickPrompts';
import FilterTabs from './FilterTabs';
import EmailList from './EmailList';
import Intelligenceview from '../intelligence/Intelligenceview';
import AnalyzingModal from '../intelligence/AnalyzingModal';
import { useEmail } from '../../context/EmailContext';
import { Search, SlidersHorizontal, HelpCircle, Bell, PanelRight, X, Sparkles, ChevronLeft } from 'lucide-react';

export default function InboxView() {
  
  const [activeFilter, setActiveFilter] = useState('all');
  const { isAnalyzingInbox, globalSearchQuery, setGlobalSearchQuery, setSelectedCategory, isAssistantOpen, setIsAssistantOpen } = useEmail();

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative">
      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 py-3 px-1.5 bg-[#0c1222] hover:bg-[#131b2e] border-l border-t border-b border-slate-800/80 rounded-l-xl text-slate-400 hover:text-slate-200 transition-all z-20 shadow-xl group"
          title="Open AI Assistant"
        >
          <ChevronLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-semibold tracking-wider uppercase text-slate-400 group-hover:text-slate-200">
            AI Assistant
          </span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 mt-1" />
        </button>
      )}

      {isAnalyzingInbox && <AnalyzingModal />}
      
      {/* Nexus Mail Top Bar */}
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
          <button
            onClick={() => setIsAssistantOpen((open) => !open)}
            className="hover:text-slate-200 transition-colors"
            title={isAssistantOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
            aria-label={isAssistantOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
          >
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
          {(globalSearchQuery.trim()) && (
            <button
              onClick={() => {
                setGlobalSearchQuery('');
                setSelectedCategory('all');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all animate-in fade-in duration-150"
            >
              <X className="w-3.5 h-3.5" /> Clear Search
            </button>
          )}
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
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
        <EmailList activeFilter={activeFilter} searchQuery={globalSearchQuery} />
      </div>
    </div>
  );
}

import React from 'react';

interface FilterTabsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterTabs({ activeFilter, setActiveFilter }: FilterTabsProps) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'ai-sorted', label: 'AI Sorted - Priority' },
    { id: 'needs-reply', label: 'Needs Reply' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'archived', label: 'Archived' },
  ];

  return (
    <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
              activeFilter === tab.id
                ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300'
                : 'border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs font-medium text-slate-400 ml-4 flex-shrink-0">
        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
          <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" />
          Select all
        </label>
        <button className="hover:text-slate-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

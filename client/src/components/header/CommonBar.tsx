import React from 'react';
import { HelpCircle, Bell, PanelRight } from 'lucide-react';

export default function CommonBar() {
  return (
    <div className="h-14 flex-shrink-0 flex items-center justify-between px-6">
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
  );
}

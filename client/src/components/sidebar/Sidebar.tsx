import React from 'react';
import { Inbox, History, Send, FileEdit, Settings } from 'lucide-react';
import UserProfile from './UserProfile';
import FolderList from './FolderList';
import EngineStatus from './EngineStatus';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: '24' },
    { id: 'history', label: 'AI Action History', icon: History },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: FileEdit, badge: '3' },
  ];

  return (
    <aside className="w-[280px] flex-shrink-0 flex flex-col h-full bg-[#0B1120] border-r border-slate-800">
      <UserProfile />
      
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <FolderList />
      </div>

      <div className="mt-auto">
        <button className="flex items-center gap-3 px-7 py-4 w-full text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors mb-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <EngineStatus />
      </div>
    </aside>
  );
}

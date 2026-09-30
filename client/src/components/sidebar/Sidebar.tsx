import React, { useState } from 'react';
import { Inbox, History, Send, FileEdit, Settings, Menu } from 'lucide-react';
import UserProfile from './UserProfile';
import FolderList from './FolderList';
import EngineStatus from './EngineStatus';
import { useEmail } from '../../context/EmailContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { emails, setSelectedCategory, leftSidebarWidth } = useEmail();

  const navItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: emails.length > 0 ? emails.length.toString() : '' },
    { id: 'history', label: 'AI Action History', icon: History },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: FileEdit, badge: '3' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-md text-slate-200"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside style={{ width: leftSidebarWidth ? `${leftSidebarWidth}px` : undefined }} className={`w-full md:w-auto flex-shrink-0 flex flex-col h-full bg-[#0B1120] border-r border-slate-800 transition-transform duration-300 z-40 fixed md:relative ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <UserProfile />
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileOpen(false); if (item.id === 'inbox') setSelectedCategory('all'); }}
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

          <FolderList activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="mt-auto">
          <button className="flex items-center gap-3 px-7 py-4 w-full text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors mb-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <EngineStatus />
        </div>
      </aside>
    </>
  );
}

import React, { useState } from 'react';
import { Circle } from 'lucide-react';

interface FolderListProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function FolderList({ activeTab: externalActiveTab, setActiveTab: externalSetActiveTab }: FolderListProps) {
  const [localActiveTab, setLocalActiveTab] = useState<string>('');
  
  const currentTab = externalActiveTab || localActiveTab;
  const setTab = externalSetActiveTab || setLocalActiveTab;

  const folders = [
    { id: 'priority', label: 'Priority', count: 8 },
    { id: 'work', label: 'Work', count: 12 },
    { id: 'newsletters', label: 'Newsletters', count: 31 },
    { id: 'receipts', label: 'Receipts', count: 0 },
  ];

  return (
    <div className="px-3 mt-4">
      <div className="px-3 mb-2">
        <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Categories / Folders
        </h3>
      </div>
      <div className="space-y-0.5">
        {folders.map((folder) => {
          const isActive = currentTab === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => setTab(folder.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-400' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Circle className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{folder.label}</span>
              </div>
              {folder.count > 0 && (
                <span className={`text-xs ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>{folder.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

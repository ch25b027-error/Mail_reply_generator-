import React from 'react';
import { Circle } from 'lucide-react';
import { useEmail } from '../../context/EmailContext';

interface FolderListProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function FolderList({ setActiveTab }: FolderListProps) {
  const { emails, selectedCategory, setSelectedCategory } = useEmail();

  const categoryCounts = {
    priority: emails.filter(e => e.category === 'priority' || e.isPriority).length,
    work: emails.filter(e => e.category === 'work').length,
    newsletters: emails.filter(e => e.category === 'newsletters').length,
    receipts: emails.filter(e => e.category === 'receipts').length,
  };

  const folders = [
    { id: 'priority', label: 'Priority', count: categoryCounts.priority },
    { id: 'work', label: 'Work', count: categoryCounts.work },
    { id: 'newsletters', label: 'Newsletters', count: categoryCounts.newsletters },
    { id: 'receipts', label: 'Receipts', count: categoryCounts.receipts },
  ];

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
    if (setActiveTab) {
      setActiveTab('inbox');
    }
  };

  return (
    <div className="px-3 mt-4">
      <div className="px-3 mb-2 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleCategoryClick('all')}>
          Categories / Folders
        </h3>
      </div>
      <div className="space-y-0.5">
        {folders.map((folder) => {
          const isActive = selectedCategory === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => handleCategoryClick(folder.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-indigo-900/30 text-indigo-400 font-medium' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium'
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

import React from 'react';
import { Circle } from 'lucide-react';

export default function FolderList() {
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
        {folders.map((folder) => (
          <button
            key={folder.id}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Circle className="w-4 h-4 text-slate-500" />
              <span>{folder.label}</span>
            </div>
            {folder.count > 0 && (
              <span className="text-xs text-slate-500">{folder.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

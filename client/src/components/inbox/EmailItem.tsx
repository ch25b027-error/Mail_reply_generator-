import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Clock, MoreHorizontal, Trash2 } from 'lucide-react';

interface EmailItemProps {
  initials: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  tag?: string;
  tagColor?: string;
  isActive?: boolean;
}

export default function EmailItem({ initials, sender, subject, preview, time, tag, tagColor, isActive }: EmailItemProps) {
  return (
    <div className={`group flex items-start gap-4 p-4 border-b border-slate-800/50 hover:bg-[#121A2F] transition-colors cursor-pointer ${isActive ? 'bg-[#121A2F] border-l-2 border-l-indigo-500' : 'border-l-2 border-l-transparent'}`}>
      <div className="pt-1">
        <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" />
      </div>
      <Avatar className="h-9 w-9 bg-slate-800 flex-shrink-0 mt-0.5">
        <AvatarFallback className="bg-slate-800 text-slate-300 text-xs font-semibold">{initials}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-slate-200">{sender}</span>
            {tag && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tagColor}`}>
                {tag}
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 font-medium group-hover:hidden">{time}</span>
          <div className="hidden group-hover:flex items-center gap-2 text-slate-400">
            <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-700"><Trash2 className="w-4 h-4" /></button>
            <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-700"><Clock className="w-4 h-4" /></button>
            <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-700"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="text-sm">
          <span className="text-slate-200 font-medium mr-2">{subject}</span>
          <span className="text-slate-400 truncate">- {preview}</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function UserProfile() {
  return (
    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/30 transition-colors mt-2 mb-2">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 bg-indigo-600">
          <AvatarFallback className="text-white font-medium bg-indigo-600">AM</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-slate-200">Alex Morgan</span>
          <span className="text-xs text-slate-500">alex@gmail.com · Connected</span>
        </div>
      </div>
      <ChevronDown className="w-4 h-4 text-slate-500" />
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useAuth } from '../../context/AuthContext';

export default function UserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="relative">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/30 transition-colors mt-2 mb-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-indigo-600">
            <AvatarFallback className="text-white font-medium bg-indigo-600">{user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-200">{user.name}</span>
            <span className="text-xs text-slate-500">{user.email} · Connected</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-4 right-4 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 transition-colors">
            <Settings className="w-4 h-4" /> Account Settings
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-slate-800 transition-colors border-t border-slate-800"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

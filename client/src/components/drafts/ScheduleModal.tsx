import React, { useState } from 'react';
import { X, Clock, Calendar } from 'lucide-react';

interface ScheduleModalProps {
  onClose: () => void;
  onConfirm: (time: string) => void;
}

export default function ScheduleModal({ onClose, onConfirm }: ScheduleModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleConfirm = () => {
    if (date && time) {
      onConfirm(`${date} at ${time}`);
    } else {
      // Fallback if they just hit confirm without setting anything
      onConfirm("Tomorrow at 9:00 AM");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-sm">
      <div className="bg-[#0B1120] border border-slate-800 rounded-xl w-[400px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Schedule Draft
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <button onClick={() => onConfirm("Tomorrow at 9:00 AM")} className="w-full text-left px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700/50 transition-colors">
              Tomorrow at 9:00 AM
            </button>
            <button onClick={() => onConfirm("Monday at 8:00 AM")} className="w-full text-left px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700/50 transition-colors">
              Monday at 8:00 AM
            </button>
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">OR Custom</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-[#131A2B] border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 color-scheme-dark"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="time" 
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-[#131A2B] border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 color-scheme-dark"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

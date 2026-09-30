import React from 'react';
import { X, Check } from 'lucide-react';
import { type Email } from '../../context/EmailContext';

interface FullEmailModalProps {
  email: Email;
  onClose: () => void;
}

export default function FullEmailModal({ email, onClose }: FullEmailModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#0B1120] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        
        <div className="p-5 border-b border-slate-800/80 bg-[#121A2F]/50">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-lg border border-slate-700">
                {email.initials || email.sender.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">{email.sender}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>To: me@company.com</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>{new Date().toLocaleDateString()} at {email.time}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-slate-100 px-1">{email.subject}</h2>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
          {email.body || email.preview}
        </div>

        <div className="p-4 border-t border-slate-800/80 bg-[#121A2F]/50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 rounded-xl transition-colors border border-slate-700"
          >
            Close
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Use as Draft Context
          </button>
        </div>
      </div>
    </div>
  );
}

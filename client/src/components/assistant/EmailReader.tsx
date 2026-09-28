import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type Email } from '../../context/EmailContext';

interface EmailReaderProps {
  email?: Email;
}

export default function EmailReader({ email }: EmailReaderProps) {
  const [showFullHeaders, setShowFullHeaders] = useState(false);

  if (!email) return null;

  return (
    <div className="border-t border-b border-slate-800/50 py-5 -mx-4 px-4 bg-[#0A0F1C]/30">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-[13px] font-semibold text-slate-300">{email.sender}</h4>
            <button 
              onClick={() => setShowFullHeaders(!showFullHeaders)}
              className="text-slate-500 hover:text-slate-300"
            >
              {showFullHeaders ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
          <h5 className="text-[13px] font-bold text-slate-100 mt-1">{email.subject}</h5>
          
          {showFullHeaders && (
            <div className="mt-2 p-2 bg-slate-900/50 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div><span className="font-medium text-slate-500">From:</span> {email.sender.toLowerCase().replace(' ', '.')}@example.com</div>
              <div><span className="font-medium text-slate-500">To:</span> alex@gmail.com</div>
              <div><span className="font-medium text-slate-500">Date:</span> {new Date().toLocaleDateString()} {email.time}</div>
            </div>
          )}
        </div>
        <span className="text-[11px] text-slate-500 font-medium mt-0.5">{email.time}</span>
      </div>
      <p className="text-[13px] text-slate-400 leading-relaxed whitespace-pre-wrap">
        {email.body || email.preview}
      </p>
    </div>
  );
}

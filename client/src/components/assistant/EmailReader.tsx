import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { type Email } from '../../context/EmailContext';
import FullEmailModal from './FullEmailModal';

interface EmailReaderProps {
  email?: Email;
}

export default function EmailReader({ email }: EmailReaderProps) {
  const [showFullEmail, setShowFullEmail] = useState(false);

  if (!email) return null;

  return (
    <>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 mb-3 flex-shrink-0 relative overflow-hidden">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-semibold text-sm text-slate-200 line-clamp-1 pr-2">{email.sender}</h4>
          <span className="text-[11px] text-slate-500 font-medium flex-shrink-0">{email.time}</span>
        </div>
        <h5 className="font-bold text-[13px] text-slate-300 line-clamp-1">{email.subject}</h5>
        
        <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
          {email.body || email.preview}
        </p>
        
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => setShowFullEmail(true)}
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors px-2 py-1 bg-indigo-500/10 rounded-lg hover:bg-indigo-500/20 border border-transparent hover:border-indigo-500/30"
          >
            View Full Email <Maximize2 className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>
      {showFullEmail && <FullEmailModal email={email} onClose={() => setShowFullEmail(false)} />}
    </>
  );
}

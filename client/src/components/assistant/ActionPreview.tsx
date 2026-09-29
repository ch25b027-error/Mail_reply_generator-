import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ActionPreviewProps {
  actionTitle: string;
  actionDetails: string;
}

export default function ActionPreview({ actionTitle, actionDetails }: ActionPreviewProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
          <AlertCircle className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-200">{actionTitle}</h4>
          <p className="text-xs text-slate-400 mt-1">{actionDetails}</p>
        </div>
      </div>
      
      {!isConfirmed ? (
        <div className="flex gap-2 justify-end mt-4">
          <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => setIsConfirmed(true)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium transition-colors"
          >
            Confirm Action
          </button>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-md">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-medium">Action confirmed and executed</span>
        </div>
      )}
    </div>
  );
}

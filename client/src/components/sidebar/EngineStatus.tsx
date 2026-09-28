import React, { useState } from 'react';

export default function EngineStatus() {
  const [status, setStatus] = useState<'Online' | 'Processing' | 'Error'>('Online');

  return (
    <div className="px-4 py-3 rounded-xl border border-teal-900/40 bg-[#0B1520] flex flex-col gap-1 mx-4 mb-4 cursor-pointer" onClick={() => setStatus(status === 'Online' ? 'Processing' : 'Online')}>
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${
          status === 'Online' ? 'bg-teal-500' : status === 'Processing' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'
        }`}></div>
        <span className="text-[13px] font-semibold text-slate-200">
          AI Engine: {status}
        </span>
      </div>
      <span className={`text-[11px] font-medium ${
        status === 'Online' ? 'text-teal-500' : status === 'Processing' ? 'text-amber-500' : 'text-red-500'
      }`}>
        {status === 'Processing' ? 'Gemini is thinking...' : 'Gemini 1.5 - Ready'}
      </span>
    </div>
  );
}

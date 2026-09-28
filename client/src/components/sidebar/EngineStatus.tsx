import React from 'react';

export default function EngineStatus() {
  return (
    <div className="px-4 py-3 rounded-xl border border-teal-900/40 bg-[#0B1520] flex flex-col gap-1 mx-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
        <span className="text-[13px] font-semibold text-slate-200">AI Engine: Online</span>
      </div>
      <span className="text-[11px] text-teal-500 font-medium">Gemini 1.5 - Ready</span>
    </div>
  );
}

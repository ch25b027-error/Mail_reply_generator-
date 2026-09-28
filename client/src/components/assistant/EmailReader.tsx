import React from 'react';

export default function EmailReader() {
  return (
    <div className="border-t border-b border-slate-800/50 py-5 -mx-4 px-4 bg-[#0A0F1C]/30">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-[13px] font-semibold text-slate-300">Maya Chen</h4>
          <h5 className="text-[13px] font-bold text-slate-100 mt-1">Q4 launch plan - final review</h5>
        </div>
        <span className="text-[11px] text-slate-500 font-medium mt-0.5">9:42 AM</span>
      </div>
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Hi Alex, can you confirm the revised rollout dates before our 3 PM sync? 
        I've incorporated product feedback and moved the beta announcement to October 14.
      </p>
    </div>
  );
}

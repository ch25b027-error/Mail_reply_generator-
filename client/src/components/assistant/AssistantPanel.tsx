import React from 'react';

interface AssistantPanelProps {
  onClose?: () => void;
}

export default function AssistantPanel({ onClose }: AssistantPanelProps) {
  return (
    <div className="w-[320px] flex-shrink-0 border-l border-slate-800 bg-[#0B1120] p-4 text-slate-400 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span>Assistant Panel Placeholder</span>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded">
            X
          </button>
        )}
      </div>
    </div>
  );
}

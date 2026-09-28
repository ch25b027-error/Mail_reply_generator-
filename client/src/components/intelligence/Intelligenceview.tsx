import React, { useState } from 'react';
import ActionCard from './ActionCard';
import AnalyzingModal from './AnalyzingModal';
import { Sparkles, ArrowRight, InboxIcon } from 'lucide-react';

export default function Intelligenceview() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const workflows = [
    { id: 'sort', title: 'Auto-Sort Inbox', desc: 'Group messages by priority, intent, and category.', icon: 'filter' },
    { id: 'newsletters', title: 'Mark Newsletters as Read', desc: 'Clean up low-priority subscriptions in one pass.', icon: 'check-circle' },
    { id: 'follow-up', title: 'Draft Follow-up Email', desc: 'Create a concise follow-up from recent context.', icon: 'edit' },
    { id: 'open-requests', title: 'Find open requests', desc: 'Surface emails where someone is waiting on you.', icon: 'search' },
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full items-center justify-center relative">
      <AnalyzingModal />
      
      <div className="mb-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#0c1222] border border-slate-700/50 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10">
          <InboxIcon className="w-8 h-8 text-indigo-400" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">What should we work on?</h1>
        <p className="text-slate-400">Ask Gemini to organize your inbox, draft a reply, summarize a thread, or start with a suggested prompt.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
        {workflows.map(wf => (
          <ActionCard 
            key={wf.id}
            title={wf.title}
            description={wf.desc}
            iconName={wf.icon}
            isSelected={selectedWorkflow === wf.id}
            onClick={() => setSelectedWorkflow(wf.id)}
          />
        ))}
      </div>
    </div>
  );
}

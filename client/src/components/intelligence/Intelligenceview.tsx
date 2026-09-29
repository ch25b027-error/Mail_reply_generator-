import React, { useState } from 'react';
import axios from 'axios';
import ActionCard from './ActionCard';
import { Sparkles, ArrowRight, InboxIcon, ArrowLeft, Loader2 } from 'lucide-react';
import { useEmail } from '../../context/EmailContext';

export default function Intelligenceview() {
  const { setShowIntelligenceDashboard } = useEmail();
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const workflows = [
    { id: 'sort', title: 'Auto-Sort Inbox', desc: 'Group messages by priority, intent, and category.', icon: 'filter' },
    { id: 'newsletters', title: 'Mark Newsletters as Read', desc: 'Clean up low-priority subscriptions in one pass.', icon: 'check-circle' },
    { id: 'follow-up', title: 'Draft Follow-up Email', desc: 'Create a concise follow-up from recent context.', icon: 'edit' },
    { id: 'open-requests', title: 'Find open requests', desc: 'Surface emails where someone is waiting on you.', icon: 'search' },
  ];

  const handleCardClick = async (actionId: string, actionTitle: string) => {
    setSelectedWorkflow(actionId);
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/ai/command', {
        prompt: actionTitle
      }, { withCredentials: true });
      
      // Successfully processed command, go back to inbox
      setShowIntelligenceDashboard(false);
    } catch (err) {
      console.error("Failed to execute AI command", err);
    } finally {
      setIsLoading(false);
      setSelectedWorkflow(null);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative py-6">
      
      <button 
        onClick={() => setShowIntelligenceDashboard(false)}
        className="self-start flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Inbox
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-[#0c1222] border border-slate-700/50 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10">
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            ) : (
              <InboxIcon className="w-8 h-8 text-indigo-400" strokeWidth={1.5} />
            )}
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
              onClick={() => handleCardClick(wf.id, wf.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import InboxView from '../components/inbox/InboxView';
import DraftsView from '../components/drafts/DraftsView';
import ActionHistoryView from '../components/history/ActionHistoryView';
import AssistantPanel from '../components/assistant/AssistantPanel';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#030712] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 bg-[#060a16]">
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto min-w-0 p-6 flex">
            {activeTab === 'inbox' && <InboxView />}
            {activeTab === 'drafts' && <DraftsView />}
            {activeTab === 'history' && <ActionHistoryView navigateToDrafts={() => setActiveTab('drafts')} />}
            
            {activeTab !== 'inbox' && activeTab !== 'drafts' && activeTab !== 'history' && (
              <div className="text-slate-400 p-4 border border-slate-800 rounded-lg m-auto">
                {activeTab} View Placeholder
              </div>
            )}
          </main>
          
          {/* Assistant Panel is only for Inbox right now (since Drafts/History have their own right panels) */}
          {activeTab === 'inbox' && isAssistantOpen && (
            <AssistantPanel onClose={() => setIsAssistantOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

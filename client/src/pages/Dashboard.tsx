import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import InboxView from '../components/inbox/InboxView';
import CommonBar from '../components/header/CommonBar';
import AssistantPanel from '../components/assistant/AssistantPanel';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#030712] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 bg-[#060a16]">
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto min-w-0 p-6">
            {activeTab === 'inbox' && <InboxView />}
            {activeTab !== 'inbox' && (
              <div className="text-slate-400 p-4 border border-slate-800 rounded-lg">
                {activeTab} View Placeholder
              </div>
            )}
          </main>
          
          {isAssistantOpen && (
            <AssistantPanel onClose={() => setIsAssistantOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

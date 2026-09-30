import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import InboxView from '../components/inbox/InboxView';
import DraftsView from '../components/drafts/DraftsView';
import SentView from '../components/sent/SentView';
import ActionHistoryView from '../components/history/ActionHistoryView';
import AssistantPanel from '../components/assistant/AssistantPanel';
import { useEmail } from '../context/EmailContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('inbox');
  const { isAssistantOpen, setIsAssistantOpen, leftSidebarWidth, setLeftSidebarWidth, rightPanelWidth, setRightPanelWidth } = useEmail();

  const handleLeftDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftSidebarWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 320) newWidth = 320;
      setLeftSidebarWidth(newWidth);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleRightDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = rightPanelWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth - (moveEvent.clientX - startX); // Negative because dragging left increases width
      if (newWidth < 300) newWidth = 300;
      if (newWidth > 550) newWidth = 550;
      setRightPanelWidth(newWidth);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="flex h-screen w-full bg-[#030712] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div 
        onMouseDown={handleLeftDrag}
        className="w-1 cursor-col-resize hover:bg-indigo-500/50 bg-transparent transition-colors z-50 hidden md:block"
      />
      
      <div className="flex-1 flex flex-col min-w-0 bg-[#060a16]">
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto min-w-0 p-6 flex">
            {activeTab === 'inbox' && <InboxView />}
            {activeTab === 'drafts' && <DraftsView navigateHome={() => setActiveTab('inbox')} />}
            {activeTab === 'sent' && <SentView navigateToDrafts={() => setActiveTab('drafts')} navigateHome={() => setActiveTab('inbox')} />}
            {activeTab === 'history' && <ActionHistoryView navigateToDrafts={() => setActiveTab('drafts')} navigateHome={() => setActiveTab('inbox')} />}
            
            {activeTab !== 'inbox' && activeTab !== 'drafts' && activeTab !== 'history' && activeTab !== 'sent' && (
              <div className="text-slate-400 p-4 border border-slate-800 rounded-lg m-auto">
                {activeTab} View Placeholder
              </div>
            )}
          </main>
          
          {/* Assistant Panel is only for Inbox right now (since Drafts/History have their own right panels) */}
          {activeTab === 'inbox' && isAssistantOpen && (
            <>
              <div 
                onMouseDown={handleRightDrag}
                className="w-1 cursor-col-resize hover:bg-indigo-500/50 bg-transparent transition-colors z-50 hidden md:block"
              />
              <AssistantPanel onClose={() => setIsAssistantOpen(false)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
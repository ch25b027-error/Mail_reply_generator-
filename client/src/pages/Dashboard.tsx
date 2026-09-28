import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import AssistantPanel from '../components/assistant/AssistantPanel';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract active tab from URL path
  const pathParts = location.pathname.split('/');
  const activeTab = pathParts[pathParts.length - 1] || 'inbox';
  
  return (
    <div className="flex h-screen w-full bg-[#030712] text-slate-200 overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => navigate(`/dashboard/${tab}`)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 bg-[#060a16]">
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto min-w-0 p-6 relative">
            <Outlet />
          </main>
          
          <AssistantPanel />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import InboxView from './components/inbox/InboxView';
import ActionHistoryView from './components/history/ActionHistoryView';
import Intelligenceview from './components/intelligence/Intelligenceview';
import { AuthProvider } from './context/AuthContext';
import { EmailProvider } from './context/EmailContext';

function App() {
  return (
    <AuthProvider>
      <EmailProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="inbox" replace />} />
              <Route path="inbox" element={<InboxView />} />
              <Route path="history" element={<ActionHistoryView />} />
              <Route path="priority" element={<Intelligenceview />} />
              <Route path="work" element={<Intelligenceview />} />
              <Route path="newsletters" element={<Intelligenceview />} />
              {/* Fallback for unbuilt sections */}
              <Route path="*" element={<div className="p-6 text-slate-400">View coming soon...</div>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </EmailProvider>
    </AuthProvider>
  );
}

export default App;
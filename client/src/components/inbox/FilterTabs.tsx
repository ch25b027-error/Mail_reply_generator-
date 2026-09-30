import React from 'react';
import axios from 'axios';
import { useEmail } from '../../context/EmailContext';
import { MailOpen, Trash2 } from 'lucide-react';

interface FilterTabsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterTabs({ activeFilter, setActiveFilter }: FilterTabsProps) {
  const { emails, setEmails, selectedEmailIds, setSelectedEmailIds, globalSearchQuery } = useEmail();
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'ai-sorted', label: 'AI Sorted - Priority' },
    { id: 'needs-reply', label: 'Needs Reply' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'archived', label: 'Archived' },
  ];

  const filteredEmails = emails.filter(email => {
    if (globalSearchQuery && globalSearchQuery.trim()) {
      const query = globalSearchQuery.toLowerCase();
      const matchesSearch = 
        email.subject.toLowerCase().includes(query) || 
        email.sender.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query) ||
        (email.body && email.body.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }
    if (activeFilter === 'needs-reply' && !email.subject.toLowerCase().includes('?')) return false;
    if (activeFilter === 'promotions' && !email.sender.toLowerCase().includes('marketing')) return false;
    return true;
  });

  const allSelected = filteredEmails.length > 0 && selectedEmailIds.length === filteredEmails.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmailIds(filteredEmails.map(email => email.id));
    } else {
      setSelectedEmailIds([]);
    }
  };

  const handleMarkRead = async () => {
    try {
      await axios.post('http://localhost:5000/api/emails/mark-read', { emailIds: selectedEmailIds }, { withCredentials: true });
      setSelectedEmailIds([]);
    } catch (err) { console.error(err); }
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.delete('http://localhost:5000/api/emails/bulk-delete', { data: { emailIds: selectedEmailIds }, withCredentials: true });
      setEmails(emails.filter(e => !selectedEmailIds.includes(e.id)));
      setSelectedEmailIds([]);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
              activeFilter === tab.id
                ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300'
                : 'border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs font-medium text-slate-400 ml-4 flex-shrink-0">
        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
          <input 
            type="checkbox" 
            checked={allSelected} 
            onChange={handleSelectAll} 
            className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" 
          />
          Select all
        </label>
        {selectedEmailIds.length > 0 && (
          <>
            <button onClick={handleMarkRead} className="hover:text-slate-200 text-indigo-400" title="Mark as Read">
              <MailOpen className="w-4 h-4" />
            </button>
            <button onClick={handleDeleteSelected} className="hover:text-rose-400 text-slate-400" title="Delete Selected">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

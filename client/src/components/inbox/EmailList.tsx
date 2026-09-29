import React, { useState } from 'react';
import EmailItem from './EmailItem';
import { useEmail } from '../../context/EmailContext';
import { Loader2 } from 'lucide-react';

interface EmailListProps {
  activeFilter?: string;
  searchQuery?: string;
}

export default function EmailList({ activeFilter, searchQuery }: EmailListProps) {
  const { emails, selectedEmail, setSelectedEmail, isLoadingEmails } = useEmail();
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const toggleSelectEmail = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEmails([...selectedEmails, id]);
    } else {
      setSelectedEmails(selectedEmails.filter(eId => eId !== id));
    }
  };

  if (isLoadingEmails) {
    return (
      <div className="flex items-center justify-center py-20 text-indigo-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const filteredEmails = emails.filter(email => {
    // 1. Filter by search query
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        email.subject.toLowerCase().includes(query) || 
        email.sender.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query) ||
        (email.body && email.body.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }
    
    // 2. Filter by tabs
    if (activeFilter === 'needs-reply' && !email.subject.toLowerCase().includes('?')) return false;
    if (activeFilter === 'promotions' && !email.sender.toLowerCase().includes('marketing')) return false;
    
    return true;
  });

  return (
    <div className="flex flex-col border border-slate-800/60 rounded-xl overflow-hidden bg-[#0A0F1C]/50">
      {filteredEmails.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-slate-500 text-sm">
          No conversations match your search.
        </div>
      ) : (
        filteredEmails.map(email => (
          <EmailItem 
            key={email.id} 
            {...email} 
            isSelected={selectedEmails.includes(email.id)}
            onSelect={(checked) => toggleSelectEmail(email.id, checked)}
            isActive={selectedEmail?.id === email.id}
            onClick={() => setSelectedEmail(email)}
          />
        ))
      )}
    </div>
  );
}

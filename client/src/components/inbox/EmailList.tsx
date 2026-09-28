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

  return (
    <div className="flex flex-col border border-slate-800/60 rounded-xl overflow-hidden bg-[#0A0F1C]/50">
      {emails.map(email => (
        <EmailItem 
          key={email.id} 
          {...email} 
          isSelected={selectedEmails.includes(email.id)}
          onSelect={(checked) => toggleSelectEmail(email.id, checked)}
          isActive={selectedEmail?.id === email.id}
          onClick={() => setSelectedEmail(email)}
        />
      ))}
    </div>
  );
}

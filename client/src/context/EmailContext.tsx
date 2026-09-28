import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Email {
  id: string;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  tag?: string;
  tagColor?: string;
  body?: string;
}

interface EmailContextType {
  emails: Email[];
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
  aiActionQueue: any[];
  setAiActionQueue: (queue: any[]) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: ReactNode }) {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      initials: 'MC',
      sender: 'Maya Chen',
      subject: 'Q4 launch plan — final review',
      preview: 'Can you confirm the revised rollout dates before our 3 PM sync?',
      time: '9:42 AM',
      tag: 'Urgent',
      tagColor: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      body: 'Hi Alex, can you confirm the revised rollout dates before our 3 PM sync? I\'ve incorporated product feedback and moved the beta announcement to October 14.'
    },
    // Adding dummy emails...
    {
      id: '2',
      initials: 'LI',
      sender: 'Linear',
      subject: 'Your workspace weekly digest',
      preview: '18 issues completed, 6 projects updated, and 4 new comments.',
      time: '8:15 AM',
      tag: 'Product',
      tagColor: 'bg-slate-700/30 text-slate-400 border border-slate-700/50',
    }
  ]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0]);
  const [aiActionQueue, setAiActionQueue] = useState<any[]>([]);

  return (
    <EmailContext.Provider value={{ emails, selectedEmail, setSelectedEmail, aiActionQueue, setAiActionQueue }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
}

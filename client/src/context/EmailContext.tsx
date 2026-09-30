import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

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
  setEmails: (emails: Email[]) => void;
  selectedEmailIds: string[];
  setSelectedEmailIds: (ids: string[]) => void;
  isAnalyzingSummary: boolean;
  setIsAnalyzingSummary: (val: boolean) => void;
  aiSummary: string | null;
  setAiSummary: (val: string | null) => void;
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
  aiActionQueue: any[];
  setAiActionQueue: (queue: any[]) => void;
  isLoadingEmails: boolean;
  isAnalyzingInbox: boolean;
  setIsAnalyzingInbox: (val: boolean) => void;
  showIntelligenceDashboard: boolean;
  setShowIntelligenceDashboard: (val: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (val: string) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [isAnalyzingSummary, setIsAnalyzingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [aiActionQueue, setAiActionQueue] = useState<any[]>([]);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);
  
  const [isAnalyzingInbox, setIsAnalyzingInbox] = useState(false);
  const [showIntelligenceDashboard, setShowIntelligenceDashboard] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchEmails = async () => {
        setIsLoadingEmails(true);
        try {
          const response = await axios.get('http://localhost:5000/api/emails', {
            withCredentials: true
          });
          setEmails(response.data);
          if (response.data.length > 0) {
            setSelectedEmail(response.data[0]);
          }
        } catch (error) {
          console.error('Failed to fetch emails:', error);
        } finally {
          setIsLoadingEmails(false);
        }
      };
      fetchEmails();
    }
  }, [isAuthenticated]);

  return (
    <EmailContext.Provider value={{ 
      emails, setEmails,
      selectedEmailIds, setSelectedEmailIds,
      isAnalyzingSummary, setIsAnalyzingSummary,
      aiSummary, setAiSummary,
      selectedEmail, setSelectedEmail, 
      aiActionQueue, setAiActionQueue, 
      isLoadingEmails,
      isAnalyzingInbox, setIsAnalyzingInbox,
      showIntelligenceDashboard, setShowIntelligenceDashboard,
      globalSearchQuery, setGlobalSearchQuery
    }}>
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

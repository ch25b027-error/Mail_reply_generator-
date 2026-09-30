import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Clock, MoreHorizontal, Trash2 } from 'lucide-react';
import { useEmail } from '../../context/EmailContext';

interface EmailItemProps {
  id: string;
  initials: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  tag?: string;
  tagColor?: string;
  isActive?: boolean;
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
  onClick?: () => void;
  emailObj: any;
}

export default function EmailItem({ id, initials, sender, subject, preview, time, tag, tagColor, isActive, isSelected, onSelect, onClick, emailObj }: EmailItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { emails, setEmails, setSelectedEmail, setIsAnalyzingSummary, setAiSummary } = useEmail();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/emails/${id}`, { withCredentials: true });
      setEmails(emails.filter(em => em.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleAISummary = async (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    setMenuOpen(false);
    setSelectedEmail(emailObj);
    setIsAnalyzingSummary(true);
    setAiSummary(null);
    try {
      const response = await axios.post('http://localhost:5000/api/ai/summary', { emailContext: emailObj, summaryType: type }, { withCredentials: true });
      setAiSummary(response.data.summary);
    } catch (err) {
      console.error(err);
      setAiSummary('Failed to generate summary.');
    } finally {
      setIsAnalyzingSummary(false);
    }
  };

  return (
    <div 
      className={`flex items-start gap-4 p-4 border-b border-slate-800/50 hover:bg-[#121A2F] transition-colors cursor-pointer relative ${isActive ? 'bg-[#121A2F] border-l-2 border-l-indigo-500' : 'border-l-2 border-l-transparent'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMenuOpen(false); }}
      onClick={onClick}
    >
      <div className="pt-1" onClick={e => e.stopPropagation()}>
        <input 
          type="checkbox" 
          checked={isSelected || false}
          onChange={(e) => onSelect?.(e.target.checked)}
          className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" 
        />
      </div>
      <Avatar className="h-9 w-9 bg-slate-800 flex-shrink-0 mt-0.5">
        <AvatarFallback className="bg-slate-800 text-slate-300 text-xs font-semibold">{initials}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-slate-200">{sender}</span>
            {tag && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tagColor}`}>
                {tag}
              </span>
            )}
          </div>
          
          {!isHovered && <span className="text-xs text-slate-500 font-medium">{time}</span>}
          
          {isHovered && (
            <div className="flex items-center gap-2 text-slate-400">
              <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-700" onClick={handleDelete}><Trash2 className="w-4 h-4" /></button>
              <div className="relative group/tooltip">
                <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-700" onClick={e => e.stopPropagation()}><Clock className="w-4 h-4" /></button>
                <div className="absolute bottom-full mb-2 right-0 hidden group-hover/tooltip:block bg-slate-800 text-xs text-slate-200 px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  Received: {new Date().toLocaleDateString()} at {time}
                </div>
              </div>
              <div className="relative">
                <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-700" onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden z-10" onClick={e => e.stopPropagation()}>
                    <button className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors" onClick={(e) => handleAISummary(e, 'detailed')}>Detailed Description</button>
                    <button className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors" onClick={(e) => handleAISummary(e, 'brief')}>Brief Description</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="text-sm">
          <span className="text-slate-200 font-medium mr-2">{subject}</span>
          <span className="text-slate-400 truncate">- {preview}</span>
        </div>
      </div>
    </div>
  );
}
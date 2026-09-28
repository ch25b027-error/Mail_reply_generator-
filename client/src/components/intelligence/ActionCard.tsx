import React, { useState } from 'react';
import { Filter, CheckCircle, Edit3, Search, ArrowUpRight } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  iconName: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ActionCard({ title, description, iconName, isSelected, onClick }: ActionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch(iconName) {
      case 'filter': return <Filter className="w-5 h-5 text-teal-400" />;
      case 'check-circle': return <CheckCircle className="w-5 h-5 text-teal-400" />;
      case 'edit': return <Edit3 className="w-5 h-5 text-indigo-400" />;
      case 'search': return <Search className="w-5 h-5 text-indigo-400" />;
      default: return null;
    }
  };

  return (
    <div 
      className={`relative p-5 rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden ${
        isSelected 
          ? 'bg-indigo-900/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
          : 'bg-[#0B1120] border-slate-800 hover:border-slate-700 hover:bg-[#0f172a]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 border ${
        isSelected ? 'bg-indigo-900/40 border-indigo-500/30' : 'bg-slate-800/50 border-slate-700/50'
      }`}>
        {getIcon()}
      </div>
      <h3 className="text-sm font-bold text-slate-200 mb-2">{title}</h3>
      <p className="text-xs text-slate-400 pr-4">{description}</p>
      
      <div className={`absolute bottom-4 right-4 text-slate-500 transition-opacity ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}>
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
}

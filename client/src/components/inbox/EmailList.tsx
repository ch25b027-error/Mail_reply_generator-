import React from 'react';
import EmailItem from './EmailItem';

export default function EmailList() {
  const emails = [
    {
      id: 1,
      initials: 'MC',
      sender: 'Maya Chen',
      subject: 'Q4 launch plan — final review',
      preview: 'Can you confirm the revised rollout dates before our 3 PM sync?',
      time: '9:42 AM',
      tag: 'Urgent',
      tagColor: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      isActive: true,
    },
    {
      id: 2,
      initials: 'LI',
      sender: 'Linear',
      subject: 'Your workspace weekly digest',
      preview: '18 issues completed, 6 projects updated, and 4 new comments.',
      time: '8:15 AM',
      tag: 'Product',
      tagColor: 'bg-slate-700/30 text-slate-400 border border-slate-700/50',
    },
    {
      id: 3,
      initials: 'JW',
      sender: 'James Wilson',
      subject: 'Partnership proposal follow-up',
      preview: 'Following up with the revised terms and implementation timeline...',
      time: 'Yesterday',
      tag: 'Needs reply',
      tagColor: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
    },
    {
      id: 4,
      initials: 'ST',
      sender: 'Stripe',
      subject: 'Payment received - Invoice #1048',
      preview: 'Your payment of $2,400.00 was successfully processed.',
      time: 'Yesterday',
      tag: 'Receipt',
      tagColor: 'bg-slate-700/30 text-slate-400 border border-slate-700/50',
    },
    {
      id: 5,
      initials: 'NA',
      sender: 'Nora Alvarez',
      subject: 'Research interview notes',
      preview: 'I synthesized the five customer calls into key themes and quotes.',
      time: 'Mon',
      tag: 'Work',
      tagColor: 'bg-slate-700/30 text-slate-400 border border-slate-700/50',
    },
    {
      id: 6,
      initials: 'SH',
      sender: 'Superhuman',
      subject: 'The productivity playbook',
      preview: 'Five habits that help high-performing teams protect focus time.',
      time: 'Mon',
      tag: 'Newsletter',
      tagColor: 'bg-slate-700/30 text-slate-400 border border-slate-700/50',
    }
  ];

  return (
    <div className="flex flex-col border border-slate-800/60 rounded-xl overflow-hidden bg-[#0A0F1C]/50">
      {emails.map(email => (
        <EmailItem key={email.id} {...email} />
      ))}
    </div>
  );
}

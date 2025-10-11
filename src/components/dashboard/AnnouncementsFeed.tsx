import React from 'react';
import { mockAnnouncements } from '../announcements/data';
// FIX: Added missing MegaphoneIcon import.
import { MegaphoneIcon, ArrowRightIcon } from '../icons/Icons';

const AnnouncementsFeed: React.FC = () => {
  const latestAnnouncements = mockAnnouncements
    .filter(a => a.audience === 'Company-Wide')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {latestAnnouncements.map(announcement => (
        <div key={announcement.id} className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${announcement.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-primary'}`}>
                <MegaphoneIcon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className={`text-sm font-semibold ${announcement.priority === 'Urgent' ? 'text-red-700 dark:text-red-400' : 'text-text-primary dark:text-gray-200'}`}>
                {announcement.title}
            </p>
            <p className="text-xs text-text-secondary dark:text-gray-400">
                {new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      ))}
      <a href="#" className="flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline mt-2">
        View All <ArrowRightIcon className="w-4 h-4" />
      </a>
    </div>
  );
};

export default AnnouncementsFeed;
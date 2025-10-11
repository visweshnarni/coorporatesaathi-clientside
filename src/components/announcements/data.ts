
import { Announcement } from '../../types';

const now = new Date();

export const mockAnnouncements: Announcement[] = [
  {
    id: 'anno-1',
    title: 'System Maintenance Scheduled for this Weekend',
    content: 'Please be advised that we will be performing scheduled maintenance on our servers this Sunday from 2:00 AM to 4:00 AM. During this period, access to internal services may be temporarily unavailable. We apologize for any inconvenience.',
    author: 'IT Department',
    authorPosition: 'System Administration',
    authorAvatar: 'https://picsum.photos/seed/it-dept/100/100',
    date: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    audience: 'Company-Wide',
    priority: 'Urgent',
  },
  {
    id: 'anno-2',
    title: 'Q3 Performance Review Cycle Kick-off',
    content: 'The performance review cycle for the third quarter has officially begun. All managers are requested to schedule one-on-one meetings with their team members before the end of the month. Please find the updated review forms on the HR portal.',
    author: 'Anna Rodriguez',
    authorPosition: 'HR Manager',
    authorAvatar: 'https://picsum.photos/seed/4/100/100',
    date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    audience: 'Company-Wide',
    priority: 'Normal',
    imageUrl: 'https://picsum.photos/seed/performance/800/400',
  },
  {
    id: 'anno-3',
    title: 'New Expense Reporting Software Launch',
    content: 'We are excited to announce the launch of our new expense reporting software. A mandatory training session will be held for all Finance department employees this Friday at 10:00 AM. Please confirm your attendance.',
    author: 'Tom Baker',
    authorPosition: 'Financial Analyst',
    authorAvatar: 'https://picsum.photos/seed/8/100/100',
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    audience: 'Finance',
    priority: 'Normal',
  },
    {
    id: 'anno-4',
    title: 'Welcome to our New Team Members!',
    content: 'Let\'s extend a warm welcome to our newest team members who joined us this week! Please make sure to introduce yourselves and help them feel at home.',
    author: 'Admin User',
    authorPosition: 'System Administrator',
    authorAvatar: 'https://picsum.photos/100/100',
    date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    audience: 'Company-Wide',
    priority: 'Normal',
  }
];
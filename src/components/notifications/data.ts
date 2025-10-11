
import { Notification } from '../../types';

const now = new Date();

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'announcement',
    message: 'System maintenance scheduled for this weekend. Expect brief downtime on Sunday at 2 AM.',
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'Urgent',
  },
  {
    id: 'notif-2',
    type: 'project',
    message: 'The "Corporate Website Redesign" project deadline is approaching in 3 days.',
    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'notif-3',
    type: 'service',
    message: 'A new high-priority service request "Income Tax Filing" has been assigned to you.',
    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'notif-4',
    type: 'leave',
    message: 'Your leave request for Nov 10 - Nov 12 has been approved.',
    timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'notif-5',
    type: 'system',
    message: 'Your password will expire in 7 days. Please update it in the settings.',
    timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'notif-6',
    type: 'project',
    message: 'You have been added to the "2025 Budget Planning" project.',
    timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  }
];

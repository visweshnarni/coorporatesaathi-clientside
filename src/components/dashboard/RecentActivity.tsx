import React from 'react';

const activities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'submitted a new service request for GST Filing.',
    time: '5m ago',
    avatar: 'https://picsum.photos/seed/1/40/40'
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'completed the "Website Redesign" project.',
    time: '2h ago',
    avatar: 'https://picsum.photos/seed/2/40/40'
  },
  {
    id: 3,
    user: 'HR Department',
    action: 'approved leave request for Mike Johnson.',
    time: '4h ago',
    avatar: 'https://picsum.photos/seed/3/40/40'
  },
  {
    id: 4,
    user: 'System',
    action: 'posted a new company-wide announcement.',
    time: '1d ago',
    avatar: 'https://picsum.photos/seed/4/40/40'
  },
   {
    id: 5,
    user: 'Finance Team',
    action: 'processed payroll for May 2024.',
    time: '2d ago',
    avatar: 'https://picsum.photos/seed/5/40/40'
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800">
                    <img className="h-8 w-8 rounded-full" src={activity.avatar} alt="" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <a href="#" className="font-medium text-gray-900 dark:text-white">
                        {activity.user}
                      </a>{' '}
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                    <time>{activity.time}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
import React from 'react';

const leaveData = [
  { id: 1, name: 'Smita Sharma', dates: 'Oct 25 - Oct 27', status: 'Pending', avatar: 'https://picsum.photos/seed/6/40/40' },
  { id: 2, name: 'Raj Sharma', dates: 'Nov 1 - Nov 5', status: 'Approved', avatar: 'https://picsum.photos/seed/7/40/40' },
  { id: 3, name: 'Rishabh Patle', dates: 'Nov 10 - Nov 10', status: 'Pending', avatar: 'https://picsum.photos/seed/8/40/40' },
  { id: 4, name: 'Aayush Sharma', dates: 'Nov 15 - Nov 17', status: 'Pending', avatar: 'https://picsum.photos/seed/9/40/40' },
  { id: 5, name: 'Priyanka Patil', dates: 'Dec 1 - Dec 3', status: 'Approved', avatar: 'https://picsum.photos/seed/10/40/40' },
];

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const LeaveRequests: React.FC = () => {
  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {leaveData.map((request) => (
          <li key={request.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img className="h-8 w-8 rounded-full" src={request.avatar} alt={request.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{request.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{request.dates}</p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusStyles[request.status as keyof typeof statusStyles]
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
import React from 'react';
import { EnrolledService } from '../../../types';
import { ClockIcon } from '../../icons/Icons';

interface Props {
  service: EnrolledService;
  onViewDetails: () => void;
}

const statusStyles: Record<EnrolledService['status'], { bg: string; text: string; border: string }> = {
  'Active': { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-300', border: 'border-blue-500' },
  'Pending Action': { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-300', border: 'border-yellow-500' },
  'Completed': { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-300', border: 'border-green-500' },
  'On Hold': { bg: 'bg-gray-100 dark:bg-gray-900/50', text: 'text-gray-800 dark:text-gray-300', border: 'border-gray-500' },
};

const ServiceCard: React.FC<Props> = ({ service, onViewDetails }) => {
  const { bg, text, border } = statusStyles[service.status];
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border-t-4 ${border}`}>
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-semibold text-primary dark:text-blue-400">{service.category}</p>
                <h3 className="text-lg font-bold text-text-primary dark:text-gray-200 truncate">{service.name}</h3>
            </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
            {service.status}
          </span>
        </div>
        
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-2 h-10">{service.description}</p>

        <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{service.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${service.progress}%` }}></div>
            </div>
        </div>
        
         {service.nextActionDate && (
            <div className="mt-4 text-sm flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
                <ClockIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300">Next Action Required</p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">By {formatDate(service.nextActionDate)}</p>
                </div>
            </div>
        )}

      </div>
      
      <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl flex justify-between items-center">
        <div>
            <p className="text-xs font-medium text-text-secondary dark:text-gray-400">Consultant</p>
            <div className="flex items-center gap-2 mt-1">
                <img className="h-7 w-7 rounded-full object-cover" src={service.consultant.avatar} alt={service.consultant.name} />
                <span className="text-sm font-semibold text-text-primary dark:text-gray-200">{service.consultant.name}</span>
            </div>
        </div>
        <button onClick={onViewDetails} className="px-3 py-1 text-sm font-semibold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-primary rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
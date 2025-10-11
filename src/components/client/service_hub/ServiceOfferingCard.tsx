import React from 'react';
import { AvailableService } from '../../../types';
import { CheckCircleIcon, ArrowRightIcon } from '../../icons/Icons';

interface Props {
  service: AvailableService;
  onInquire: (service: AvailableService) => void;
}

const categoryStyles: Record<AvailableService['category'], { bg: string; text: string; }> = {
  'Tax': { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
  'GST': { bg: 'bg-green-50 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
  'Startup': { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
  'Legal': { bg: 'bg-yellow-50 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400' },
  'Audit': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
};

const ServiceOfferingCard: React.FC<Props> = ({ service, onInquire }) => {
  const { bg, text } = categoryStyles[service.category];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        <div className="p-6">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${bg} ${text}`}>{service.category}</span>
            <h3 className="text-xl font-bold text-text-primary dark:text-gray-200 mt-3">{service.name}</h3>
            <p className="text-sm text-text-secondary dark:text-gray-400 mt-1 h-14">{service.description}</p>
        </div>
        <div className="px-6 pb-6 flex-grow">
            <ul className="space-y-2">
                {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-text-secondary dark:text-gray-300">
                        <CheckCircleIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="border-t dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl mt-auto">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-text-secondary dark:text-gray-400">Starting from</p>
                    <p className="text-xl font-bold text-text-primary dark:text-gray-200">{service.price}</p>
                </div>
                <button 
                  onClick={() => onInquire(service)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    Inquire Now <ArrowRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default ServiceOfferingCard;
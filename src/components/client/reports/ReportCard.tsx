import React from 'react';
import { DownloadIcon } from '../../icons/Icons';

interface Props {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  onDownload: () => void;
  color: 'blue' | 'green' | 'yellow' | 'indigo' | 'red';
}

const colorClasses = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500' },
  green: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-400', border: 'border-green-500' },
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-500' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/50', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500' },
  red: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-600 dark:text-red-400', border: 'border-red-500' },
};

const ReportCard: React.FC<Props> = ({ icon, title, description, onDownload, color }) => {
    const { bg, text, border } = colorClasses[color];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border-t-4 ${border}`}>
        <div className="p-6 flex-grow">
            <div className={`p-3 rounded-full inline-block ${bg} ${text}`}>
                {React.cloneElement(icon, { className: "w-8 h-8" })}
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary dark:text-gray-200">{title}</h3>
            <p className="mt-1 text-sm text-text-secondary dark:text-gray-400">{description}</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
             <button
                onClick={onDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-semibold text-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
                <DownloadIcon />
                <span>Generate & Download</span>
            </button>
        </div>
    </div>
  );
};

export default ReportCard;

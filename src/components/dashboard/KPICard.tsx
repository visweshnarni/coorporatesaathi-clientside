import React from 'react';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  // FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
  icon: React.ReactElement;
  color: 'blue' | 'yellow' | 'green' | 'indigo' | 'red' | 'teal';
  timeframe?: 'daily' | 'monthly';
}

const colorClasses = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
};

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon, color, timeframe }) => {
  const { bg, text } = colorClasses[color];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-start justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div>
        <p className="text-sm font-medium text-text-secondary dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-text-primary dark:text-gray-200 mt-1">{value}</p>
        {change && (
          <div className="flex items-center mt-2">
            <span className={`text-sm font-semibold ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
            <span className="text-xs text-text-secondary dark:text-gray-400 ml-1">
              {timeframe ? `vs. last ${timeframe === 'daily' ? 'day' : 'month'}` : ''}
            </span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${bg} ${text}`}>
        {icon}
      </div>
    </div>
  );
};

export default KPICard;
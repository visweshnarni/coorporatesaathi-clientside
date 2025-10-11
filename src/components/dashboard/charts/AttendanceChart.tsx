import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const dailyData = [
  { name: 'Mon', Present: 88 },
  { name: 'Tue', Present: 92 },
  { name: 'Wed', Present: 90 },
  { name: 'Thu', Present: 95 },
  { name: 'Fri', Present: 85 },
  { name: 'Sat', Present: 93 },
];

const monthlyData = [
  { name: 'Jan', Present: 85 },
  { name: 'Feb', Present: 88 },
  { name: 'Mar', Present: 90 },
  { name: 'Apr', Present: 87 },
  { name: 'May', Present: 92 },
  { name: 'Jun', Present: 95 },
];

interface Props {
  effectiveTheme: 'light' | 'dark';
}

const AttendanceChart: React.FC<Props> = ({ effectiveTheme }) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly'>('monthly');
  const data = timeframe === 'daily' ? dailyData : monthlyData;
  const isDark = effectiveTheme === 'dark';
  const tickColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? '#4B5563' : '#e0e0e0';
  const legendColor = isDark ? '#F9FAFB' : '#374151';

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Employee Attendance Trend</h3>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 border dark:border-gray-600 mt-2 sm:mt-0">
          <button
            onClick={() => setTimeframe('daily')}
            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${timeframe === 'daily' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${timeframe === 'monthly' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
            <YAxis tick={{ fill: tickColor, fontSize: 12 }} unit="%" />
            <Tooltip 
              cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}
              contentStyle={{ 
                backgroundColor: isDark ? '#374151' : '#fff', 
                border: `1px solid ${isDark ? '#4B5563' : '#ccc'}`,
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '14px', color: legendColor }} />
            <Bar dataKey="Present" fill="#1E40AF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AttendanceChart;
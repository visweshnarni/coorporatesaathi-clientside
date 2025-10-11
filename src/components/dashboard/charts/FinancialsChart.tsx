import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const dailyData = [
  { name: 'Mon', Revenue: 4000, Expenses: 2400 },
  { name: 'Tue', Revenue: 3000, Expenses: 1398 },
  { name: 'Wed', Revenue: 2000, Expenses: 9800 },
  { name: 'Thu', Revenue: 2780, Expenses: 3908 },
  { name: 'Fri', Revenue: 1890, Expenses: 4800 },
  { name: 'Sat', Revenue: 2390, Expenses: 3800 },
  { name: 'Sun', Revenue: 3490, Expenses: 4300 },
];

const monthlyData = [
  { name: 'Jan', Revenue: 125600, Expenses: 48950 },
  { name: 'Feb', Revenue: 110200, Expenses: 45300 },
  { name: 'Mar', Revenue: 145800, Expenses: 62100 },
  { name: 'Apr', Revenue: 130400, Expenses: 55600 },
  { name: 'May', Revenue: 160300, Expenses: 71200 },
  { name: 'Jun', Revenue: 155900, Expenses: 68400 },
];

interface Props {
  effectiveTheme: 'light' | 'dark';
}

const FinancialsChart: React.FC<Props> = ({ effectiveTheme }) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly'>('monthly');
  const data = timeframe === 'daily' ? dailyData : monthlyData;
  const isDark = effectiveTheme === 'dark';
  const tickColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? '#4B5563' : '#e0e0e0';
  const legendColor = isDark ? '#F9FAFB' : '#374151';

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Financial Overview</h3>
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
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
            <YAxis tickFormatter={formatCurrency} tick={{ fill: tickColor, fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`} 
              contentStyle={{ 
                backgroundColor: isDark ? '#374151' : '#fff', 
                border: `1px solid ${isDark ? '#4B5563' : '#ccc'}`,
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '14px', color: legendColor }} />
            <Area type="monotone" dataKey="Revenue" stroke="#22C55E" fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="Expenses" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default FinancialsChart;
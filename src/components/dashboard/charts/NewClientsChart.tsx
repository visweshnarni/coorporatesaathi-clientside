import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', 'New Clients': 15 },
  { name: 'Feb', 'New Clients': 20 },
  { name: 'Mar', 'New Clients': 25 },
  { name: 'Apr', 'New Clients': 22 },
  { name: 'May', 'New Clients': 30 },
  { name: 'Jun', 'New Clients': 28 },
];

interface Props {
  effectiveTheme: 'light' | 'dark';
}

const NewClientsChart: React.FC<Props> = ({ effectiveTheme }) => {
  const isDark = effectiveTheme === 'dark';
  const tickColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? '#4B5563' : '#e0e0e0';
  const legendColor = isDark ? '#F9FAFB' : '#374151';

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
          <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
          <Tooltip 
             contentStyle={{ 
                backgroundColor: isDark ? '#374151' : '#fff', 
                border: `1px solid ${isDark ? '#4B5563' : '#ccc'}`,
             }} 
          />
          <Legend wrapperStyle={{ fontSize: '14px', color: legendColor }} />
          <Line type="monotone" dataKey="New Clients" stroke="#10B981" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewClientsChart;
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

const data = [
  { name: 'Completed', value: 980, fill: '#10B981' },
  { name: 'Requested', value: 1250, fill: '#60A5FA' },
];

interface Props {
  effectiveTheme: 'light' | 'dark';
}

const ServicesChart: React.FC<Props> = ({ effectiveTheme }) => {
  const isDark = effectiveTheme === 'dark';
  const tickColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? '#4B5563' : '#e0e0e0';
  const labelColor = isDark ? '#F9FAFB' : '#111827';

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis type="number" tick={{ fill: tickColor, fontSize: 12 }} />
          <YAxis type="category" dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
          <Tooltip 
             cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}
             contentStyle={{ 
                backgroundColor: isDark ? '#374151' : '#fff', 
                border: `1px solid ${isDark ? '#4B5563' : '#ccc'}`,
             }} 
          />
          <Bar dataKey="value" barSize={40} radius={[0, 4, 4, 0]}>
             <LabelList dataKey="value" position="right" style={{ fill: labelColor, fontSize: 14, fontWeight: 'bold' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServicesChart;
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'IT Department', value: 400 },
  { name: 'Finance Department', value: 300 },
  { name: 'HR Department', value: 200 },
  { name: 'Marketing', value: 250 },
];

const COLORS = ['#1E40AF', '#60A5FA', '#10B981', '#F59E0B'];

interface Props {
  effectiveTheme: 'light' | 'dark';
}

const DepartmentTasksChart: React.FC<Props> = ({ effectiveTheme }) => {
  const isDark = effectiveTheme === 'dark';
  const legendColor = isDark ? '#F9FAFB' : '#374151';

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
                backgroundColor: isDark ? '#374151' : '#fff', 
                border: `1px solid ${isDark ? '#4B5563' : '#ccc'}`,
             }} 
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: legendColor }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentTasksChart;
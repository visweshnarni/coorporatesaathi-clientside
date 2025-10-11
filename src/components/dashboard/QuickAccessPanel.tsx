

import React from 'react';
// FIX: Added missing icon imports.
import { ProjectIcon, ServiceIcon, PayrollIcon, ReportIcon, ArrowRightIcon } from '../icons/Icons';
import { ViewType } from "../../types.ts";

interface QuickAccessPanelProps {
  setCurrentView: (view: ViewType) => void;
}

const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({ setCurrentView }) => {
  const panels = [
    { name: 'Project Management', view: 'projects', icon: <ProjectIcon />, color: 'text-blue-500' },
    { name: 'Service Management', view: 'services', icon: <ServiceIcon />, color: 'text-yellow-500' },
    { name: 'Payroll', view: 'payroll', icon: <PayrollIcon />, color: 'text-green-500' },
    { name: 'Generate Reports', view: 'reports', icon: <ReportIcon />, color: 'text-indigo-500' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-base font-semibold text-text-primary mb-3">Quick Access</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {panels.map((panel) => (
          <a
            key={panel.name}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView(panel.view as ViewType);
            }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center min-w-0">
              <span className={panel.color}>{panel.icon}</span>
              <span className="ml-2 font-medium text-xs text-text-primary truncate">{panel.name}</span>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessPanel;


import React, { useState } from 'react';
import KPICard from './KPICard';
import AttendanceChart from './charts/AttendanceChart';
import ServicesChart from './charts/ServicesChart';
import DepartmentTasksChart from './charts/DepartmentTasksChart';
import FinancialsChart from './charts/FinancialsChart';
import RecentActivity from './RecentActivity';
import LeaveRequests from './LeaveRequests';
import NewClientsChart from './charts/NewClientsChart';
import QuickAccessPanel from './QuickAccessPanel';
import AnnouncementsFeed from './AnnouncementsFeed';
// FIX: Added missing icon imports.
import { ProjectIcon, ServiceIcon, EmployeeIcon, RevenueIcon } from '../icons/Icons';
import { Theme, ViewType } from "../../types.ts";

interface Props {
  effectiveTheme: 'light' | 'dark';
  setCurrentView: (view: ViewType) => void;
}

const DashboardView: React.FC<Props> = ({ effectiveTheme, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'charts'>('overview');

  const TabButton: React.FC<{ tabName: 'overview' | 'charts'; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm lg:text-base font-semibold rounded-lg transition-colors duration-200 focus:outline-none ${
        activeTab === tabName
          ? 'bg-primary text-white shadow'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Top section with title and tabs */}
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Welcome Back, Admin!</h2>
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border dark:border-gray-700 space-x-1">
          <TabButton tabName="overview" label="Overview" />
          <TabButton tabName="charts" label="Charts & Trends" />
        </div>
      </div>

      {/* Conditional Content based on activeTab */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard title="Project Progress" value="75%" icon={<ProjectIcon />} color="blue" />
            <KPICard title="Total Service Requests" value="1,250" icon={<ServiceIcon />} color="yellow" />
            <KPICard title="Active Employees Today" value="250/300" icon={<EmployeeIcon />} color="indigo" />
            <KPICard title="Total Revenue (Month)" value="$125k" icon={<RevenueIcon />} color="green" />
          </div>
          
          {/* Quick Access */}
          <QuickAccessPanel setCurrentView={setCurrentView} />

          {/* Main content for overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Recent Activity</h3>
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Announcements</h3>
                <AnnouncementsFeed />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Employee Leave Requests</h3>
                <LeaveRequests />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'charts' && (
        <div className="space-y-6 animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <AttendanceChart effectiveTheme={effectiveTheme} />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Services: Requested vs. Completed</h3>
                <ServicesChart effectiveTheme={effectiveTheme} />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Department Task Completion</h3>
                <DepartmentTasksChart effectiveTheme={effectiveTheme} />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <FinancialsChart effectiveTheme={effectiveTheme} />
              </div>
               <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                 <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">New Clients Trend</h3>
                 <NewClientsChart effectiveTheme={effectiveTheme} />
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
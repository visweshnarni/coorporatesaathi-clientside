import React from 'react';
import { ViewType } from "../../types.ts";
// FIX: Imported IconProps to resolve typing error with React.cloneElement.
import { HomeIcon, ServiceIcon, StoreIcon, CalendarIcon, DocumentIcon, ReportIcon, ChatIcon, SettingsIcon, XIcon, IconProps } from '../icons/Icons';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'enrolledServices', label: 'Enrolled Services', icon: <ServiceIcon /> },
    { id: 'serviceHub', label: 'Service Hub', icon: <StoreIcon /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon /> },
    { id: 'documents', label: 'Documents', icon: <DocumentIcon /> },
    { id: 'reports', label: 'Reports', icon: <ReportIcon /> },
    { id: 'consult', label: 'Consult', icon: <ChatIcon /> },
  ];

  // FIX: Used a more specific type for the icon prop to allow cloning with className.
  const NavLink: React.FC<{ id: ViewType, label: string, icon: React.ReactElement<IconProps> }> = ({ id, label, icon }) => (
    <li>
      <a
        href="#"
        onClick={(e) => { 
          e.preventDefault(); 
          setCurrentView(id);
          setIsOpen(false);
        }}
        className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-sidebar-hover hover:text-white transition-colors duration-200 ${
          currentView === id ? 'bg-primary text-white' : ''
        }`}
      >
        {React.cloneElement(icon, { className: "w-6 h-6" })}
        <span className="ml-3 text-sm font-medium">{label}</span>
      </a>
    </li>
  );

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      <aside className={`w-64 flex-shrink-0 bg-sidebar text-white flex flex-col 
                         fixed lg:static inset-y-0 left-0 z-30
                         transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                         lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">CorporateSaathi</h1>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-white" aria-label="Close sidebar">
              <XIcon />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <ul className="space-y-2">
            {/* FIX: Cast item.icon to the expected type to resolve the type mismatch. The 'key' prop error was a misleading consequence of this primary type issue. */}
            {menuItems.map(item => <NavLink key={item.id} id={item.id as ViewType} label={item.label} icon={item.icon as React.ReactElement<IconProps>} />)}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('profile'); setIsOpen(false); }} className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-sidebar-hover hover:text-white transition-colors duration-200 ${currentView === 'profile' ? 'bg-primary text-white' : ''}`}>
            <SettingsIcon className="w-6 h-6" />
            <span className="ml-3 text-sm font-medium">Profile</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
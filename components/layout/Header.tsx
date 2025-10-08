import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, BellIcon, MenuIcon, ChevronDownIcon, UserCircleIcon, SettingsIcon, LogoutIcon, SunIcon, MoonIcon } from '../icons/Icons';
import { ViewType, Theme } from '../../App';
import { ClientNotification } from '../../types';
import NotificationsPanel from './NotificationsPanel';

const viewTitles: Record<ViewType, string> = {
  home: 'Home',
  enrolledServices: 'Enrolled Services',
  serviceHub: 'Service Hub',
  calendar: 'Calendar',
  documents: 'Documents',
  reports: 'Reports',
  consult: 'Consult an Expert',
  profile: 'Profile',
};

// Mock Data
const mockClientNotifications: ClientNotification[] = [
    { id: '1', type: 'service', message: 'Your GST Filing service is now active.', timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
    { id: '2', type: 'document', message: 'A new document "Tax Invoice Q2" has been added by your consultant.', timestamp: new Date(Date.now() - 7200000).toISOString(), read: false },
    { id: '3', type: 'consultation', message: 'Reminder: You have a consultation tomorrow at 10 AM.', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
    { id: '4', type: 'announcement', message: 'New compliance deadlines for 2024 have been announced.', timestamp: new Date(Date.now() - 172800000).toISOString(), read: true },
];


interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onMenuClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onMenuClick, searchQuery, setSearchQuery, theme, setTheme, onLogout }) => {
  const pageTitle = viewTitles[currentView] || 'Dashboard';
  const [notifications, setNotifications] = useState<ClientNotification[]>(mockClientNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileMenuOpen(false);
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) setIsThemeMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white dark:bg-gray-800 shadow-sm dark:border-b dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="lg:hidden mr-4 text-gray-500 hover:text-primary focus:outline-none" aria-label="Open sidebar">
          <MenuIcon />
        </button>
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-200">{pageTitle}</h2>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>

        <div className="relative" ref={themeRef}>
          <button onClick={() => setIsThemeMenuOpen(p => !p)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition" aria-label="Choose theme">
              <SunIcon className="w-6 h-6 hidden dark:block" />
              <MoonIcon className="w-6 h-6 block dark:hidden" />
          </button>
          {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border dark:border-gray-700 z-50 animate-fade-in-down py-2">
                  <button onClick={() => { setTheme('light'); setIsThemeMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'light' ? 'font-semibold text-primary' : ''}`}>
                      <SunIcon className="w-5 h-5" /> Light
                  </button>
                  <button onClick={() => { setTheme('dark'); setIsThemeMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'dark' ? 'font-semibold text-primary' : ''}`}>
                      <MoonIcon className="w-5 h-5" /> Dark
                  </button>
                  <button onClick={() => { setTheme('system'); setIsThemeMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'system' ? 'font-semibold text-primary' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      System
                  </button>
              </div>
          )}
        </div>

        <div className="relative" ref={notificationRef}>
          <button onClick={() => setIsNotificationsOpen(prev => !prev)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition relative">
            <span className="sr-only">View notifications</span>
            <BellIcon />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full ring-2 ring-white bg-red-500 text-white text-xs flex items-center justify-center">{unreadNotifications}</span>
            )}
          </button>
          {isNotificationsOpen && <NotificationsPanel notifications={notifications} setNotifications={setNotifications} onClose={() => setIsNotificationsOpen(false)} />}
        </div>
        
        <div className="relative" ref={profileRef}>
          <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <img className="h-10 w-10 rounded-full object-cover" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Client avatar" />
            <div className="hidden lg:block text-left">
              <div className="font-semibold text-sm text-text-primary dark:text-gray-200">Rishabh Patle</div>
              <div className="text-xs text-text-secondary dark:text-gray-400">Acme Corporation</div>
            </div>
            <ChevronDownIcon className="hidden lg:block w-4 h-4 text-gray-500" />
          </button>
          
           {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border dark:border-gray-700 z-50 animate-fade-in-down py-2">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                     <p className="font-semibold text-sm text-text-primary dark:text-gray-200">Rishabh Patle</p>
                     <p className="text-xs text-text-secondary dark:text-gray-400 truncate">rishabh@acmecorp.com</p>
                  </div>
                  <div className="mt-2 space-y-1">
                     <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('profile'); setIsProfileMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                       <UserCircleIcon className="w-5 h-5 text-gray-500" /> My Profile
                     </a>
                  </div>
                  <div className="mt-2 pt-2 border-t dark:border-gray-700">
                     <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20">
                       <LogoutIcon className="w-5 h-5" /> Logout
                     </a>
                  </div>
              </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
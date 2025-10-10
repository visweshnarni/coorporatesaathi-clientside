
import React, { useState, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import HomeView from './components/client/home/HomeView';
import EnrolledServiceView from './components/client/services/EnrolledServiceView';
import ServiceHubView from './components/client/service_hub/ServiceHubView';
import CalendarView from './components/client/calendar/CalendarView';
import DocumentsView from './components/client/documents/DocumentsView';
import ReportsView from './components/client/reports/ReportsView';
import ConsultView from './components/client/consult/ConsultView';
import ProfileView from './components/client/profile/ProfileView';
import LoginPage from './components/auth/LoginPage';
import { CheckCircleIcon } from './components/icons/Icons';

export type ViewType = 'home' | 'enrolledServices' | 'serviceHub' | 'calendar' | 'documents' | 'reports' | 'consult' | 'profile';
export type Theme = 'light' | 'dark' | 'system';

const WelcomeModal: React.FC<{ name: string; onClose: () => void }> = ({ name, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" aria-modal="true" role="dialog">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md text-center p-8">
            <CheckCircleIcon className="w-16 h-16 text-accent mx-auto" />
            <h2 className="text-2xl font-bold text-text-primary dark:text-gray-200 mt-4">Welcome, {name}!</h2>
            <p className="text-text-secondary dark:text-gray-400 mt-2">You are now logged in to CorporateSaathi. We're excited to have you on board.</p>
            <button
                onClick={onClose}
                className="mt-6 w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
                Get Started
            </button>
        </div>
    </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [clientName, setClientName] = useState('Rishabh Patle'); // Default name
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(isDark ? 'dark' : 'light');

    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
        if (theme === 'system') {
           const newIsDark = mediaQuery.matches;
           root.classList.remove(newIsDark ? 'light' : 'dark');
           root.classList.add(newIsDark ? 'dark' : 'light');
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
}, [theme]);

  const handleLogin = (name?: string) => {
    setIsAuthenticated(true);
    if (name) {
        setClientName(name);
    }
    // Show welcome modal on every login
    setShowWelcomeModal(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView setCurrentView={setCurrentView} clientName={clientName} />;
      case 'enrolledServices':
        return <EnrolledServiceView searchQuery={searchQuery} setCurrentView={setCurrentView} />;
      case 'serviceHub':
        return <ServiceHubView searchQuery={searchQuery} />;
      case 'calendar':
        return <CalendarView />;
      case 'documents':
        return <DocumentsView searchQuery={searchQuery} />;
      case 'reports':
        return <ReportsView />;
      case 'consult':
        return <ConsultView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView setCurrentView={setCurrentView} clientName={clientName} />;
    }
  };
  
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} theme={theme} setTheme={setTheme} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-text-primary dark:text-gray-200">
      <MainLayout 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        setTheme={setTheme}
        onLogout={handleLogout}
        clientName={clientName}
      >
        {renderView()}
      </MainLayout>
      {showWelcomeModal && <WelcomeModal name={clientName} onClose={() => setShowWelcomeModal(false)} />}
    </div>
  );
};

export default App;

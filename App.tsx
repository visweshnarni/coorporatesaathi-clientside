import React, { useState, useEffect } from "react";
import MainLayout from "./src/components/layout/MainLayout";
import HomeView from "./src/components/client/home/HomeView";
import EnrolledServiceView from "./src/components/client/services/EnrolledServiceView";
import ServiceHubView from "./src/components/client/service_hub/ServiceHubView";
import CalendarView from "./src/components/client/calendar/CalendarView";
import DocumentsView from "./src/components/client/documents/DocumentsView";
import ReportsView from "./src/components/client/reports/ReportsView";
import ConsultView from "./src/components/client/consult/ConsultView";
import ProfileView from "./src/components/client/profile/ProfileView";
import LoginPage from "./src/components/auth/LoginPage";
import { CheckCircleIcon } from "./src/components/icons/Icons";
import { authApi } from "./src/services/api";

export type ViewType =
  | "home"
  | "enrolledServices"
  | "serviceHub"
  | "calendar"
  | "documents"
  | "reports"
  | "consult"
  | "profile";
export type Theme = "light" | "dark" | "system";

const WelcomeModal: React.FC<{ name: string; onClose: () => void }> = ({
  name,
  onClose,
}) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
    aria-modal="true"
    role="dialog"
  >
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md text-center p-8">
      <CheckCircleIcon className="w-16 h-16 text-accent mx-auto" />
      <h2 className="text-2xl font-bold text-text-primary dark:text-gray-200 mt-4">
        Welcome, {name}!
      </h2>
      <p className="text-text-secondary dark:text-gray-400 mt-2">
        You are now logged in to CorporateSaathi. We're excited to have you on
        board.
      </p>
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
  const [clientName, setClientName] = useState("");
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "light"
  );

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = authApi.getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        // Verify token by fetching user profile
        const response = await authApi.getProfile();

        if (response.success && response.data) {
          setIsAuthenticated(true);
          setClientName(response.data.name || "User");
        } else {
          // Token invalid, clear it
          authApi.logout();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Token invalid, clear it
        authApi.logout();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(isDark ? "dark" : "light");

    localStorage.setItem("theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const newIsDark = mediaQuery.matches;
        root.classList.remove(newIsDark ? "light" : "dark");
        root.classList.add(newIsDark ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Handle login - name comes from backend after successful authentication
  const handleLogin = (name?: string) => {
    setIsAuthenticated(true);
    if (name) {
      setClientName(name);
    } else {
      setClientName("User");
    }
    setShowWelcomeModal(true);
  };

  // Handle logout
  const handleLogout = () => {
    authApi.logout(); // Clear token from localStorage
    setIsAuthenticated(false);
    setCurrentView("home");
    setClientName("");
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomeView setCurrentView={setCurrentView} clientName={clientName} />
        );
      case "enrolledServices":
        return (
          <EnrolledServiceView
            searchQuery={searchQuery}
            setCurrentView={setCurrentView}
          />
        );
      case "serviceHub":
        return <ServiceHubView searchQuery={searchQuery} />;
      case "calendar":
        return <CalendarView />;
      case "documents":
        return <DocumentsView searchQuery={searchQuery} />;
      case "reports":
        return <ReportsView />;
      case "consult":
        return <ConsultView />;
      case "profile":
        return <ProfileView />;
      default:
        return (
          <HomeView setCurrentView={setCurrentView} clientName={clientName} />
        );
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage onLogin={handleLogin} theme={theme} setTheme={setTheme} />
    );
  }

  // Show main app if authenticated
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
      {showWelcomeModal && (
        <WelcomeModal
          name={clientName}
          onClose={() => setShowWelcomeModal(false)}
        />
      )}
    </div>
  );
};

export default App;

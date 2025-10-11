import React, { useState, useEffect } from "react";
import {
  UserCircleIcon,
  LockClosedIcon,
  BellIcon,
  TrashIcon,
  DownloadIcon,
} from "../../icons/Icons";
import { authApi } from "../../../services/api";

const ProfileView: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await authApi.getProfile();

        if (response.success && response.data) {
          setUserData({
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
          });
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const ToggleSwitch: React.FC<{
    enabled: boolean;
    onChange: (enabled: boolean) => void;
  }> = ({ enabled, onChange }) => (
    <button
      type="button"
      className={`${
        enabled ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("Profile changes saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">
          Profile
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mt-1">
          Manage your profile, preferences, and account settings.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-text-primary dark:text-gray-200 flex items-center gap-2 mb-4">
          <UserCircleIcon /> Profile Settings
        </h3>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary text-gray-900 dark:text-white"
            />
          </div>
          <div className="pt-4 border-t dark:border-gray-700">
            <h4 className="text-md font-semibold text-text-primary dark:text-gray-200 mb-2 flex items-center gap-2">
              <LockClosedIcon /> Change Password
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-text-primary dark:text-gray-200 flex items-center gap-2 mb-4">
          <BellIcon /> Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-text-primary dark:text-gray-200">
                Email Notifications
              </p>
              <p className="text-sm text-text-secondary dark:text-gray-400">
                Receive updates on services and documents.
              </p>
            </div>
            <ToggleSwitch
              enabled={notifications.email}
              onChange={(val) =>
                setNotifications((p) => ({ ...p, email: val }))
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-text-primary dark:text-gray-200">
                Activity Reminders
              </p>
              <p className="text-sm text-text-secondary dark:text-gray-400">
                Get reminders for upcoming deadlines.
              </p>
            </div>
            <ToggleSwitch
              enabled={notifications.push}
              onChange={(val) => setNotifications((p) => ({ ...p, push: val }))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-4">
          Account Actions
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-text-primary dark:text-gray-200">
                Export Your Data
              </p>
              <p className="text-sm text-text-secondary dark:text-gray-400">
                Download a copy of your documents and service history.
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-semibold text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
              <DownloadIcon /> Export
            </button>
          </div>
          <div className="flex justify-between items-center p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 rounded-lg">
            <div>
              <p className="font-medium text-red-800 dark:text-red-300">
                Delete Account
              </p>
              <p className="text-sm text-red-700 dark:text-red-400">
                This action is irreversible and will delete all your data.
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-red-600 border border-red-700 text-sm font-semibold text-white rounded-lg hover:bg-red-700">
              <TrashIcon /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

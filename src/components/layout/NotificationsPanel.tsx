import React from 'react';
import { ClientNotification } from '../../types';
import { ServiceIcon, DocumentIcon, ChatIcon, BellIcon } from '../icons/Icons';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  notifications: ClientNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<ClientNotification[]>>;
  onClose: () => void;
}

const NotificationIconMap: Record<ClientNotification['type'], React.ReactElement> = {
    service: <ServiceIcon className="w-5 h-5 text-blue-500" />,
    document: <DocumentIcon className="w-5 h-5 text-green-500" />,
    consultation: <ChatIcon className="w-5 h-5 text-indigo-500" />,
    announcement: <BellIcon className="w-5 h-5 text-yellow-500" />,
};

const NotificationsPanel: React.FC<Props> = ({ notifications, setNotifications, onClose }) => {
    
    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };
    
    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border dark:border-gray-700 z-50 animate-fade-in-down">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-text-primary dark:text-gray-200">Notifications</h3>
                {unreadCount > 0 && (
                    <button onClick={handleMarkAllAsRead} className="text-xs font-medium text-primary hover:underline">
                        Mark all as read
                    </button>
                )}
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div 
                            key={notification.id}
                            onClick={() => handleMarkAsRead(notification.id)}
                            className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        >
                            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${!notification.read ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                {NotificationIconMap[notification.type]}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm ${!notification.read ? 'font-semibold text-text-primary dark:text-gray-200' : 'text-text-secondary dark:text-gray-400'}`}>
                                    {notification.message}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                </span>
                            </div>
                             {!notification.read && (
                                <div className="flex-shrink-0 mt-1 w-2.5 h-2.5 bg-primary rounded-full" aria-label="Unread"></div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <BellIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
                        <h4 className="mt-2 font-semibold text-text-primary dark:text-gray-200">No notifications</h4>
                        <p className="mt-1 text-sm text-text-secondary dark:text-gray-400">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPanel;

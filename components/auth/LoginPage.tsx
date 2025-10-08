import React, { useState } from 'react';
import { MailIcon, LockClosedIcon, UserCircleIcon, PhoneIcon } from '../icons/Icons';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Signup successful! Please log in.');
        setActiveTab('login');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <h1 className="text-4xl font-bold text-primary">CorporateSaathi</h1>
                     <p className="text-text-secondary dark:text-gray-400 mt-2">Your Partner in Corporate Compliance & Growth</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="flex">
                        <button 
                            onClick={() => setActiveTab('login')}
                            className={`w-1/2 p-4 font-semibold text-center transition-colors ${activeTab === 'login' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setActiveTab('signup')}
                            className={`w-1/2 p-4 font-semibold text-center transition-colors ${activeTab === 'signup' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="p-8">
                        {activeTab === 'login' ? (
                            <form onSubmit={handleLogin} className="space-y-6 animate-fade-in">
                                <div>
                                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MailIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input type="email" id="login-email" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="you@example.com" required />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                        <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                                    </div>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockClosedIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input type="password" id="login-password" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="••••••••" required />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">Login</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignup} className="space-y-4 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserCircleIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input type="text" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="John Doe" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                    <div className="mt-1 relative">
                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MailIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input type="email" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="you@example.com" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <PhoneIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input type="tel" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="+91 12345 67890" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockClosedIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input type="password" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="••••••••" required />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">Create Account</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
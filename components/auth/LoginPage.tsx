import React, { useState } from 'react';
import { MailIcon, LockClosedIcon, UserCircleIcon, PhoneIcon } from '../icons/Icons';

interface LoginPageProps {
    onLogin: () => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.651-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.786,44,30.338,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

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

    const handleGoogleSignIn = () => {
        // In a real application, you would trigger the Google OAuth flow here.
        alert('Redirecting to Google Sign-In...');
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

                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                            <span className="flex-shrink mx-4 text-sm text-text-secondary dark:text-gray-400">OR</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Sign in with Google"
                        >
                            <GoogleIcon />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
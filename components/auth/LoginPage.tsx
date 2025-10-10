
import React, { useState, useRef, useEffect } from 'react';
import { MailIcon, LockClosedIcon, UserCircleIcon, PhoneIcon, SunIcon, MoonIcon } from '../icons/Icons';
import { Theme } from '../../App';

interface LoginPageProps {
    onLogin: (name?: string) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.651-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.786,44,30.338,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);


const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6 animate-fade-in">
            <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="email" id="login-email" className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="you@example.com" required />
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
                    <input type="password" id="login-password" className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="••••••••" required />
                </div>
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">Login</button>
        </form>
    );
};

const SignupForm: React.FC<{ onSignup: (data: { name: string; email: string; phone: string }) => void }> = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSignup = (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError("Use 8+ characters with an uppercase letter, a number, and a special symbol.");
        return;
      }
      setError('');
      onSignup({ name, email, phone });
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4 animate-fade-in">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserCircleIcon className="w-5 h-5 text-gray-400" /></div>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="John Doe" required />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon className="w-5 h-5 text-gray-400" /></div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="you@example.com" required />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon className="w-5 h-5 text-gray-400" /></div>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="+91 12345 67890" required />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockClosedIcon className="w-5 h-5 text-gray-400" /></div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="••••••••" required />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockClosedIcon className="w-5 h-5 text-gray-400" /></div>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="••••••••" required />
                </div>
            </div>
            {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            <button type="submit" className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">Next →</button>
        </form>
    );
};

const OtpForm: React.FC<{ contactInfo: { email: string; phone: string; }; onSubmit: () => void; onBack: () => void; }> = ({ contactInfo, onSubmit, onBack }) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState('');
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);
    
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;
        const newOtp = [...otp];
        newOtp[index] = element.value.slice(-1);
        setOtp(newOtp);
        if (element.nextSibling && element.value) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && inputsRef.current[index - 1]) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        // For demo purposes, any 6-digit code will work
        if (enteredOtp.length === 6 && /^\d{6}$/.test(enteredOtp)) {
            setError('');
            onSubmit();
        } else {
            setError("Please enter a valid 6-digit OTP.");
        }
    };
    
    const handleResend = () => {
        if (timer === 0) {
            alert("A new OTP has been sent.");
            setTimer(30);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 animate-fade-in text-center">
            <h2 className="text-2xl font-bold text-text-primary dark:text-white">Verify Your Account</h2>
            <p className="mt-2 text-text-secondary dark:text-gray-400">
                Enter the 6-digit code sent to your email ({contactInfo.email}) and phone.
            </p>
            <form onSubmit={handleFormSubmit}>
                <div className="flex justify-center gap-2 md:gap-3 my-8">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={data}
                            ref={el => { inputsRef.current[index] = el; }}
                            onChange={e => handleChange(e.target, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    ))}
                </div>
                 {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                <button type="submit" className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">Verify & Continue</button>
            </form>
            <div className="mt-6 text-sm">
                <p className="text-text-secondary dark:text-gray-400">
                    Didn't receive the code?{' '}
                    <button onClick={handleResend} disabled={timer > 0} className="font-semibold text-primary hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-wait">
                        {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
                    </button>
                </p>
                <button onClick={onBack} className="mt-2 font-semibold text-primary hover:underline">&larr; Back to Sign Up</button>
            </div>
        </div>
    );
};


const LoginPage: React.FC<LoginPageProps> = ({ onLogin, theme, setTheme }) => {
    const [authStep, setAuthStep] = useState<'login' | 'signup' | 'otp'>('login');
    const [signupData, setSignupData] = useState({ name: '', email: '', phone: '' });

    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const themeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
                setIsThemeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignupSubmit = (data: { name: string; email: string; phone: string }) => {
        setSignupData(data);
        setAuthStep('otp');
    };

    const handleOtpSubmit = () => {
        // Here you would typically verify the OTP on the backend
        // On success:
        onLogin(signupData.name);
    };

    const handleGoogleSignIn = () => {
        // This would trigger the Google OAuth flow
        alert('Redirecting to Google Sign-In...');
        onLogin('Google User');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 relative">
            <div className="absolute top-4 right-4 z-10" ref={themeRef}>
                <button
                    onClick={() => setIsThemeMenuOpen(p => !p)}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-primary transition"
                    aria-label="Choose theme"
                >
                    <SunIcon className="w-6 h-6 hidden dark:block" />
                    <MoonIcon className="w-6 h-6 block dark:hidden" />
                </button>
                {isThemeMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border dark:border-gray-700 z-50 animate-fade-in-down py-2">
                        <button onClick={() => { setTheme('light'); setIsThemeMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'light' ? 'font-semibold text-primary' : ''}`}>
                            <SunIcon className="w-5 h-5" /> Light
                        </button>
                        <button onClick={() => { setTheme('dark'); setIsThemeMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'dark' ? 'font-semibold text-primary' : ''}`}>
                            <MoonIcon className="w-5 h-5" /> Dark
                        </button>
                        <button onClick={() => { setTheme('system'); setIsThemeMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'system' ? 'font-semibold text-primary' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            System
                        </button>
                    </div>
                )}
            </div>
            
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                     <h1 className="text-5xl font-bold text-primary">CorporateSaathi</h1>
                     <p className="text-text-secondary dark:text-gray-400 mt-4 text-lg">Your Partner in Corporate Compliance & Growth</p>
                </div>

                {authStep === 'otp' ? (
                    <OtpForm contactInfo={signupData} onSubmit={handleOtpSubmit} onBack={() => setAuthStep('signup')} />
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex">
                            <button 
                                onClick={() => setAuthStep('login')}
                                className={`w-1/2 p-4 font-semibold text-center transition-colors text-lg ${authStep === 'login' ? 'bg-primary/5 dark:bg-primary/20 text-primary border-b-2 border-primary' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => setAuthStep('signup')}
                                className={`w-1/2 p-4 font-semibold text-center transition-colors text-lg ${authStep === 'signup' ? 'bg-primary/5 dark:bg-primary/20 text-primary border-b-2 border-primary' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="p-8 md:p-10">
                            {authStep === 'login' ? (
                                <LoginForm onLogin={() => onLogin()} />
                            ) : (
                                <SignupForm onSignup={handleSignupSubmit} />
                            )}

                            <div className="relative flex py-5 items-center">
                                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                                <span className="flex-shrink mx-4 text-sm text-text-secondary dark:text-gray-400">OR</span>
                                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                aria-label="Sign in with Google"
                            >
                                <GoogleIcon />
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;

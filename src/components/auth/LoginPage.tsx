declare global {
  interface Window {
    google: any;
  }
}

import React, { useState, useEffect } from "react";
import { authApi } from "../../services/api";

type Theme = "light" | "dark" | "system";

interface LoginPageProps {
  onLogin: (name?: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

type ViewState = "login" | "signup" | "otp";

// Eye icon for show/hide password
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, theme, setTheme }) => {
  const [view, setView] = useState<ViewState>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize Google OAuth
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
        });
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Render custom Google button
  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  // Handle Google OAuth callback
  const handleGoogleCallback = async (response: any) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await authApi.googleAuth({
        token: response.credential,
      });

      if (result.success) {
        if (result.data?.token) {
          authApi.setToken(result.data.token);
        }

        const userName = result.data?.user?.name || "User";
        setMessage("Google login successful!");
        setTimeout(() => onLogin(userName), 1000);
      }
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(
        err.message || "Google authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await authApi.login({ email, password });

      if (response.success) {
        setMessage("OTP sent to your email!");
        setView("otp");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.message.includes("Invalid")) {
        setError("Invalid email or password.");
      } else if (err.message.includes("not found")) {
        setError("Account not found.");
      } else {
        setError(err.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password needs 1 uppercase letter");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password needs 1 lowercase letter");
      setLoading(false);
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password needs 1 number");
      setLoading(false);
      return;
    }

    if (!/[@$!%*?&#]/.test(password)) {
      setError("Password needs 1 special character: @$!%*?&#");
      setLoading(false);
      return;
    }

    if (phone.length < 10) {
      setError("Phone must be at least 10 digits");
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.register({
        name,
        email,
        phone,
        password,
        confirmPassword,
      });

      if (response.success) {
        setMessage("OTP sent to your email!");
        setView("otp");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      if (
        err.message.includes("already exists") ||
        err.message.includes("duplicate")
      ) {
        setError("Email already registered.");
      } else {
        setError(err.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await authApi.verifyOtp({ email, otp });

      if (response.success) {
        if (response.data?.token) {
          authApi.setToken(response.data.token);
        }

        const userName = response.data?.user?.name || "User";
        setMessage("Verification successful!");
        setTimeout(() => onLogin(userName), 1000);
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await authApi.resendOtp(email);
      setMessage("New OTP sent to your email!");
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  const themeOptions: Theme[] = ["light", "dark", "system"];
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100"
      }`}
    >
      {/* Theme Selector */}
      <div className="absolute top-4 right-4 flex gap-2">
        {themeOptions.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              theme === t
                ? "bg-blue-600 text-white"
                : isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div
        className={`w-full max-w-md ${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-2xl overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`text-center py-8 ${isDark ? "bg-gray-800" : "bg-white"}`}
        >
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            CorporateSaathi
          </h1>
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your Partner in Corporate Compliance & Growth
          </p>
        </div>

        {/* Tabs - Only show for login/signup, not OTP */}
        {view !== "otp" && (
          <div
            className={`flex border-b ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => {
                setView("login");
                setError("");
                setMessage("");
              }}
              className={`flex-1 py-4 font-semibold transition-all ${
                view === "login"
                  ? `border-b-2 border-blue-600 ${
                      isDark
                        ? "text-white bg-gray-700"
                        : "text-blue-600 bg-gray-50"
                    }`
                  : isDark
                  ? "text-gray-400 bg-gray-800"
                  : "text-gray-600 bg-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setView("signup");
                setError("");
                setMessage("");
              }}
              className={`flex-1 py-4 font-semibold transition-all ${
                view === "signup"
                  ? `border-b-2 border-blue-600 ${
                      isDark
                        ? "text-white bg-gray-700"
                        : "text-blue-600 bg-gray-50"
                    }`
                  : isDark
                  ? "text-gray-400 bg-gray-800"
                  : "text-gray-600 bg-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          {/* OTP Verification View */}
          {view === "otp" && (
            <div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Verify OTP
              </h3>
              <p
                className={`text-sm mb-6 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Enter the 6-digit code sent to {email}
              </p>
              <form onSubmit={handleOtpVerification} className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    OTP Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    className={`w-full px-4 py-2 rounded-lg border text-center text-2xl tracking-widest ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className={`text-sm font-medium ${
                      isDark
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-700"
                    } disabled:opacity-50`}
                  >
                    Resend OTP
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setView("login");
                      setOtp("");
                      setError("");
                      setMessage("");
                    }}
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    } hover:underline`}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Login Form */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 pr-10 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDark
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div
                        className={`w-full ${
                          isDark ? "border-gray-600" : "border-gray-300"
                        } border-t`}
                      />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span
                        className={`px-2 ${
                          isDark
                            ? "bg-gray-800 text-gray-400"
                            : "bg-white text-gray-500"
                        }`}
                      >
                        OR
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div id="google_signin_button" />
                  </div>
                </>
              )}
            </form>
          )}

          {/* Signup Form */}
          {view === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+91 12345 67890"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 pr-10 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDark
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-2 pr-10 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDark
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

              {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div
                        className={`w-full ${
                          isDark ? "border-gray-600" : "border-gray-300"
                        } border-t`}
                      />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span
                        className={`px-2 ${
                          isDark
                            ? "bg-gray-800 text-gray-400"
                            : "bg-white text-gray-500"
                        }`}
                      >
                        OR
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div id="google_signup_button" />
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

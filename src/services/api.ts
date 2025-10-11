// Centralized API configuration for CorporateSaathi

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ============================================
// TYPE DEFINITIONS
// ============================================

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface User {
  _id?: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  isVerified?: boolean;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface OtpData {
  email: string;
  otp: string;
}

interface GoogleAuthData {
  token: string;
}

interface EnrollmentData {
  serviceId: string;
  additionalInfo?: any;
}

// ============================================
// API HELPER FUNCTION
// ============================================

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem("authToken");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ============================================
// AUTHENTICATION API
// ============================================

export const authApi = {
  /**
   * Register a new user
   */
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    return apiCall<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  /**
   * Login user
   */
  login: async (credentials: LoginData): Promise<ApiResponse<AuthResponse>> => {
    return apiCall<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Google authentication
   */
  googleAuth: async (
    authData: GoogleAuthData
  ): Promise<ApiResponse<AuthResponse>> => {
    return apiCall<AuthResponse>("/api/auth/google", {
      method: "POST",
      body: JSON.stringify(authData),
    });
  },

  /**
   * Verify OTP
   */
  verifyOtp: async (otpData: OtpData): Promise<ApiResponse<AuthResponse>> => {
    return apiCall<AuthResponse>("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(otpData),
    });
  },

  /**
   * Resend OTP
   */
  resendOtp: async (
    email: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return apiCall<{ message: string }>("/api/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Get user profile (Protected)
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiCall<User>("/api/auth/me", {
      method: "GET",
    });
  },

  /**
   * Logout user (clear token)
   */
  logout: (): void => {
    localStorage.removeItem("authToken");
  },

  /**
   * Store authentication token
   */
  setToken: (token: string): void => {
    localStorage.setItem("authToken", token);
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },
};

// ============================================
// CLIENT API
// ============================================

export const clientApi = {
  /**
   * Get all available services (Public)
   */
  getAllServices: async (): Promise<ApiResponse<any>> => {
    return apiCall<any>("/api/clients/services", {
      method: "GET",
    });
  },

  /**
   * Get specific service details (Public)
   */
  getServiceDetails: async (serviceId: string): Promise<ApiResponse<any>> => {
    return apiCall<any>(`/api/clients/services/${serviceId}`, {
      method: "GET",
    });
  },

  /**
   * Get dashboard statistics (Protected - Client only)
   */
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    return apiCall<any>("/api/clients/dashboard/stats", {
      method: "GET",
    });
  },

  /**
   * Get enrolled services (Protected - Client only)
   */
  getEnrolledServices: async (): Promise<ApiResponse<any>> => {
    return apiCall<any>("/api/clients/my-services", {
      method: "GET",
    });
  },

  /**
   * Enroll in a service (Protected - Client only)
   */
  enrollInService: async (
    enrollmentData: EnrollmentData
  ): Promise<ApiResponse<any>> => {
    return apiCall<any>("/api/clients/enroll", {
      method: "POST",
      body: JSON.stringify(enrollmentData),
    });
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const apiUtils = {
  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  },

  /**
   * Get API base URL
   */
  getBaseUrl: (): string => {
    return API_BASE_URL;
  },
};

// Export everything as default as well
export default {
  auth: authApi,
  client: clientApi,
  utils: apiUtils,
};

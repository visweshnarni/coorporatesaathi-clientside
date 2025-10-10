// Client Dashboard Types
export type ServiceCategory = 'Tax' | 'GST' | 'Startup' | 'Legal' | 'Audit';
export type ServiceStatus = 'Active' | 'Pending Action' | 'Completed' | 'On Hold';

export interface EnrolledService {
  id: string;
  name: string;
  category: ServiceCategory;
  status: ServiceStatus;
  progress: number;
  consultant: {
    name: string;
    avatar: string;
  };
  startDate: string; // YYYY-MM-DD
  nextActionDate?: string; // YYYY-MM-DD
  description: string;
}

export interface AvailableService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: string;
  features: string[];
}

export interface ClientDocument {
  id: string;
  name: string;
  serviceId: string;
  serviceName: string;
  type: 'Uploaded by You' | 'Provided by Us';
  uploadDate: string; // YYYY-MM-DD
  size: string;
  url: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  fullName: string;
  status: 'Missing' | 'Uploaded' | 'Verified';
  file?: { name: string; size: string };
  description: string;
}

export interface SampleDocument {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'deadline' | 'consultation' | 'reminder';
}

export interface Consultant {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  bio: string;
}

export interface RecentActivity {
  id: string;
  description: string;
  timestamp: string; // ISO String
  type: 'document' | 'service' | 'consultation';
}

export interface ClientNotification {
  id: string;
  type: 'service' | 'document' | 'consultation' | 'announcement';
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  link?: string;
}

// FIX: Added extensive type definitions for the admin dashboard to resolve numerous import errors.
// Admin Dashboard Types
export type Department = 'IT' | 'Finance' | 'HR' | 'Marketing';
export type ITSubDepartment = 'Web Development' | 'App Development' | 'Server Development';
export type ProjectStatus = 'Active' | 'Pending' | 'Completed';
export type ProjectPriority = 'High' | 'Medium' | 'Low';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: Department;
  avatar: string;
  email: string;
  phone: string;
  joiningDate: string; // YYYY-MM-DD
  dob: string; // YYYY-MM-DD
  address: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  performanceScore?: number;
}

export interface Project {
  id: string;
  name: string;
  department: Department;
  subDepartment?: ITSubDepartment;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  assignedEmployees: number[];
}

export type ServicePriority = 'High' | 'Medium' | 'Low';
export type ServiceRequestStatus = 'New' | 'In Progress' | 'Completed' | 'On Hold';

export interface Service {
  id: string;
  title: string;
  clientName: string;
  organization: string;
  email: string;
  phone: string;
  category: ServiceCategory;
  status: ServiceRequestStatus;
  priority: ServicePriority;
  description: string;
  progress: number;
  assignedTeam: string;
  assignedEmployeeIds: number[];
  documents: number;
  startDate: string; // YYYY-MM-DD
}

export interface ServiceDocument {
    id: string;
    name: string;
    type: string;
    url: string;
    size: string;
    uploadDate: string; // YYYY-MM-DD
}

export interface EmployeeDocument {
    id: string;
    name: string;
    type: string;
    url: string;
    size: string;
    uploadDate: string; // YYYY-MM-DD
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Half-day' | 'On Leave' | 'Holiday';

export interface AttendanceRecord {
    id: string;
    employeeId: number;
    date: string; // YYYY-MM-DD
    checkIn: string | null; // HH:MM
    checkOut: string | null; // HH:MM
    status: AttendanceStatus;
}

export type PerformanceStatus = 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' | 'Pending Review';

export interface PerformanceReview {
  id: string;
  employeeId: number;
  reviewPeriod: string;
  reviewDate: string; // YYYY-MM-DD
  overallRating: number;
  status: PerformanceStatus;
  kpis: { name: string; rating: number; comment: string }[];
  managerComments: string;
  employeeComments: string;
  improvementPlan?: string;
  historicalData: { period: string; rating: number }[];
}

export interface Notification {
  id: string;
  type: 'announcement' | 'project' | 'service' | 'leave' | 'system';
  message: string;
  timestamp: string; // ISO String
  read: boolean;
  priority?: 'Normal' | 'Urgent';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorPosition: string;
  authorAvatar: string;
  date: string; // ISO String
  audience: 'Company-Wide' | Department;
  priority: 'Normal' | 'Urgent';
  imageUrl?: string;
}

export interface Email {
    id: string;
    from: { name: string; email: string; avatar: string };
    to: { name: string; email: string };
    subject: string;
    body: string;
    timestamp: string; // ISO string
    read: boolean;
    tag?: 'work' | 'important';
}

export interface PayrollRecord {
    id: string;
    employeeId: number;
    month: string; // e.g., "July 2024"
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    status: 'Paid' | 'Pending';
}

export interface ManualPayment {
    id: string;
    employeeId: number;
    amount: number;
    date: string; // YYYY-MM-DD
    type: 'Bonus' | 'Reimbursement' | 'Advance' | 'Other';
    notes?: string;
    status: 'Paid' | 'Pending';
}

export interface AuditLog {
    id: string;
    timestamp: string; // ISO String
    user: string;
    userAvatar: string;
    action: string;
    details: string;
}

export interface DepartmentInfo {
    id: string;
    name: Department;
    managerId: number | null;
    description: string;
}

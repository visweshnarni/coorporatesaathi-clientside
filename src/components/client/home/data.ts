import { EnrolledService, RecentActivity } from '../../../types';

export const mockEnrolledServices: EnrolledService[] = [
  {
    id: 'gst-001',
    name: 'Quarterly GST Filing',
    category: 'GST',
    status: 'Pending Action',
    progress: 75,
    consultant: { name: 'Priya Singh', avatar: 'https://i.pravatar.cc/150?u=priya' },
    startDate: '2024-07-01',
    nextActionDate: '2024-07-25',
    description: 'Filing of GSTR-1 and GSTR-3B for Q2. Awaiting sales ledger from client.',
  },
  {
    id: 'tax-001',
    name: 'Annual Tax Filing',
    category: 'Tax',
    status: 'Active',
    progress: 40,
    consultant: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
    startDate: '2024-06-15',
    description: 'Preparation and filing of annual income tax returns for FY 2023-24.',
  },
  {
    id: 'legal-001',
    name: 'Vendor Contract Review',
    category: 'Legal',
    status: 'Completed',
    progress: 100,
    consultant: { name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    startDate: '2024-05-20',
    description: 'Review and vetting of the new software vendor agreement.',
  },
];

export const mockRecentActivity: RecentActivity[] = [
    { id: '1', type: 'document', description: 'You uploaded "Sales Ledger Q2.csv".', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', type: 'service', description: 'Consultant Priya Singh commented on "Quarterly GST Filing".', timestamp: new Date(Date.now() - 10800000).toISOString() },
    { id: '3', type: 'consultation', description: 'Consultation with John Doe was completed.', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: '4', type: 'document', description: 'Consultant John Doe uploaded "Draft Tax Computation.pdf".', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
    { id: '5', type: 'service', description: '"Vendor Contract Review" service was marked as Completed.', timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
];

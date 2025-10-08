import { ClientDocument } from "../../../types";

export interface ServiceTimelineStep {
    name: string;
    status: 'completed' | 'current' | 'upcoming';
    date?: string; // e.g., '2024-07-05'
}

export interface ServiceActivity {
    id: string;
    user: 'You' | 'Consultant';
    avatar: string; // url
    description: string;
    timestamp: string; // ISO string
}

export const mockServiceTimeline: Record<string, ServiceTimelineStep[]> = {
    'gst-001': [
        { name: 'Service Initiated', status: 'completed', date: '2024-07-01' },
        { name: 'Document Request', status: 'completed', date: '2024-07-02' },
        { name: 'Document Upload', status: 'current', date: '2024-07-20' },
        { name: 'Draft Filing', status: 'upcoming' },
        { name: 'Final Submission', status: 'upcoming' },
    ],
    'tax-001': [
        { name: 'Service Initiated', status: 'completed', date: '2024-06-15' },
        { name: 'Data Collection', status: 'current', date: '2024-06-20' },
        { name: 'Computation', status: 'upcoming' },
        { name: 'Filing', status: 'upcoming' },
    ],
    'audit-001': [
        { name: 'Service Initiated', status: 'completed', date: '2024-07-10' },
        { name: 'Initial Documents Submitted', status: 'current', date: '2024-07-15' },
        { name: 'Fieldwork', status: 'upcoming' },
        { name: 'Draft Report', status: 'upcoming' },
        { name: 'Final Report', status: 'upcoming' },
    ]
};

export const mockServiceDocuments: Record<string, ClientDocument[]> = {
    'gst-001': [
        { id: 'doc1', name: 'Sales Ledger Q2.csv', serviceId: 'gst-001', serviceName: 'Quarterly GST Filing', type: 'Uploaded by You', uploadDate: '2024-07-20', size: '1.2 MB', url: '#' },
        { id: 'doc2', name: 'GSTR-1 Draft.pdf', serviceId: 'gst-001', serviceName: 'Quarterly GST Filing', type: 'Provided by Us', uploadDate: '2024-07-22', size: '350 KB', url: '#' },
    ],
    'tax-001': [
        { id: 'doc3', name: 'Form 16.pdf', serviceId: 'tax-001', serviceName: 'Annual Tax Filing', type: 'Uploaded by You', uploadDate: '2024-06-25', size: '800 KB', url: '#' },
    ]
};

export const mockServiceActivity: Record<string, ServiceActivity[]> = {
    'gst-001': [
        { id: 'a1', user: 'Consultant', avatar: 'https://i.pravatar.cc/150?u=priya', description: 'Has requested "Sales Ledger Q2.csv". Please upload it at your earliest convenience.', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
        { id: 'a2', user: 'You', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', description: 'Uploaded "Sales Ledger Q2.csv".', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 'a3', user: 'Consultant', avatar: 'https://i.pravatar.cc/150?u=priya', description: 'Thank you for the document. We will prepare the draft and share it shortly.', timestamp: new Date(Date.now() - 1800000).toISOString() },
    ],
    'tax-001': [
        { id: 'b1', user: 'Consultant', avatar: 'https://i.pravatar.cc/150?u=john', description: 'Service initiated. Please provide your Form 16 and bank statements.', timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
    ],
    'audit-001': [
         { id: 'c1', user: 'Consultant', avatar: 'https://i.pravatar.cc/150?u=priya', description: 'Welcome! The audit process has begun. Please refer to the document checklist.', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
    ]
};

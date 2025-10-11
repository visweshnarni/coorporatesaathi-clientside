import { AvailableService } from '../../../types';

export const mockAvailableServices: AvailableService[] = [
  {
    id: 's-tax-01',
    name: 'Income Tax Return Filing',
    category: 'Tax',
    description: 'Comprehensive ITR filing for individuals and businesses, ensuring accuracy and compliance.',
    price: '$150',
    features: ['For Salaried & Business', 'Max Tax Savings', 'Expert Assistance'],
  },
  {
    id: 's-gst-01',
    name: 'GST Registration',
    category: 'GST',
    description: 'Hassle-free GST registration process to get your business compliant.',
    price: '$100',
    features: ['Quick Turnaround', 'Documentation Support', 'ARN Generation'],
  },
  {
    id: 's-startup-01',
    name: 'Company Incorporation',
    category: 'Startup',
    description: 'Incorporate your business as a Private Limited, LLP, or OPC with our expert guidance.',
    price: '$300',
    features: ['Name Approval', 'Director Identification', 'Certificate of Incorporation'],
  },
  {
    id: 's-legal-01',
    name: 'Contract Drafting & Review',
    category: 'Legal',
    description: 'Professional drafting and vetting of legal documents to protect your interests.',
    price: '$250 / document',
    features: ['Vendor Agreements', 'Employment Contracts', 'Terms of Service'],
  },
  {
    id: 's-audit-01',
    name: 'Statutory Audit',
    category: 'Audit',
    description: 'Independent examination of financial records as mandated by law.',
    price: 'Custom',
    features: ['Compliance Check', 'Financial Reporting', 'Internal Control Review'],
  },
  {
    id: 's-gst-02',
    name: 'Monthly GST Filing',
    category: 'GST',
    description: 'End-to-end handling of monthly GSTR-1 and GSTR-3B filings.',
    price: '$80 / month',
    features: ['Timely Filing', 'ITC Reconciliation', 'Compliance Dashboard'],
  },
];

import { RequiredDocument, SampleDocument } from '../../../types';

export const initialRequiredDocs: RequiredDocument[] = [
  {
    id: 'doc-req-01',
    name: 'Aadhaar Card',
    fullName: 'Aadhaar Card (UIDAI)',
    status: 'Verified',
    file: { name: 'aadhaar_card.pdf', size: '450 KB' },
    description: 'Front and back side of your Aadhaar card.',
  },
  {
    id: 'doc-req-02',
    name: 'PAN Card',
    fullName: 'Permanent Account Number (PAN) Card',
    status: 'Uploaded',
    file: { name: 'pan_card_scan.jpg', size: '812 KB' },
    description: 'A clear copy of your income tax PAN card.',
  },
  {
    id: 'doc-req-03',
    name: 'Voter ID / Driving License',
    fullName: 'Voter ID Card or Driving License',
    status: 'Missing',
    description: 'Provide as an alternative identity proof.',
  },
  {
    id: 'doc-req-04',
    name: 'Electricity Bill / Mobile Bill',
    fullName: 'Recent Electricity or Postpaid Mobile Bill',
    status: 'Missing',
    description: 'Serves as proof of current address.',
  },
  {
    id: 'doc-req-05',
    name: 'Bank Statement',
    fullName: 'Last 6 Months Bank Statement',
    status: 'Uploaded',
    file: { name: 'bank_statement_h1.pdf', size: '2.1 MB' },
    description: 'Statement from your primary bank account.',
  },
  {
    id: 'doc-req-06',
    name: 'Passport Size Photo',
    fullName: 'Recent Passport Size Photograph',
    status: 'Missing',
    description: 'A clear, recent color photograph.',
  },
  {
    id: 'doc-req-07',
    name: 'Digital Signature',
    fullName: 'Scanned image of your signature',
    status: 'Verified',
    file: { name: 'signature.png', size: '50 KB' },
    description: 'A clear image of your signature on a plain background.',
  },
  {
    id: 'doc-req-08',
    name: 'No Objection Certificate (NOC)',
    fullName: 'No Objection Certificate for Rented Premises',
    status: 'Missing',
    description: 'Required if your registered office is a rental property.',
  },
];


export const sampleDocuments: SampleDocument[] = [
    {
        id: 'sample-01',
        name: 'Sample Rental Agreement',
        url: '#',
        description: 'For registering a rented property as an office.',
    },
    {
        id: 'sample-02',
        name: 'Sample NOC from Landlord',
        url: '#',
        description: 'No Objection Certificate format.',
    },
    {
        id: 'sample-03',
        name: 'Board Resolution Format',
        url: '#',
        description: 'Template for company board resolutions.',
    }
]

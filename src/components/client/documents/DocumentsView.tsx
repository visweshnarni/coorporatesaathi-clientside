import React, { useState, useMemo, useRef } from 'react';
import { RequiredDocument } from '../../../types';
import { initialRequiredDocs, sampleDocuments } from './data';
import { DocumentIcon, UploadIcon, DownloadIcon, CheckCircleIcon, ClockIcon, InfoIcon, AadhaarIcon, PanIcon, BillIcon, PhotoIcon, SignatureIcon } from '../../icons/Icons';

const iconMap: Record<string, React.ReactElement> = {
    'Aadhaar Card': <AadhaarIcon />,
    'PAN Card': <PanIcon />,
    'Voter ID / Driving License': <AadhaarIcon />,
    'Electricity Bill / Mobile Bill': <BillIcon />,
    'Bank Statement': <DocumentIcon />,
    'Passport Size Photo': <PhotoIcon />,
    'Digital Signature': <SignatureIcon />,
    'No Objection Certificate (NOC)': <DocumentIcon />,
};

const RequiredDocItem: React.FC<{ doc: RequiredDocument, onUpload: (id: string) => void }> = ({ doc, onUpload }) => {
    const statusStyles = {
        Missing: { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: <ClockIcon className="w-5 h-5" /> },
        Uploaded: { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: <UploadIcon className="w-5 h-5" /> },
        Verified: { bg: 'bg-green-50 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: <CheckCircleIcon className="w-5 h-5" /> },
    };
    const currentStatus = statusStyles[doc.status];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4" style={{ borderColor: currentStatus.text.match(/#[0-9a-f]{3,6}|(red|blue|green|yellow)-\d{2,3}/)?.[0] || '#ccc' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${currentStatus.bg} ${currentStatus.text}`}>
                        {iconMap[doc.name] || <DocumentIcon />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-text-primary dark:text-gray-200 truncate" title={doc.fullName}>{doc.name}</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">{doc.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${currentStatus.text}`}>
                        {currentStatus.icon} {doc.status}
                    </div>
                    {doc.status !== 'Verified' && (
                        <button 
                            onClick={() => onUpload(doc.id)} 
                            className="px-3 py-1.5 text-sm font-semibold bg-primary text-white rounded-md hover:bg-blue-700 transition-colors flex-shrink-0"
                        >
                            {doc.status === 'Uploaded' ? 'Re-upload' : 'Upload'}
                        </button>
                    )}
                </div>
            </div>
            {doc.status === 'Uploaded' && doc.file && (
                 <div className="mt-3 pl-12 text-xs text-text-secondary dark:text-gray-400">
                    Uploaded: <span className="font-medium text-text-primary dark:text-gray-300">{doc.file.name}</span> ({doc.file.size})
                </div>
            )}
        </div>
    );
};

const DocumentsView: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const [requiredDocs, setRequiredDocs] = useState<RequiredDocument[]>(initialRequiredDocs);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const docToUploadRef = useRef<string | null>(null);

    const filteredDocs = useMemo(() => {
        if (!searchQuery) return requiredDocs;
        return requiredDocs.filter(doc => 
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            doc.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [requiredDocs, searchQuery]);

    const handleUploadClick = (docId: string) => {
        docToUploadRef.current = docId;
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const docId = docToUploadRef.current;
        if (file && docId) {
            setRequiredDocs(prevDocs => prevDocs.map(doc => 
                doc.id === docId ? { 
                    ...doc, 
                    status: 'Uploaded', 
                    file: { name: file.name, size: `${(file.size / 1024).toFixed(1)} KB` } 
                } : doc
            ));
        }
        // Reset for next upload
        if(fileInputRef.current) fileInputRef.current.value = '';
        docToUploadRef.current = null;
    };

    return (
        <div className="space-y-8 animate-fade-in">
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Document Center</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1">Upload required documents and download necessary forms.</p>
            </div>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-text-primary dark:text-gray-200 mb-4">Required Documents Checklist</h3>
                    <div className="space-y-4">
                        {filteredDocs.map(doc => <RequiredDocItem key={doc.id} doc={doc} onUpload={handleUploadClick} />)}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-text-primary dark:text-gray-200 mb-4">Downloadable Forms & Samples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sampleDocuments.map(doc => (
                             <div key={doc.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-between">
                                 <div>
                                    <p className="font-bold text-text-primary dark:text-gray-200">{doc.name}</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-400">{doc.description}</p>
                                 </div>
                                <a href={doc.url} download className="flex-shrink-0 ml-4 flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-sm font-semibold text-primary rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                                    <DownloadIcon />
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsView;

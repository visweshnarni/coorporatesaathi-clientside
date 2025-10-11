import React, { useMemo, useState } from 'react';
import { mockEnrolledServices } from '../services/data';
import { DownloadIcon, ServiceIcon } from '../../icons/Icons';
import { EnrolledService } from '../../../types';

const statusStyles: Record<EnrolledService['status'], string> = {
  'Active': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Pending Action': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'On Hold': 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300',
};

const ReportsView: React.FC = () => {
    const [services] = useState(mockEnrolledServices);
    const [issueSubject, setIssueSubject] = useState('');
    const [issueServiceId, setIssueServiceId] = useState('');
    const [issueDescription, setIssueDescription] = useState('');

    const sortedServices = useMemo(() => {
        return [...services].sort((a, b) => {
            if (a.status === 'Completed' && b.status !== 'Completed') return 1;
            if (a.status !== 'Completed' && b.status === 'Completed') return -1;
            return 0;
        });
    }, [services]);

    const handleDownload = (serviceName: string) => {
        alert(`Generating and downloading report for "${serviceName}"...`);
    };

    const handleIssueSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!issueServiceId || !issueSubject || !issueDescription) {
            alert("Please fill all fields to raise an issue.");
            return;
        }
        alert(`Issue submitted for service ID ${issueServiceId}: "${issueSubject}". Our team will get back to you shortly.`);
        setIssueServiceId('');
        setIssueSubject('');
        setIssueDescription('');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Reports & Issues</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1">Download service reports and raise issues if you need help.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Service Status & Reports</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Service Name</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedServices.map(service => (
                                    <tr key={service.id} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{service.name}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[service.status]}`}>
                                                {service.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {service.status === 'Completed' ? (
                                                <button onClick={() => handleDownload(service.name)} className="font-medium text-primary hover:underline flex items-center justify-center gap-1 mx-auto">
                                                    <DownloadIcon className="w-4 h-4" /> Download
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">In Progress</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Raise an Issue</h3>
                    <form onSubmit={handleIssueSubmit} className="space-y-4">
                         <div>
                            <label htmlFor="issueService" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Related Service *</label>
                            <select id="issueService" value={issueServiceId} onChange={e => setIssueServiceId(e.target.value)} required className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white">
                                <option value="" disabled>Select a service</option>
                                {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="issueSubject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                            <input type="text" id="issueSubject" value={issueSubject} onChange={e => setIssueSubject(e.target.value)} required className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="e.g., Incorrect document" />
                        </div>
                        <div>
                            <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                            <textarea id="issueDescription" value={issueDescription} onChange={e => setIssueDescription(e.target.value)} required rows={4} className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="Please describe the issue in detail..."></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="w-full px-5 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-700 transition">Submit Issue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportsView;

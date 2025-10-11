import React from 'react';
import { EnrolledService, ClientDocument } from '../../../types';
import { mockServiceTimeline, mockServiceDocuments, mockServiceActivity, ServiceTimelineStep, ServiceActivity } from './detailData';
import { ArrowLeftIcon, ChatIcon, ClockIcon, DocumentIcon, DownloadIcon, UploadIcon, CheckCircleIcon } from '../../icons/Icons';
import { format } from 'date-fns';

interface ServiceDetailViewProps {
    service: EnrolledService;
    onBack: () => void;
}

const statusStyles: Record<EnrolledService['status'], string> = {
  'Active': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Pending Action': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'On Hold': 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300',
};

const TimelineStep: React.FC<{ step: ServiceTimelineStep; isLast: boolean }> = ({ step, isLast }) => {
    const isCompleted = step.status === 'completed';
    const isCurrent = step.status === 'current';
    return (
        <div className="relative flex items-start">
            <div className="flex flex-col items-center mr-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-primary text-white' : 
                    isCurrent ? 'bg-primary/20 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                    {isCompleted ? <CheckCircleIcon className="w-5 h-5" /> : <div className={`w-3 h-3 rounded-full ${isCurrent ? 'bg-primary' : 'bg-gray-400 dark:bg-gray-500'}`}></div>}
                </div>
                {!isLast && <div className={`w-0.5 grow mt-2 ${isCompleted ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>}
            </div>
            <div>
                <p className={`font-semibold ${isCurrent ? 'text-primary' : 'text-text-primary dark:text-gray-200'}`}>{step.name}</p>
                {step.date && <p className="text-xs text-text-secondary dark:text-gray-400">{format(new Date(step.date), 'MMM d, yyyy')}</p>}
            </div>
        </div>
    );
};

const ActivityItem: React.FC<{ activity: ServiceActivity }> = ({ activity }) => (
    <div className="flex gap-3">
        <img src={activity.avatar} alt={activity.user} className="w-8 h-8 rounded-full flex-shrink-0" />
        <div>
            <p className="font-semibold text-sm text-text-primary dark:text-gray-200">{activity.user === 'You' ? "You" : activity.user}</p>
            <div className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mt-1">
                <p>{activity.description}</p>
            </div>
            <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">{format(new Date(activity.timestamp), 'MMM d, yyyy, h:mm a')}</p>
        </div>
    </div>
);

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service, onBack }) => {
    const timeline = mockServiceTimeline[service.id] || [];
    const documents: ClientDocument[] = mockServiceDocuments[service.id] || [];
    const activities = mockServiceActivity[service.id] || [];
    
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-primary dark:text-blue-400 hover:underline mb-4">
                    <ArrowLeftIcon /> Back to Services
                </button>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">{service.name}</h2>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[service.status]}`}>
                        {service.status}
                    </span>
                </div>
                <p className="text-text-secondary dark:text-gray-400 mt-1">{service.category}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Details & Documents */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Timeline */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Service Timeline</h3>
                        <div>
                            {timeline.map((step, index) => (
                                <TimelineStep key={index} step={step} isLast={index === timeline.length - 1} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Activity Feed */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Activity & Communication</h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
                        </div>
                        <div className="mt-4 border-t dark:border-gray-700 pt-4">
                             <textarea rows={3} placeholder="Type a message to your consultant..." className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary"></textarea>
                             <button className="mt-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition w-full sm:w-auto">Send Message</button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Consultant & Details */}
                <div className="space-y-6">
                     {/* Consultant Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                        <img src={service.consultant.avatar} alt={service.consultant.name} className="w-20 h-20 rounded-full mx-auto border-4 border-secondary"/>
                        <h4 className="font-bold text-text-primary dark:text-gray-200 mt-3">{service.consultant.name}</h4>
                        <p className="text-sm font-semibold text-primary dark:text-blue-400">{service.category} Expert</p>
                        <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition">
                            <ChatIcon /> Message
                        </button>
                    </div>

                    {/* Documents */}
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Documents</h3>
                        <ul className="space-y-3">
                            {documents.map(doc => (
                                <li key={doc.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                    <div className="min-w-0">
                                        <p className="font-medium text-text-primary dark:text-gray-200 truncate">{doc.name}</p>
                                        <p className="text-xs text-text-secondary dark:text-gray-400">{doc.type}</p>
                                    </div>
                                    <a href={doc.url} download className="flex-shrink-0 ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-primary">
                                        <DownloadIcon className="w-4 h-4"/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 text-text-secondary dark:text-gray-400 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                           <UploadIcon /> Upload Document
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailView;
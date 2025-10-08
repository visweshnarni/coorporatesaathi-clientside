import React, { useState, useMemo } from 'react';
import { EnrolledService, ServiceStatus } from '../../../types';
import { mockEnrolledServices } from './data';
import ServiceCard from './ServiceCard';
import { ViewType } from '../../../App';
import { ServiceIcon, PlusIcon } from '../../icons/Icons';
import ServiceDetailView from './ServiceDetailView';

interface Props {
  searchQuery: string;
  setCurrentView: (view: ViewType) => void;
}

const EnrolledServiceView: React.FC<Props> = ({ searchQuery, setCurrentView }) => {
    const [services] = useState<EnrolledService[]>(mockEnrolledServices);
    const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'All'>('All');
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const filteredServices = useMemo(() => {
        // If there are no services at all, don't filter anything yet.
        if (services.length === 0) return [];
        
        return services.filter(service => {
            const statusMatch = statusFilter === 'All' || service.status === statusFilter;
            const searchMatch = searchQuery ? service.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
            return statusMatch && searchMatch;
        });
    }, [services, statusFilter, searchQuery]);

    const selectedService = useMemo(() => {
        if (!selectedServiceId) return null;
        return services.find(s => s.id === selectedServiceId);
    }, [selectedServiceId, services]);

    const NoServicesDisplay: React.FC<{ isFilterActive: boolean }> = ({ isFilterActive }) => (
        <div className="md:col-span-2 xl:col-span-3 text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <ServiceIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
            <h3 className="mt-2 text-xl font-semibold text-text-primary dark:text-gray-200">
                {isFilterActive ? "No Services Found" : "You have no enrolled services yet"}
            </h3>
            <p className="text-text-secondary dark:text-gray-400 mt-2">
                {isFilterActive ? "Try adjusting your filters or search query." : "Browse our service hub to find what you need."}
            </p>
            {!isFilterActive && (
                <button
                    onClick={() => setCurrentView('serviceHub')}
                    className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors mx-auto"
                >
                    <PlusIcon />
                    Browse Available Services
                </button>
            )}
        </div>
    );

    if (selectedService) {
        return <ServiceDetailView service={selectedService} onBack={() => setSelectedServiceId(null)} />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Your Services</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1">Track the progress and details of all your enrolled services.</p>
            </div>

            {/* Filter Bar */}
            {services.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        <label className="text-sm font-medium text-text-secondary dark:text-gray-400 flex-shrink-0">Status:</label>
                        {(['All', 'Active', 'Pending Action', 'Completed', 'On Hold'] as const).map(status => (
                            <button 
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors flex-shrink-0 ${statusFilter === status ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}


            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.length === 0 ? (
                    <NoServicesDisplay isFilterActive={false} />
                ) : filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} onViewDetails={() => setSelectedServiceId(service.id)} />
                    ))
                ) : (
                    <NoServicesDisplay isFilterActive={true} />
                )}
            </div>
        </div>
    );
};

export default EnrolledServiceView;
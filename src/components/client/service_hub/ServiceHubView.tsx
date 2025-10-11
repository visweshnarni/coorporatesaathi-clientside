import React, { useState, useMemo } from 'react';
import { AvailableService, ServiceCategory } from '../../../types';
import { mockAvailableServices } from './data';
import ServiceOfferingCard from './ServiceOfferingCard';
import { StoreIcon } from '../../icons/Icons';
import InquiryModal from './InquiryModal';

interface Props {
  searchQuery: string;
}

const ServiceHubView: React.FC<Props> = ({ searchQuery }) => {
    const [services] = useState<AvailableService[]>(mockAvailableServices);
    const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'All'>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<AvailableService | null>(null);

    const handleInquire = (service: AvailableService) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleSendInquiry = (message: string) => {
        alert(`Inquiry sent for "${selectedService?.name}":\n\n"${message}"\n\nOur team will get back to you shortly.`);
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const categoryMatch = categoryFilter === 'All' || service.category === categoryFilter;
            const searchMatch = searchQuery 
                ? service.name.toLowerCase().includes(searchQuery.toLowerCase()) || service.description.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            return categoryMatch && searchMatch;
        });
    }, [services, categoryFilter, searchQuery]);

    const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <StoreIcon className="w-12 h-12 mx-auto text-primary" />
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200 mt-2">Service Hub</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1 max-w-2xl mx-auto">Explore our range of professional services designed to help your business thrive. Find the right solution and get started today.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md sticky top-0 z-10">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <span className="text-sm font-medium text-text-secondary dark:text-gray-400 flex-shrink-0">Categories:</span>
                    {categories.map(category => (
                        <button 
                            key={category}
                            onClick={() => setCategoryFilter(category as any)}
                            className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors flex-shrink-0 ${categoryFilter === category ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <ServiceOfferingCard key={service.id} service={service} onInquire={handleInquire} />
                    ))
                ) : (
                    <div className="md:col-span-2 xl:col-span-3 text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-text-primary dark:text-gray-200">No Services Found</h3>
                        <p className="text-text-secondary dark:text-gray-400 mt-2">Your search or filter returned no results. Please try again.</p>
                    </div>
                )}
            </div>

            <InquiryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSendInquiry}
                service={selectedService}
            />
        </div>
    );
};

export default ServiceHubView;
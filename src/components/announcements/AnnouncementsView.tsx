
import React, { useState, useMemo } from 'react';
import { Announcement, Department } from '../../types';
import { mockAnnouncements } from './data';
// FIX: Added missing MegaphoneIcon import.
import { PlusIcon, MegaphoneIcon } from '../icons/Icons';
import AddEditAnnouncementModal from './AddEditAnnouncementModal';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementsView: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [filter, setFilter] = useState<'all' | Department>('all');

    const filteredAnnouncements = useMemo(() => {
        return announcements
            .filter(a => filter === 'all' || a.audience === filter || a.audience === 'Company-Wide')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [announcements, filter]);

    const handleSaveAnnouncement = (data: Omit<Announcement, 'id'>) => {
        const newAnnouncement: Announcement = {
            ...data,
            id: `anno-${Date.now()}`,
        };
        setAnnouncements(prev => [newAnnouncement, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-text-primary">Announcements</h2>
                     <p className="text-text-secondary mt-1">Share news and updates with your team.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <PlusIcon />
                    <span>Create Announcement</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-2">
                    <label htmlFor="audience-filter" className="text-sm font-medium text-text-secondary">Filter by department:</label>
                    <select 
                        id="audience-filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="p-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">All</option>
                        {(['IT', 'Finance', 'HR', 'Marketing'] as Department[]).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </div>

            <div className="space-y-6">
                {filteredAnnouncements.length > 0 ? (
                    filteredAnnouncements.map(announcement => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                         <MegaphoneIcon className="w-12 h-12 mx-auto text-gray-300" />
                        <h3 className="mt-2 text-xl font-semibold text-text-primary">No Announcements Found</h3>
                        <p className="text-text-secondary mt-2">Try adjusting your filter or create a new announcement.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <AddEditAnnouncementModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveAnnouncement}
                />
            )}
        </div>
    );
};

export default AnnouncementsView;
import React from 'react';
import { Consultant } from '../../../types';
import { mockConsultants } from './data';

const ConsultantCard: React.FC<{ consultant: Consultant }> = ({ consultant }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex items-center gap-4">
        <img src={consultant.avatar} alt={consultant.name} className="w-16 h-16 rounded-full" />
        <div>
            <h3 className="font-bold text-text-primary dark:text-gray-200">{consultant.name}</h3>
            <p className="text-sm font-semibold text-primary dark:text-blue-400">{consultant.specialty}</p>
            <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">{consultant.bio}</p>
        </div>
    </div>
);

const ConsultView: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Consultation request submitted! Our team will get in touch with you shortly to confirm the schedule.');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Consult an Expert</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1">Have a question? Schedule a consultation with one of our experts.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Our Experts</h3>
                    {mockConsultants.map(c => <ConsultantCard key={c.id} consultant={c} />)}
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                     <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Request a Consultation</h3>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic/Question *</label>
                            <input type="text" id="topic" required className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="e.g., Question about TDS filing" />
                        </div>
                        <div>
                             <label htmlFor="consultant" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Expert (Optional)</label>
                             <select id="consultant" className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white">
                                <option>Any available expert</option>
                                {mockConsultants.map(c => <option key={c.id}>{c.name} - {c.specialty}</option>)}
                             </select>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Notes</label>
                            <textarea id="notes" rows={4} className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" placeholder="Provide any additional details..."></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="px-5 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-700 transition">Submit Request</button>
                        </div>
                     </form>
                </div>
            </div>
        </div>
    );
};

export default ConsultView;

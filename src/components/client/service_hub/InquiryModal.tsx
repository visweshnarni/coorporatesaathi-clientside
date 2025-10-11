import React from 'react';
import { AvailableService } from '../../../types';
import { XIcon } from '../../icons/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  service: AvailableService | null;
}

const InquiryModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, service }) => {
  const [message, setMessage] = React.useState('');

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
        alert('Please enter your question.');
        return;
    }
    onSubmit(message);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-text-primary dark:text-gray-200">Inquiry about Service</h2>
            <p className="text-sm text-primary dark:text-blue-400">{service.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="w-5 h-5 text-text-secondary dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                    <input type="text" value="Rishabh Patle" readOnly className="w-full p-2 border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
                    <input type="email" value="rishabh@acmecorp.com" readOnly className="w-full p-2 border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md" />
                </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Question *</label>
              <textarea 
                id="message" 
                rows={5} 
                value={message}
                onChange={e => setMessage(e.target.value)}
                required 
                className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" 
                placeholder={`Ask a question about the "${service.name}" service...`}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3 p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">Submit Inquiry</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;

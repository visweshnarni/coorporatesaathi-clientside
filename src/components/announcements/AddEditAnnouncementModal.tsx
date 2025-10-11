
import React, { useState } from 'react';
import { Announcement, Department } from '../../types';
import { XIcon } from '../icons/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (announcement: Omit<Announcement, 'id'>) => void;
}

const AddEditAnnouncementModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audience, setAudience] = useState<'Company-Wide' | Department>('Company-Wide');
  const [priority, setPriority] = useState<'Normal' | 'Urgent'>('Normal');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in the title and content.');
      return;
    }
    onSave({
      title,
      content,
      audience,
      priority,
      imageUrl: imageUrl || undefined,
      author: 'Admin User',
      authorPosition: 'System Administrator',
      authorAvatar: 'https://picsum.photos/100/100',
      date: new Date().toISOString(),
    });
    // Reset form for next use
    setTitle('');
    setContent('');
    setImageUrl('');
    setAudience('Company-Wide');
    setPriority('Normal');
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-text-primary dark:text-gray-200">Create New Announcement</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="w-5 h-5 text-text-secondary dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input 
                type="text" 
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary"
                placeholder="e.g., System Maintenance Alert"
              />
            </div>
             <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
              <textarea
                id="content"
                rows={5}
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Write your announcement here..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image (Optional)</label>
              {imageUrl ? (
                <div className="relative group mt-1">
                  <img src={imageUrl} alt="Announcement preview" className="w-full h-auto max-h-48 object-cover rounded-md border border-gray-300 dark:border-gray-600"/>
                  <button 
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-1">
                    <label htmlFor="file-upload" className="relative cursor-pointer w-full flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <span>Choose Image</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>
              )}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Audience</label>
                    <select id="audience" value={audience} onChange={e => setAudience(e.target.value as any)} className="w-full p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary">
                        <option value="Company-Wide">Company-Wide</option>
                        {(['IT', 'Finance', 'HR', 'Marketing'] as Department[]).map(d => <option key={d} value={d}>{d} Department</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <div className="flex items-center gap-4 p-2 border border-gray-300 dark:border-gray-600 rounded-md">
                        <label className="flex items-center">
                            <input type="radio" name="priority" value="Normal" checked={priority === 'Normal'} onChange={() => setPriority('Normal')} className="form-radio text-primary focus:ring-primary"/>
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Normal</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="priority" value="Urgent" checked={priority === 'Urgent'} onChange={() => setPriority('Urgent')} className="form-radio text-red-500 focus:ring-red-500"/>
                            <span className="ml-2 text-sm text-red-600 font-semibold">Urgent</span>
                        </label>
                    </div>
                 </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3 p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition">Post Announcement</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditAnnouncementModal;

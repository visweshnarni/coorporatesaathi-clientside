import { CalendarEvent } from '../../../types';
import { mockEnrolledServices } from '../services/data';

// Dynamically generate calendar events from service deadlines
export const mockCalendarEvents: CalendarEvent[] = mockEnrolledServices
    .filter(service => service.nextActionDate) // Only include services that have a next action date
    .map((service, index) => ({
        id: `deadline-${service.id}`,
        title: `${service.name} - Action Due`,
        date: service.nextActionDate!,
        type: 'deadline',
    }));

// You can still add other static events if needed
mockCalendarEvents.push({
    id: 'consult-1',
    title: 'Follow-up with Priya',
    date: (() => {
        const today = new Date();
        today.setDate(today.getDate() + 5);
        return today.toISOString().split('T')[0];
    })(),
    type: 'consultation',
});

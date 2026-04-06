'use client';

import { Section } from '@/lib/api/types';
import { UpcomingEvents } from '@/components/upcoming-events';

interface EventsSectionProps {
    section: Section;
}

function EventsSection({ section }: EventsSectionProps) {
    if (!section || !section.id) {
        return <div className="text-center py-12 text-muted-foreground">Sección no disponible.</div>;
    }

    return (
        <div className="pt-6">
            <UpcomingEvents hideHeader />
        </div>
    );
}

export default EventsSection;

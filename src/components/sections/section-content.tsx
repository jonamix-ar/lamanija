'use client';

import { Section } from '@/lib/api/types';
import BlogSection from './types/blog-section';
import EventsSection from './types/events-section';
import GenericSection from './types/generic-section';

interface SectionContentProps {
    section: Section;
}

function SectionContent({ section }: SectionContentProps) {
    // Validar que section existe y está completa
    if (!section || !section.id || !section.slug || !section.type) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                La sección no está disponible.
            </div>
        );
    }

    // Renderizar componente específico según el tipo de sección
    switch (section.type.toLowerCase()) {
        case 'blog':
            return <BlogSection section={section} />;

        case 'events':
            return <EventsSection section={section} />;

        case 'music':
        case 'podcast':
        case 'store':
        case 'pages':
        default:
            return <GenericSection section={section} />;
    }
}

export default SectionContent;
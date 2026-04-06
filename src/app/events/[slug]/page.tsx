import { eventsApi } from '@/lib/api';
import { PageLayout } from '@/components/layout/page-layout';
import EventDetail from '@/components/events/event-detail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface EventPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generar metadata dinámico
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
    const { slug } = await params;

    // Validar que el slug existe
    if (!slug) {
        return {
            title: 'Evento no encontrado | La Manija Official',
        };
    }

    try {
        const event = await eventsApi.getBySlug(slug);

        return {
            title: `${event.title} | La Manija Official`,
            description: event.short_description || event.description || `Detalles del evento ${event.title}`,
        };
    } catch {
        return {
            title: 'Evento no encontrado | La Manija Official',
        };
    }
}

// Componente de página
export default async function EventPage({ params }: EventPageProps) {
    const { slug } = await params;

    // Validar que el slug existe
    if (!slug) {
        notFound();
    }

    let event;

    try {
        event = await eventsApi.getBySlug(slug);
    } catch {
        notFound();
    }

    // Verificación adicional de que event existe
    if (!event) {
        notFound();
    }

    return (
        <PageLayout>
            <EventDetail event={event} />
        </PageLayout>
    );
}

// Generar rutas estáticas para mejor performance
export async function generateStaticParams() {
    try {
        const eventsResponse = await eventsApi.getAll();
        const events = eventsResponse.data || [];

        return events
            .filter(event => event.status === 'published')
            .map((event) => ({
                slug: event.slug,
            }));
    } catch {
        return [];
    }
}
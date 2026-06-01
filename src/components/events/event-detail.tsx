'use client';

import { Event } from '@/lib/api/types';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Calendar, Clock, MapPin, Ticket, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';

interface EventDetailProps {
    event: Event;
}

function EventDetail({ event }: EventDetailProps) {
    const date = new Date(event.start_date);
    const formattedDate = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    return (
        <article className="max-w-4xl mx-auto">
            {/* Imagen hero */}
            <div className="relative rounded-xl overflow-hidden mb-8 aspect-video">
                <OptimizedImage
                    src={event.image || '/placeholder.svg'}
                    alt={event.image_alt || event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 896px"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />

                {/* Badges superiores */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {event.featured && (
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                            Destacado
                        </div>
                    )}
                    {event.sold_out && (
                        <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                            Agotado
                        </div>
                    )}
                    {event.free_entry && !event.sold_out && (
                        <div className="bg-accent text-accent-foreground px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                            Entrada libre
                        </div>
                    )}
                </div>

                {/* Fecha grande sobre imagen */}
                <div className="absolute bottom-4 left-4">
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2">
                        <span className="text-2xl font-extrabold text-primary">{date.getDate()}</span>
                        <span className="text-sm text-muted-foreground ml-2 uppercase">{date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                {event.title}
            </h1>

            {event.short_description && (
                <p className="text-lg text-muted-foreground mb-6">{event.short_description}</p>
            )}

            {/* Info card */}
            <div className="bg-card border border-border rounded-xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground capitalize">{formattedDate}</p>
                        {!event.hide_time && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {formattedTime}hs
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">{event.location}</p>
                        {event.address && <p className="text-xs text-muted-foreground">{event.address}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Ticket className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        {event.sold_out ? (
                            <p className="text-sm font-medium text-destructive">Agotado</p>
                        ) : event.free_entry ? (
                            <p className="text-sm font-medium text-accent">Entrada libre</p>
                        ) : event.ticket_url ? (
                            <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1">
                                Comprar entrada <ExternalLink className="w-3 h-3" />
                            </a>
                        ) : (
                            <p className="text-sm text-muted-foreground">Sin información de tickets</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Tickets si hay */}
            {event.has_tickets && event.active_tickets && event.active_tickets.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Entradas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {event.active_tickets.map((ticket) => (
                            <div key={ticket.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">{ticket.name}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {ticket.quantity ? `${ticket.quantity - ticket.sold} disponibles` : `${ticket.sold} vendidas`}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-primary">${ticket.price}</p>
                                    {ticket.is_sold_out && <p className="text-xs text-red-400">Agotado</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Descripción */}
            {event.description && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-3">Sobre el evento</h2>
                    <div className="prose-content text-foreground/90 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>
            )}

            {/* Nav */}
            <div className="pt-6 border-t border-border">
                <Link href="/section/eventos" className="text-primary hover:text-accent text-sm font-medium">
                    &larr; Volver a Eventos
                </Link>
            </div>
        </article>
    );
}

export default EventDetail;

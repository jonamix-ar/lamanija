"use client";

import { ArrowRight, Calendar, Clock, MapPin, Stars, Ticket } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useAllEvents } from "@/lib/api/hooks";
import Link from "next/link";

export function UpcomingEvents({ hideHeader = false, limit }: { hideHeader?: boolean; limit?: number }) {
    const { data: allEvents, isLoading, error } = useAllEvents();
    const events = limit && allEvents ? allEvents.slice(0, limit) : allEvents;

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit', hour12: true })
        };
    };

    if (isLoading) {
        return (
            <section>
                {!hideHeader && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3"><Calendar className="w-6 h-6 text-primary" /><h3 className="text-2xl font-semibold uppercase tracking-wide">Todos los Eventos</h3></div>
                    </div>
                )}
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">Cargando eventos...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                {!hideHeader && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3"><Calendar className="w-6 h-6 text-primary" /><h3 className="text-2xl font-semibold uppercase tracking-wide">Todos los Eventos</h3></div>
                    </div>
                )}
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-8 text-center">
                    <p className="text-destructive">Error al cargar eventos</p>
                </div>
            </section>
        );
    }

    if (!events || events.length === 0) {
        return (
            <section>
                {!hideHeader && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3"><Calendar className="w-6 h-6 text-primary" /><h3 className="text-2xl font-semibold uppercase tracking-wide">Todos los Eventos</h3></div>
                    </div>
                )}
                <div className="bg-muted/50 border border-border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">No hay eventos disponibles</p>
                </div>
            </section>
        );
    }

    return (
        <section>
            {!hideHeader && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3"><Calendar className="w-6 h-6 text-primary" /><h3 className="text-2xl font-semibold uppercase tracking-wide">Todos los Eventos</h3></div>
                    <Link href="/events" className="flex flex-row items-center justify-center text-[16px] text-muted-foreground font-normal hover:text-foreground transition-colors group">
                        Ver página de eventos
                        <ArrowRight
                            className="w-[22px] h-auto ml-[5px] text-muted-foreground transition-all duration-500 group-hover:text-primary"
                        />
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => {
                    const eventDateTime = formatEventDate(event.start_date);

                    return (
                        <Link
                            key={event.id}
                            href={`/events/${event.slug}`}
                            className="relative group cursor-pointer rounded-xl overflow-hidden bg-card hover:bg-card/90 transition-all duration-300 border border-border h-64 md:h-80 md:mt-8 block"
                        >
                            <div className="relative h-full">
                                <OptimizedImage
                                    src={event.image || `https://picsum.photos/400/300?random=event-${event.id}`}
                                    alt={event.image_alt || event.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover"
                                    fallbackSrc={`https://picsum.photos/400/300?random=event-${event.id}`}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/50 to-transparent" />
                            </div>

                            <div className="absolute inset-0 p-4 flex flex-col justify-between text-foreground">
                                {/* Botón de ticket en la esquina superior izquierda con tu estilo original */}
                                <div className="flex justify-between items-start">
                                    {event.has_tickets ? (
                                        <span
                                            className="absolute top-5 left-5 min-w-[130px] h-10 rounded-xl bg-primary inline-flex flex-row justify-center items-center text-primary-foreground text-sm z-2 font-medium px-[15px] border border-primary/20 pointer-events-none"
                                        >
                                            <Ticket className="w-4 h-4 mr-2" />
                                            Comprar entrada
                                        </span>
                                    ) : (
                                        <span
                                            className="absolute top-5 left-5 min-w-[130px] h-10 rounded-xl bg-secondary inline-flex flex-row justify-center items-center text-secondary-foreground text-sm z-2 font-medium px-[15px] border border-border pointer-events-none"
                                        >
                                            <Ticket className="w-4 h-4 mr-2" />
                                            Agotado
                                        </span>
                                    )}

                                    {/* Badge destacado en la esquina superior derecha */}
                                    {event.featured && (
                                        <div className="absolute top-5 right-5 bg-accent text-accent-foreground px-3 py-1 rounded-lg text-xs font-bold z-2 flex items-center">
                                            <Stars className="w-3 h-3 mr-1" />
                                            Destacado
                                        </div>
                                    )}
                                </div>

                                {/* Información del evento en la parte inferior */}
                                <div className="space-y-2">
                                    {/* Fecha */}
                                    <div className="text-sm text-muted-foreground flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {eventDateTime.date}
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {eventDateTime.time}
                                    </div>

                                    {/* Título del evento */}
                                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h4>

                                    {/* Ubicación */}
                                    <div className="text-sm text-muted-foreground flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span className="truncate">{event.address || event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

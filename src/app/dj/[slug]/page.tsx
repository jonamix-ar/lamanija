'use client';

import { useDJProfile } from '@/lib/api/hooks';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { TrackList } from '@/components/dj-profiles/track-list';
import { MapPin, Calendar, Disc3, Music, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import InstagramIcon from '@/components/icons/instagram-icon';
import SpotifyIcon from '@/components/icons/spotify-icon';
import SoundcloudIcon from '@/components/icons/soundcloud-icon';

export default function DJDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { data: profile, isLoading, error } = useDJProfile(slug);

    return (
        <MainLayout>
            {isLoading && (
                <div className="space-y-6">
                    <div className="h-[40vh] rounded-xl bg-card animate-pulse" />
                    <div className="h-8 w-1/2 bg-card animate-pulse rounded" />
                </div>
            )}

            {error && (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-bold mb-2">Perfil no encontrado</h2>
                    <p className="text-muted-foreground">El DJ que buscás no existe o no está disponible.</p>
                </div>
            )}

            {profile && (
                <article>
                    {/* Hero */}
                    <div className="relative rounded-xl overflow-hidden mb-8 -mx-4 sm:mx-0">
                        <div className="relative h-[40vh] min-h-[300px] max-h-[450px]">
                            {profile.image ? (
                                <Image
                                    src={profile.image}
                                    alt={profile.name}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-card flex items-center justify-center">
                                    <Music className="w-20 h-20 text-muted-foreground" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                            {/* Info sobre imagen */}
                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                                {/* Género badge */}
                                {profile.genre && (
                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide mb-3 inline-block">
                                        {profile.genre}
                                    </span>
                                )}

                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-none uppercase tracking-wide">
                                    {profile.name}
                                </h1>

                                {/* Meta */}
                                <div className="flex flex-wrap gap-4 mt-3 text-sm text-foreground/70">
                                    {profile.city && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {profile.city}{profile.country ? `, ${profile.country}` : ''}
                                        </span>
                                    )}
                                    {profile.years_active && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {profile.years_active}
                                        </span>
                                    )}
                                    {profile.record_label && (
                                        <span className="flex items-center gap-1">
                                            <Disc3 className="w-4 h-4" />
                                            {profile.record_label}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {/* Bio */}
                        {profile.bio && (
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {profile.bio}
                            </p>
                        )}

                        {/* Redes sociales */}
                        <div className="flex items-center gap-3 mb-10">
                            {profile.instagram_url && (
                                <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F]/10 transition-colors">
                                    <InstagramIcon className="w-5 h-5" />
                                </a>
                            )}
                            {profile.spotify_url && (
                                <a href={profile.spotify_url} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-[#1DB954] hover:bg-[#1DB954]/10 transition-colors">
                                    <SpotifyIcon className="w-5 h-5" />
                                </a>
                            )}
                            {profile.soundcloud_url && (
                                <a href={profile.soundcloud_url} target="_blank" rel="noopener noreferrer" aria-label="SoundCloud" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-[#FF5500] hover:bg-[#FF5500]/10 transition-colors">
                                    <SoundcloudIcon className="w-5 h-5" />
                                </a>
                            )}
                        </div>

                        {/* Próximos Eventos */}
                        {profile.upcoming_events && profile.upcoming_events.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-lg font-semibold text-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Próximos Eventos
                                </h2>
                                <div className="space-y-3">
                                    {profile.upcoming_events.map((event) => {
                                        const eventDate = new Date(event.start_date);
                                        const setTime = event.pivot?.set_time ? new Date(event.pivot.set_time) : null;
                                        return (
                                            <Link
                                                key={event.id}
                                                href={`/events/${event.slug}`}
                                                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                                            >
                                                <div className="text-center shrink-0 w-12">
                                                    <p className="text-xl font-extrabold text-primary leading-none">{eventDate.getDate()}</p>
                                                    <p className="text-[10px] uppercase text-muted-foreground">{eventDate.toLocaleDateString('es-ES', { month: 'short' })}</p>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{event.title}</h4>
                                                    <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground mt-0.5">
                                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                                                        {setTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{setTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}hs</span>}
                                                    </div>
                                                </div>
                                                {event.pivot?.role && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded shrink-0">
                                                        {event.pivot.role}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Tracks */}
                        {profile.active_tracks && profile.active_tracks.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-lg font-semibold text-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <Music className="w-5 h-5 text-primary" />
                                    Tracks
                                </h2>
                                <TrackList tracks={profile.active_tracks} />
                            </div>
                        )}

                        {/* Nav */}
                        <div className="pt-6 border-t border-border">
                            <Link href="/" className="text-primary hover:text-accent text-sm font-medium">
                                &larr; Volver al inicio
                            </Link>
                        </div>
                    </div>
                </article>
            )}
        </MainLayout>
    );
}

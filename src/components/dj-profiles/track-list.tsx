'use client';

import type { Track } from '@/lib/api/types';
import { ExternalLink, Music } from 'lucide-react';
import Image from 'next/image';

const platformColors: Record<string, string> = {
    spotify: 'text-green-500',
    soundcloud: 'text-orange-500',
    youtube: 'text-red-500',
    upload: 'text-primary',
    other: 'text-muted-foreground',
};

const platformLabels: Record<string, string> = {
    spotify: 'Spotify',
    soundcloud: 'SoundCloud',
    youtube: 'YouTube',
    upload: 'Audio',
    other: 'Link',
};

interface TrackListProps {
    tracks: Track[];
}

export function TrackList({ tracks }: TrackListProps) {
    if (!tracks || tracks.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No hay tracks disponibles.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {tracks.map((track, index) => (
                <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-card transition-colors group"
                >
                    {/* Número */}
                    <span className="text-sm text-muted-foreground w-6 text-right font-medium">
                        {index + 1}
                    </span>

                    {/* Cover */}
                    <div className="w-12 h-12 rounded overflow-hidden bg-secondary shrink-0">
                        {track.cover_image ? (
                            <Image
                                src={track.cover_image}
                                alt={track.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Music className="w-5 h-5 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                            {track.title}
                        </h5>
                        <p className="text-xs text-muted-foreground truncate">
                            {track.artist}
                            {track.genre && <span className="ml-2 text-muted-foreground/60">· {track.genre}</span>}
                        </p>
                    </div>

                    {/* Duración */}
                    {track.duration && (
                        <span className="text-xs text-muted-foreground hidden sm:block">
                            {track.duration}
                        </span>
                    )}

                    {/* Plataforma / Link */}
                    {track.external_url && (
                        <a
                            href={track.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-xs font-medium flex items-center gap-1 ${platformColors[track.platform] || platformColors.other} hover:underline`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {platformLabels[track.platform] || 'Link'}
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}

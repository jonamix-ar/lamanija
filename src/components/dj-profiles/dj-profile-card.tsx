'use client';

import type { DJProfile } from '@/lib/api/types';
import Link from 'next/link';
import Image from 'next/image';
import { Music, MapPin } from 'lucide-react';

interface DJProfileCardProps {
    profile: DJProfile;
}

export function DJProfileCard({ profile }: DJProfileCardProps) {
    return (
        <Link
            href={`/dj/${profile.slug}`}
            className="group relative block rounded-xl overflow-hidden cursor-pointer"
        >
            {/* Imagen */}
            <div className="aspect-square relative overflow-hidden bg-card">
                {profile.image ? (
                    <Image
                        src={profile.image}
                        alt={profile.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <Music className="w-12 h-12 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {profile.name}
                </h4>
                {profile.genre && (
                    <p className="text-xs text-primary font-medium uppercase tracking-wide">
                        {profile.genre}
                    </p>
                )}
                {profile.city && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {profile.city}{profile.country ? `, ${profile.country}` : ''}
                    </p>
                )}
            </div>
        </Link>
    );
}

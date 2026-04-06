'use client';

import { useFeaturedDJs } from '@/lib/api/hooks';
import { DJProfileCard } from '@/components/dj-profiles/dj-profile-card';
import { ArrowRight, Disc3 } from 'lucide-react';
import Link from 'next/link';

export function FeaturedDJs() {
    const { data: profiles, isLoading } = useFeaturedDJs(6);

    if (isLoading) {
        return (
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Disc3 className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold uppercase tracking-wide">DJs Destacados</h3>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            </section>
        );
    }

    if (!profiles || profiles.length === 0) return null;

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Disc3 className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold uppercase tracking-wide">DJs Destacados</h3>
                </div>
                <Link
                    href="/dj"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                    Ver todos
                    <ArrowRight className="w-5 h-5 group-hover:text-primary transition-colors" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {profiles.map((profile) => (
                    <DJProfileCard key={profile.id} profile={profile} />
                ))}
            </div>
        </section>
    );
}

'use client';

import { useSections } from '@/lib/api/hooks';
import { PostCard } from '@/components/posts/post-card';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/lib/api/types';

export function FeaturedPosts() {
    const { data: sections, isLoading } = useSections();

    // Extraer todos los posts de secciones tipo blog
    const allPosts: Post[] = (sections || [])
        .filter(s => s.type === 'blog' && s.posts && s.posts.length > 0)
        .flatMap(s => s.posts || [])
        .sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
        .slice(0, 6);

    // Encontrar el slug de la primera sección blog para el link "Ver todas"
    const blogSection = (sections || []).find(s => s.type === 'blog');

    if (isLoading) {
        return (
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold uppercase tracking-wide">Últimas Notas</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="aspect-3/4 rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            </section>
        );
    }

    if (allPosts.length === 0) return null;

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold uppercase tracking-wide">Últimas Notas</h3>
                    </div>
                {blogSection && (
                    <Link
                        href={`/section/${blogSection.slug}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        Ver todas
                        <ArrowRight className="w-5 h-5 group-hover:text-primary transition-colors" />
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

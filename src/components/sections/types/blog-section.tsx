'use client';

import { Section } from '@/lib/api/types';
import { useSectionPosts } from '@/lib/api/hooks';
import PostsGrid from '@/components/posts/posts-grid';
import { useState } from 'react';

interface BlogSectionProps {
    section: Section;
}

function BlogSection({ section }: BlogSectionProps) {
    const [page, setPage] = useState(1);

    const shouldFetch = section && section.slug && section.slug !== 'undefined' && section.slug.trim() !== '';

    const { data, isLoading, error } = useSectionPosts(
        shouldFetch ? section.slug : '',
        shouldFetch ? { per_page: 12, page } : undefined
    );

    if (!shouldFetch) {
        return <div className="text-center py-12 text-muted-foreground">Sección no configurada.</div>;
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                <div className="aspect-3/4 rounded-xl bg-card animate-pulse" />
                <div className="aspect-3/4 rounded-xl bg-card animate-pulse" />
                <div className="aspect-3/4 rounded-xl bg-card animate-pulse" />
                <div className="aspect-3/4 rounded-xl bg-card animate-pulse hidden md:block" />
                <div className="aspect-3/4 rounded-xl bg-card animate-pulse hidden lg:block" />
                <div className="aspect-3/4 rounded-xl bg-card animate-pulse hidden lg:block" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-12 text-red-400">Error al cargar el contenido.</div>;
    }

    if (!data || !data.posts || data.posts.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Sin contenido aún</h3>
                <p className="text-muted-foreground text-sm">Próximamente habrá notas en esta sección.</p>
            </div>
        );
    }

    return (
        <div className="pt-6">
            <PostsGrid posts={data.posts} />

            {data.pagination && data.pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-3 mt-10">
                    <button
                        type="button"
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        disabled={page <= 1}
                        className="px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Anterior
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: data.pagination.last_page }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPage(p)}
                                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={page >= data.pagination.last_page}
                        className="px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}

export default BlogSection;

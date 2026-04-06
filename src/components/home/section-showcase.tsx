'use client';

import { useSections } from '@/lib/api/hooks';
import { PostCard } from '@/components/posts/post-card';
import { ArrowRight, Newspaper } from 'lucide-react';
import Link from 'next/link';

interface SectionShowcaseProps {
    maxSections?: number;
}

export function SectionShowcase({ maxSections = 3 }: SectionShowcaseProps) {
    const { data: sections, isLoading } = useSections();

    // Filtrar secciones blog con posts, limitar a maxSections
    const blogSections = (sections || [])
        .filter(s => s.type === 'blog' && s.show_in_menu && s.posts && s.posts.length > 0)
        .sort((a, b) => a.position - b.position)
        .slice(0, maxSections);

    if (isLoading || blogSections.length === 0) return null;

    return (
        <div className="space-y-16">
            {blogSections.map((section) => {
                const posts = (section.posts || [])
                    .sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
                    .slice(0, 4);

                if (posts.length === 0) return null;

                return (
                    <section key={section.id}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Newspaper className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-semibold uppercase tracking-wide">
                                    {section.name}
                                </h3>
                            </div>
                            <Link
                                href={`/section/${section.slug}`}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                            >
                                Ver todas
                                <ArrowRight className="w-5 h-5 group-hover:text-primary transition-colors" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

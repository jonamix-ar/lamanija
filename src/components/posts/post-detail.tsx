'use client';

import type { Post } from '@/lib/api/types';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Calendar, Tag, Mail } from 'lucide-react';
import Link from 'next/link';
import FacebookIcon from '../icons/facebook-icon';
import XIcon from '../icons/x-icon';
import WhatsappIcon from '../icons/whatsapp-icon';

interface PostDetailProps {
    post: Post;
}

function PostDetail({ post }: PostDetailProps) {
    const formattedDate = post.date_published
        ? new Date(post.date_published).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareToFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    const shareToTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
    const shareToWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${shareUrl}`)}`, '_blank');
    const shareByEmail = () => { window.location.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${post.title}\n\n${shareUrl}`)}`; };

    return (
        <article>
            {/* Hero con imagen */}
            <div className="relative rounded-xl overflow-hidden mb-8 -mx-4 sm:mx-0">
                <div className="relative h-[50vh] min-h-[320px] max-h-[500px]">
                    {post.image ? (
                        <OptimizedImage
                            src={post.image}
                            alt={post.image_alt || post.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                            fetchPriority="high"
                        />
                    ) : (
                        <div className="w-full h-full bg-card" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                    {/* Contenido sobre imagen */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                        <div className="max-w-3xl">
                            {/* Categoría + fecha */}
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                {post.category && (
                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                                        {post.category.name}
                                    </span>
                                )}
                                {formattedDate && (
                                    <span className="text-xs text-foreground/70 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formattedDate}
                                    </span>
                                )}
                            </div>

                            {/* Título */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                                {post.title}
                            </h1>

                            {/* Autor */}
                            {post.author && (
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                                        <span className="text-primary-foreground text-xs font-bold">{post.author.name.charAt(0)}</span>
                                    </div>
                                    <span className="text-sm text-foreground/80">{post.author.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-3xl mx-auto">
                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium">
                        {post.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                )}

                {/* Body */}
                <div className="prose-content text-foreground/90 text-base sm:text-lg leading-relaxed sm:leading-8 mb-10" dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="pt-6 border-t border-border mb-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            {post.tags.map((tag) => (
                                <span key={tag} className="bg-card text-muted-foreground px-3 py-1 rounded-full text-xs">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Compartir */}
                <div className="flex flex-wrap items-center gap-2 py-6 border-t border-border mb-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">Compartir</span>
                    <button type="button" onClick={shareToFacebook} className="w-9 h-9 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors">
                        <FacebookIcon className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={shareToTwitter} className="w-9 h-9 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors">
                        <XIcon className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={shareToWhatsApp} className="w-9 h-9 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:bg-[#25D366]/10 transition-colors">
                        <WhatsappIcon className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={shareByEmail} className="w-9 h-9 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Mail className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav */}
                <div className="flex flex-wrap gap-3">
                    {post.section && (
                        <Link href={`/section/${post.section.slug}`} className="text-primary hover:text-accent text-sm font-medium">
                            &larr; {post.section.name}
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}

export default PostDetail;

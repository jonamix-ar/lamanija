'use client';

import { Post } from '@/lib/api/types';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link
            href={`/posts/${post.slug}`}
            className="group relative block aspect-3/4 rounded-xl overflow-hidden cursor-pointer"
        >
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
                <OptimizedImage
                    src={post.image || '/placeholder.svg'}
                    alt={post.image_alt || post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Gradiente oscuro de abajo hacia arriba */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

            {/* Elemento decorativo superior derecho */}
            <div className="absolute top-5 right-5 w-3 h-3 bg-primary" />

            {/* Contenido inferior */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
                {/* Categoría */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 font-medium">
                    <span>NOTA</span>
                    {post.category && (
                        <>
                            <span className="text-white/40">/</span>
                            <span>{post.category.name}</span>
                        </>
                    )}
                </div>

                {/* Título en dorado — limitado a 3 líneas para no tapar la imagen */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight text-primary group-hover:text-accent transition-colors line-clamp-3">
                    {post.title}
                </h3>

                {/* Línea inferior con cuadrado decorativo */}
                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-white/10">
                    <div className="w-2 h-2 bg-primary" />
                    <span className="text-xs text-white/60">
                        Leela completa en lamanijaofficial.com
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;

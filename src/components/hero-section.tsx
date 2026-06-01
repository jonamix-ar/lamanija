"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useSections } from "@/lib/api/hooks"
import { OptimizedImage } from "@/components/ui/optimized-image"
import Link from "next/link"
import type { Post } from "@/lib/api/types"

export function HeroSection() {
    const { data: sections } = useSections()
    const [currentSlide, setCurrentSlide] = useState(0)

    // Todos los posts publicados de secciones blog
    const blogPosts: Post[] = (sections || [])
        .filter(s => s.type === 'blog' && s.posts && s.posts.length > 0)
        .flatMap(s => s.posts || [])
        .sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())

    // Si hay posts marcados como destacados, usar esos; si no, fallback a los 3 más recientes
    const featuredPosts = blogPosts.filter(p => p.featured)
    const recentPosts: Post[] = featuredPosts.length > 0
        ? featuredPosts.slice(0, 5)
        : blogPosts.slice(0, 3)

    const hasSlides = recentPosts.length > 0

    useEffect(() => {
        if (!hasSlides) return
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % recentPosts.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [hasSlides, recentPosts.length])

    const goToSlide = (index: number) => setCurrentSlide(index)
    const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + recentPosts.length) % recentPosts.length)
    const goToNext = () => setCurrentSlide((prev) => (prev + 1) % recentPosts.length)

    // Fallback estático si no hay posts
    if (!hasSlides) {
        return (
            <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden rounded-xl bg-card flex items-center justify-center">
                <div className="text-center space-y-6 px-8">
                    <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wide text-primary">
                        La Manija Official
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        El mejor contenido de la industria del entretenimiento y la música electrónica.
                    </p>
                </div>
                <div className="absolute top-6 right-6 w-4 h-4 bg-primary" />
            </section>
        )
    }

    return (
        <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden rounded-xl">
            {recentPosts.map((post, index) => (
                <div
                    key={post.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                    {/* Imagen de fondo */}
                    <div className="absolute inset-0">
                        {post.image ? (
                            <OptimizedImage
                                src={post.image}
                                alt={post.image_alt || post.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority={index === 0}
                                fetchPriority={index === 0 ? "high" : "auto"}
                            />
                        ) : (
                            <div className="w-full h-full bg-secondary" />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/50 to-background/20" />
                    </div>

                    {/* Contenido */}
                    <div className="relative h-full flex items-end px-6 md:px-10 lg:px-14 pb-20">
                        <div className="max-w-3xl space-y-4">
                            {/* Categoría */}
                            {post.category && (
                                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                                    {post.category.name}
                                </span>
                            )}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none uppercase tracking-wide">
                                {post.title}
                            </h2>
                            {post.excerpt && (
                                <p className="text-base text-muted-foreground max-w-lg line-clamp-2">
                                    {post.excerpt.replace(/<[^>]*>/g, '')}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wide">
                                    <Link href={`/posts/${post.slug}`}>Leer más</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Cuadrado decorativo */}
                    <div className="absolute top-6 right-6 w-4 h-4 bg-primary" />
                </div>
            ))}

            {/* Controles */}
            {recentPosts.length > 1 && (
                <div className="absolute bottom-6 right-6 flex items-center gap-4">
                    <div className="flex gap-1">
                        {recentPosts.map((post, index) => (
                            <button
                                key={`dot-${post.id}`}
                                type="button"
                                onClick={() => goToSlide(index)}
                                className="flex items-center justify-center w-10 h-10"
                                aria-label={`Ir al slide ${index + 1}`}
                            >
                                <span className={`block h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/30"}`} />
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={goToPrevious}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={goToNext}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

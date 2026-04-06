'use client';

import { ShoppingBag, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

interface Product {
    id: number;
    name: string;
    slug: string;
    price?: string;
    image?: string;
    store_url?: string;
    store_name?: string;
    tag?: string;
    is_active: boolean;
}

export function ProductsShowcase() {
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await apiClient.get('/products');
            return res as unknown as Product[];
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold uppercase tracking-wide">Tienda</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="aspect-4/5 rounded-xl bg-card animate-pulse" />
                    <div className="aspect-4/5 rounded-xl bg-card animate-pulse" />
                    <div className="aspect-4/5 rounded-xl bg-card animate-pulse" />
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) return null;

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold uppercase tracking-wide">Tienda</h3>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                    <a
                        key={product.id}
                        href={product.store_url || '#'}
                        target={product.store_url ? '_blank' : undefined}
                        rel={product.store_url ? 'noopener noreferrer' : undefined}
                        className="group cursor-pointer block"
                    >
                        <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-card mb-3">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                                </div>
                            )}
                            {/* Hover overlay */}
                            {product.store_url && (
                                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-primary font-semibold text-sm uppercase tracking-wide flex items-center gap-1">
                                        {product.store_name || 'Comprar'} <ExternalLink className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            )}
                            {/* Tag */}
                            {product.tag && (
                                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                    {product.tag}
                                </div>
                            )}
                        </div>
                        <h4 className="font-medium text-sm truncate">{product.name}</h4>
                        {product.price && <p className="text-primary font-bold text-sm">{product.price}</p>}
                    </a>
                ))}
            </div>
        </section>
    );
}

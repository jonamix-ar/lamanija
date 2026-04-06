'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
    fallbackSrc?: string;
    showFallback?: boolean;
}

export function OptimizedImage({
    src,
    alt,
    fallbackSrc = '/placeholder.svg',
    showFallback = true,
    unoptimized,
    ...props
}: OptimizedImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        console.error('Error loading image:', imageSrc);
        if (!hasError && showFallback && fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
    };

    // En dev, las imágenes remotas fallan con el optimizador. En prod funciona bien.
    const isRemote = typeof imageSrc === 'string' && imageSrc.startsWith('http');
    const shouldUseUnoptimized = unoptimized ?? (process.env.NODE_ENV === 'development' && isRemote);

    // Default responsive sizes si no se provee y es fill
    const defaultSizes = props.fill && !props.sizes
        ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        : props.sizes;

    return (
        <Image
            {...props}
            src={imageSrc}
            alt={alt}
            sizes={defaultSizes}
            onError={handleError}
            unoptimized={shouldUseUnoptimized}
        />
    );
}
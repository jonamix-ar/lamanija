import { useState } from 'react';

interface UseImageFallbackProps {
  src: string;
  fallbackSrc?: string;
}

export function useImageFallback({ src, fallbackSrc }: UseImageFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return {
    src: imageSrc,
    onError: handleError,
    hasError,
  };
}
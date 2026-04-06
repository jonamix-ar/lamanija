// Página de prueba para verificar las imágenes
'use client';

import { OptimizedImage } from '@/components/ui/optimized-image';

export default function TestImagePage() {
  const testImageUrl = 'http://127.0.0.1:8000/storage/posts/owiM4UvfQkEXB0ZKUz4v20S8NzSwP8IpgFV1wH4Z.webp';

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Test de Imagen</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Imagen con OptimizedImage:</h2>
          <OptimizedImage
            src={testImageUrl}
            alt="Test image"
            width={640}
            height={360}
            className="border rounded"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">URL de la imagen:</h2>
          <p className="text-sm text-gray-600 break-all">{testImageUrl}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Test con imagen HTML normal:</h2>
          <img 
            src={testImageUrl} 
            alt="Test image" 
            style={{ maxWidth: '640px', maxHeight: '360px' }}
            onError={(e) => {
              console.error('Error loading image with img tag:', e);
              e.currentTarget.style.border = '2px solid red';
            }}
          />
        </div>
      </div>
    </div>
  );
}
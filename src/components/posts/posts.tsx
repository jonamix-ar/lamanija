'use client';

import { usePosts } from '@/lib/api/hooks';
import PostsGrid from './posts-grid';

export function Posts() {
  const { data: postsResponse, isLoading, error } = usePosts({
    per_page: 12,
    page: 1
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 aspect-video rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error al cargar los posts</p>
      </div>
    );
  }

  const posts = postsResponse?.posts || [];

  return <PostsGrid posts={posts} />;
}
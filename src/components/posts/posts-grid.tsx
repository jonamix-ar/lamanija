import { Post } from '@/lib/api/types';
import PostCard from './post-card';

interface PostsGridProps {
  posts: Post[];
  className?: string;
}

function PostsGrid({ posts, className = '' }: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">No hay posts disponibles.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsGrid;
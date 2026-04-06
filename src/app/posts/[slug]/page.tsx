import { postsApi } from '@/lib/api';
import { PageLayout } from '@/components/layout/page-layout';
import PostDetail from '@/components/posts/post-detail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generar metadata dinámico
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;

    // Validar que el slug existe
    if (!slug) {
        return {
            title: 'Artículo no encontrado | La Manija Official',
        };
    }

    try {
        const post = await postsApi.getBySlug(slug);

        return {
            title: `${post.title} | La Manija Official`,
            description: post.excerpt || post.content?.substring(0, 160) || `Lee el artículo completo: ${post.title}`,
            openGraph: {
                title: post.title,
                description: post.excerpt || post.content?.substring(0, 160),
                images: post.image ? [{ url: post.image }] : undefined,
            },
        };
    } catch {
        return {
            title: 'Artículo no encontrado | La Manija Official',
        };
    }
}

// Componente de página
export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;

    // Validar que el slug existe
    if (!slug) {
        notFound();
    }

    let post;

    try {
        post = await postsApi.getBySlug(slug);
    } catch {
        notFound();
    }

    // Verificación adicional de que post existe
    if (!post) {
        notFound();
    }

    return (
        <PageLayout
            description={post.excerpt || `Lee el artículo completo: ${post.title}`}
        >
            <PostDetail post={post} />
        </PageLayout>
    );
}

// Generar rutas estáticas para mejor performance
export async function generateStaticParams() {
    try {
        const postsResponse = await postsApi.getAll();
        const posts = postsResponse.posts || [];

        return posts
            .filter(post => post.status === 'published')
            .map((post) => ({
                slug: post.slug,
            }));
    } catch {
        return [];
    }
}
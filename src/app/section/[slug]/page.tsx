import { sectionsApi } from '@/lib/api';
import { PageLayout } from '@/components/layout/page-layout';
import SectionHeader from '@/components/sections/section-header';
import SectionContent from '@/components/sections/section-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Section } from '@/types';

interface SectionPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
    const { slug } = await params;
    if (!slug) return { title: 'Sección no encontrada | La Manija Official' };

    try {
        const section = await sectionsApi.getBySlug(slug);
        return {
            title: `${section.name} | La Manija Official`,
            description: section.description || `Contenido de ${section.name} en La Manija Official`,
        };
    } catch {
        return { title: 'Sección no encontrada | La Manija Official' };
    }
}

export default async function SectionPage({ params }: SectionPageProps) {
    const { slug } = await params;
    if (!slug) notFound();

    let section: Section;
    try {
        section = await sectionsApi.getBySlug(slug);
    } catch {
        notFound();
    }

    if (!section) notFound();

    return (
        <PageLayout>
            <SectionHeader section={section} />
            <SectionContent section={section} />
        </PageLayout>
    );
}

export async function generateStaticParams() {
    try {
        const sections = await sectionsApi.getAll();
        return sections
            .filter(section => section.show_in_menu)
            .map((section) => ({ slug: section.slug }));
    } catch {
        return [];
    }
}

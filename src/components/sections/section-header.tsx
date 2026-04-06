import { Section } from '@/lib/api/types';
import Link from 'next/link';

interface SectionHeaderProps {
    section: Section;
}

function SectionHeader({ section }: SectionHeaderProps) {
    if (!section || !section.id || !section.name) {
        return (
            <div className="py-8">
                <h1 className="text-3xl font-extrabold text-foreground">Sección no encontrada</h1>
            </div>
        );
    }

    return (
        <div className="py-6">
            {/* Breadcrumb */}
            <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
                <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                <span>/</span>
                <span className="text-foreground">{section.name}</span>
            </nav>

            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground uppercase tracking-wide leading-none">
                        {section.name}
                    </h1>
                    {section.description && (
                        <p className="text-muted-foreground mt-3 max-w-xl">
                            {section.description}
                        </p>
                    )}
                </div>

                {section.posts_count && section.posts_count > 0 && (
                    <span className="text-sm text-muted-foreground shrink-0">
                        {section.posts_count} notas
                    </span>
                )}
            </div>

            {/* Línea decorativa gold */}
            <div className="mt-4 flex items-center gap-2">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <div className="h-1 flex-1 bg-border rounded-full" />
            </div>
        </div>
    );
}

export default SectionHeader;

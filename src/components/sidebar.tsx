'use client';

import { Home, Music, Calendar, Mic, FileText, ShoppingBag, Newspaper } from "lucide-react";
import { useSections } from "@/lib/api/hooks";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Mapeo de tipos de sección a iconos
const sectionIcons: { [key: string]: any } = {
    'blog': Newspaper,
    'music': Music,
    'events': Calendar,
    'podcast': Mic,
    'store': ShoppingBag,
    'pages': FileText,
    'default': Music
};

export function Sidebar() {
    const { data: sections, isLoading, error } = useSections();
    const pathname = usePathname();

    // Items estáticos del menú
    const staticItems = [
        { icon: Home, label: "Home", href: "/" },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-border hidden lg:block overflow-y-auto">
            <div className="h-16 px-4 border-b border-border flex items-center">
                <Link href="/">
                    <Image
                        src="/images/logo/logo-dark.png"
                        alt="La Manija Official"
                        width={180}
                        height={30}
                        className="h-8 w-auto"
                        priority
                    />
                </Link>
            </div>

            <nav className="p-4 space-y-1">
                {/* Items estáticos */}
                {staticItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-sidebar-foreground hover:bg-sidebar-accent"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}

                {/* Separador - solo si hay secciones */}
                {sections && sections.length > 0 && (
                    <div className="h-px bg-border my-2"></div>
                )}

                {/* Loading state */}
                {isLoading && (
                    <div className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground">
                        <div className="w-5 h-5 bg-muted rounded animate-pulse"></div>
                        <div className="h-4 bg-muted rounded animate-pulse flex-1"></div>
                    </div>
                )}

                {/* Error state */}
                {error && !isLoading && (
                    <div className="flex items-center gap-3 px-4 py-3 text-red-500 text-sm">
                        <FileText className="w-5 h-5" />
                        <span>Error al cargar secciones</span>
                    </div>
                )}

                {/* Secciones dinámicas */}
                {sections && !isLoading && sections
                    .filter(section => section.show_in_menu)
                    .sort((a, b) => a.position - b.position)
                    .map((section) => {
                        const IconComponent = sectionIcons[section.type.toLowerCase()] || sectionIcons.default;
                        const isActive = pathname === `/section/${section.slug}`;
                        return (
                            <Link
                                key={section.id}
                                href={`/section/${section.slug}`}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                                    }`}
                            >
                                <IconComponent className="w-5 h-5" />
                                <span className="text-sm font-medium">{section.name}</span>
                                {section.posts_count && section.posts_count > 0 && (
                                    <span className={`text-xs px-2 py-1 rounded-full ml-auto ${isActive
                                        ? "bg-primary-foreground/20 text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                        }`}>
                                        {section.posts_count}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
            </nav>
        </aside>
    );
}
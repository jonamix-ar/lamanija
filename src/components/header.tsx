'use client';

import { Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSections } from "@/lib/api/hooks"
import { useSettingsContext } from "@/lib/settings-context"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import InstagramIcon from "@/components/icons/instagram-icon"
import XIcon from "@/components/icons/x-icon"

export function Header() {
    const { data: sections } = useSections();
    const settings = useSettingsContext();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Bloquear scroll cuando menú está abierto
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const menuSections = (sections || [])
        .filter(s => s.show_in_menu)
        .sort((a, b) => a.position - b.position);

    const navLinks = [
        { label: "Inicio", href: "/" },
        ...menuSections.map(s => ({ label: s.name, href: `/section/${s.slug}` })),
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                    {/* Izquierda: Logo (solo mobile, en desktop lo muestra el sidebar) */}
                    <Link href="/" className="shrink-0 lg:hidden">
                        <Image
                            src="/images/logo/logo-dark.png"
                            alt="La Manija Official"
                            width={180}
                            height={30}
                            className="h-7 w-auto"
                            priority
                        />
                    </Link>

                    {/* Centro: Nav desktop */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${pathname === link.href
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Derecha */}
                    <div className="flex items-center gap-2.5">
                        {/* Sociales desktop */}
                        <div className="hidden lg:flex items-center gap-2 mr-2">
                            <a href={settings.social.instagram_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                                <InstagramIcon className="w-5 h-5" />
                            </a>
                            <a href={settings.social.x_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-muted-foreground hover:text-foreground transition-colors">
                                <XIcon className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Botón Eventos/Tickets */}
                        <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wide text-xs h-9 lg:h-8 px-3 rounded-lg">
                            <Link href="/section/eventos" aria-label="Ver eventos" className="flex items-center gap-1.5">
                                <Ticket className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                                <span className="hidden sm:inline">Eventos</span>
                            </Link>
                        </Button>

                        {/* Hamburguesa animada mobile */}
                        <button
                            type="button"
                            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <div className="w-5 h-4 relative flex flex-col justify-between">
                                <span className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                                <span className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                                <span className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu mobile con animación */}
            <div className={`fixed inset-0 z-40 bg-background lg:hidden transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                style={{ top: '64px' }}>
                <nav className={`px-4 pt-6 space-y-1 transition-all duration-300 delay-75 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-3.5 rounded-xl text-lg font-medium transition-all duration-300 ${pathname === link.href
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-muted"
                                }`}
                            style={{ transitionDelay: mobileMenuOpen ? `${(i + 1) * 50}ms` : '0ms' }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={`flex items-center gap-5 mt-8 px-8 transition-all duration-300 delay-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                    <a href={settings.social.instagram_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                        <InstagramIcon className="w-7 h-7" />
                    </a>
                    <a href={settings.social.x_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-muted-foreground hover:text-primary transition-colors">
                        <XIcon className="w-7 h-7" />
                    </a>
                </div>
            </div>
        </>
    )
}

'use client';

import { useSections } from "@/lib/api/hooks";
import { useSettingsContext } from "@/lib/settings-context";
import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "@/components/icons/instagram-icon";
import FacebookIcon from "@/components/icons/facebook-icon";
import XIcon from "@/components/icons/x-icon";

export function Footer() {
    const { data: sections } = useSections();
    const settings = useSettingsContext();

    const menuSections = (sections || [])
        .filter(s => s.show_in_menu)
        .sort((a, b) => a.position - b.position);

    return (
        <footer className="bg-card border-t border-border mt-16">
            <div className="px-4 md:px-8 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Image
                            src="/images/logo/logo-dark.png"
                            alt="La Manija Official"
                            width={180}
                            height={30}
                            className="h-7 w-auto"
                        />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {settings.branding.site_description || 'Publicidad y promoción para DJs, productores/as, y fiestas de música electrónica.'}
                        </p>
                        <div className="flex items-center gap-3">
                            <a href={settings.social.instagram_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                                <InstagramIcon className="w-5 h-5" />
                            </a>
                            <a href={settings.social.facebook_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                                <FacebookIcon className="w-5 h-5" />
                            </a>
                            <a href={settings.social.x_url || '#'} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-muted-foreground hover:text-primary transition-colors">
                                <XIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navegación */}
                    <div>
                        <h4 className="font-semibold mb-4 uppercase tracking-wide text-sm">Navegación</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="hover:text-foreground transition-colors">Contacto</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Secciones dinámicas */}
                    <div>
                        <h4 className="font-semibold mb-4 uppercase tracking-wide text-sm">Secciones</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {menuSections.map((section) => (
                                <li key={section.id}>
                                    <Link href={`/section/${section.slug}`} className="hover:text-foreground transition-colors">
                                        {section.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 uppercase tracking-wide text-sm">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/terminos" className="hover:text-foreground transition-colors">Términos</Link>
                            </li>
                            <li>
                                <Link href="/privacidad" className="hover:text-foreground transition-colors">Privacidad</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-border text-sm text-muted-foreground">
                    <p>&copy; La Manija Official, 2025.</p>
                </div>
            </div>
        </footer>
    )
}

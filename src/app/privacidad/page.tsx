import { MainLayout } from '@/components/layout/main-layout';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de Privacidad | La Manija Official',
    description: 'Política de privacidad de lamanijaofficial.com.ar',
};

export default function PrivacidadPage() {
    return (
        <MainLayout>
            <article className="max-w-3xl mx-auto py-8">
                {/* Header */}
                <div className="mb-10">
                    <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
                        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                        <span>/</span>
                        <span className="text-foreground">Política de Privacidad</span>
                    </nav>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                        Política de Privacidad
                    </h1>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-1 w-12 bg-primary rounded-full" />
                        <div className="h-1 flex-1 bg-border rounded-full" />
                    </div>
                    <p className="text-muted-foreground">Última actualización: Abril 2026</p>
                </div>

                <div className="prose-content text-foreground/90 text-base leading-relaxed space-y-8">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <p>En <strong className="text-primary">La Manija Official</strong> nos comprometemos a proteger la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizás nuestro sitio web, servicios de promoción de DJs, eventos y contenido editorial.</p>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">1</span>
                            Información que Recopilamos
                        </h2>
                        <div className="space-y-3 pl-11">
                            <p><strong className="text-foreground">Datos de contacto:</strong> Nombre, email y teléfono cuando nos contactás a través del formulario de contacto o WhatsApp.</p>
                            <p><strong className="text-foreground">Datos de perfil DJ:</strong> Nombre artístico, biografía, género musical, ciudad, redes sociales y tracks cuando un DJ se registra para ser promocionado.</p>
                            <p><strong className="text-foreground">Datos de navegación:</strong> Información técnica como dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, recopilados mediante cookies.</p>
                            <p><strong className="text-foreground">Datos de eventos:</strong> Información sobre compra de entradas cuando se realizan a través de plataformas de terceros vinculadas desde el Sitio.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</span>
                            Uso de la Información
                        </h2>
                        <div className="space-y-3 pl-11">
                            <p>Utilizamos la información recopilada para:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Responder consultas recibidas a través del formulario de contacto</li>
                                <li>Gestionar y publicar perfiles de DJs y productores</li>
                                <li>Promocionar eventos y fiestas de música electrónica</li>
                                <li>Mejorar la experiencia de navegación y personalizar contenido</li>
                                <li>Enviar comunicaciones relacionadas con nuestros servicios (con consentimiento previo)</li>
                                <li>Generar estadísticas anónimas de uso del Sitio</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</span>
                            Cookies
                        </h2>
                        <div className="pl-11">
                            <p>Utilizamos cookies para mejorar tu experiencia en el Sitio. Las cookies nos permiten recordar tus preferencias, analizar el tráfico y ofrecer contenido personalizado. Podés configurar tu navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del Sitio.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">4</span>
                            Compartir Información
                        </h2>
                        <div className="pl-11">
                            <p>No vendemos ni compartimos tu información personal con terceros, excepto en los siguientes casos:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>Cuando sea necesario para la prestación del servicio (ej: plataformas de venta de entradas)</li>
                                <li>Cuando sea requerido por ley o autoridad competente</li>
                                <li>Con tu consentimiento expreso</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">5</span>
                            Seguridad
                        </h2>
                        <div className="pl-11">
                            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">6</span>
                            Tus Derechos
                        </h2>
                        <div className="pl-11">
                            <p>Conforme a la Ley N° 25.326 de Protección de Datos Personales de la República Argentina, tenés derecho a:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>Acceder a tus datos personales</li>
                                <li>Solicitar la rectificación de datos inexactos</li>
                                <li>Solicitar la supresión de tus datos</li>
                                <li>Oponerte al tratamiento de tus datos</li>
                            </ul>
                            <p className="mt-3">Para ejercer estos derechos, contactanos a: <a href="mailto:lamanijaofficial@gmail.com" className="text-primary hover:text-accent">lamanijaofficial@gmail.com</a></p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">7</span>
                            Contacto
                        </h2>
                        <div className="pl-11">
                            <p>Para cualquier consulta sobre esta Política de Privacidad, podés contactarnos a:</p>
                            <div className="bg-card border border-border rounded-lg p-4 mt-3">
                                <p className="font-semibold text-foreground">La Manija Official</p>
                                <p className="text-muted-foreground text-sm">Email: <a href="mailto:lamanijaofficial@gmail.com" className="text-primary">lamanijaofficial@gmail.com</a></p>
                                <p className="text-muted-foreground text-sm">Web: lamanijaofficial.com.ar</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <Link href="/" className="text-primary hover:text-accent text-sm font-medium">&larr; Volver al inicio</Link>
                    <Link href="/terminos" className="text-muted-foreground hover:text-foreground text-sm">&larr; Términos y Condiciones</Link>
                </div>
            </article>
        </MainLayout>
    );
}

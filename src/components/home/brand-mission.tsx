import { Music, Camera, Megaphone } from 'lucide-react';

const services = [
    {
        icon: Music,
        title: 'Promoción para DJs',
        description: 'Publicidad y difusión para DJs y productores/as de música electrónica.',
    },
    {
        icon: Camera,
        title: 'Producción de contenido',
        description: 'Notas, entrevistas y cobertura de la escena electrónica.',
    },
    {
        icon: Megaphone,
        title: 'Difusión de eventos',
        description: 'Promoción de fiestas y eventos de música electrónica.',
    },
];

export function BrandMission() {
    return (
        <section className="bg-secondary rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Lado izquierdo - Brand */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary" />
                        <span className="text-xs uppercase tracking-widest text-primary font-semibold">Quiénes somos</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-primary leading-none">
                        La Manija Official
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Darle a la comunidad de música electrónica el mejor contenido relacionado a la industria del entretenimiento.
                    </p>
                    <p className="text-muted-foreground">
                        Servicios de publicidad y promoción para DJs, productores/as, y fiestas de música electrónica.
                    </p>
                </div>

                {/* Lado derecho - Servicios */}
                <div className="space-y-6">
                    {services.map((service) => (
                        <div key={service.title} className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                <service.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

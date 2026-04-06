import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SectionNotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-6 max-w-md">
                <div className="flex justify-center">
                    <FileQuestion className="w-24 h-24 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        Sección no encontrada
                    </h1>
                    <p className="text-muted-foreground">
                        La sección que buscas no existe o ha sido movida.
                    </p>
                </div>

                <div className="space-y-3">
                    <Button asChild className="w-full">
                        <Link href="/">
                            Volver al inicio
                        </Link>
                    </Button>

                    <Button variant="outline" asChild className="w-full">
                        <Link href="/#sections">
                            Ver todas las secciones
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
import { Section } from '@/lib/api/types';
import Link from 'next/link';

interface GenericSectionProps {
  section: Section;
}

function GenericSection(_props: GenericSectionProps) {
  return (
    <div className="py-16 text-center">
      <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">🚧</span>
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">Próximamente</h2>
      <p className="text-muted-foreground mb-6">Esta sección está siendo preparada con contenido exclusivo.</p>
      <Link href="/" className="text-primary hover:text-accent text-sm font-medium">&larr; Volver al inicio</Link>
    </div>
  );
}

export default GenericSection;

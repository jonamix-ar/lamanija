import { MainLayout } from '@/components/layout/main-layout';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | La Manija Official',
    description: 'Términos y condiciones de uso del sitio lamanijaofficial.com.ar',
};

export default function TerminosPage() {
    return (
        <MainLayout>
            <article className="max-w-3xl mx-auto py-8">
                {/* Header */}
                <div className="mb-10">
                    <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
                        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                        <span>/</span>
                        <span className="text-foreground">Términos y Condiciones</span>
                    </nav>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                        Términos y Condiciones
                    </h1>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-1 w-12 bg-primary rounded-full" />
                        <div className="h-1 flex-1 bg-border rounded-full" />
                    </div>
                    <p className="text-muted-foreground">
                        Última actualización: Abril 2026
                    </p>
                </div>

                {/* Intro */}
                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                    <p className="text-foreground/90 leading-relaxed">
                        Los Términos y Condiciones que se describen a continuación tienen por objeto regular el uso que realice el público en general que ingrese a la dirección URL <strong className="text-primary">lamanijaofficial.com.ar</strong>, en adelante &ldquo;el Sitio&rdquo;, propiedad de <strong>LA MANIJA CREW GROUP</strong>, con domicilio en la Ciudad de Buenos Aires, República Argentina. Toda persona que haga uso de los servicios brindados por el Sitio se encuadrará de manera automática e indefectible dentro del carácter de &ldquo;usuario&rdquo;, asumiendo consecuentemente todas las responsabilidades que dicho carácter impone.
                    </p>
                </div>

                {/* Contenido */}
                <div className="prose-content text-foreground/90 text-base leading-relaxed space-y-8">

                    {/* 1 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">1</span>
                            Definiciones
                        </h2>
                        <div className="space-y-3 pl-11">
                            <p><strong className="text-foreground">Contenido:</strong> Todo documento digital (html, gif, jpg, pdf, mp3, mp4, mov, y cualquier otro formato) que permita el acceso a información, obras de arte, música, fotografías, videos y toda forma de creación intelectual, así como el diseño gráfico y códigos fuente del Sitio, protegidos por las leyes de derecho de autor nacionales e internacionales.</p>
                            <p><strong className="text-foreground">Links:</strong> Todo enlace desde el Sitio a otro sitio web y viceversa, en cualquier formato capaz de vincular contenido digital.</p>
                            <p><strong className="text-foreground">Servicios:</strong> Toda la información proporcionada por La Manija Official o Terceros a través del Sitio, incluyendo contenidos divulgados en soporte digital y todos aquellos servicios que en el futuro pudiere ofrecer.</p>
                            <p><strong className="text-foreground">Terceros:</strong> Todas aquellas personas físicas o jurídicas que mediante la contratación de los Servicios publiquen contenidos, publiciten o comercialicen productos y/o servicios en el Sitio.</p>
                            <p><strong className="text-foreground">Público en General:</strong> Cualquier persona física o jurídica que tenga acceso al Sitio y a todos los contenidos publicados.</p>
                        </div>
                    </section>

                    {/* 2 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</span>
                            Objeto
                        </h2>
                        <div className="pl-11">
                            <p>La puesta en funcionamiento del Sitio por parte de La Manija Official tiene por objeto proveerle a los usuarios, terceros y público en general información y servicios relacionados con la música electrónica, eventos, DJs, productores y la industria del entretenimiento en la República Argentina y el mundo. Asimismo, el Sitio tiene como objetivo ofrecer los distintos productos y/o servicios publicitados tanto por La Manija Official como por Terceros, incluyendo pero no limitándose a: promoción de perfiles artísticos de DJs y productores, difusión de eventos y fiestas de música electrónica, publicación de notas y contenido editorial, y comercialización de merchandise.</p>
                        </div>
                    </section>

                    {/* 3 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</span>
                            Condiciones de Uso
                        </h2>
                        <div className="space-y-6 pl-11">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">3.1 — Gratuidad del Acceso</h3>
                                <p>El acceso a la información brindada por el Sitio es gratuito. Esta gratuidad no se extenderá en caso alguno al uso de otros Servicios y/o productos de La Manija Official y/o de Terceros cuyo uso y goce esté condicionado al pago de un precio por parte del usuario, como la adquisición de entradas a eventos o merchandise.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">3.2 — Utilización del Sitio</h3>
                                <p>Toda vez que el usuario ingrese al Sitio deberá seguir y cumplir con los instructivos y demás avisos que se publiquen, de acuerdo con los presentes términos y condiciones, leyes, reglamentaciones y disposiciones gubernamentales vigentes.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">3.3 — Prohibiciones en General</h3>
                                <p>Todo usuario tiene prohibido utilizar los servicios y/o productos en el Sitio publicados con fines o efectos ilícitos o que pudieren dañar o menoscabar los derechos e intereses de terceros. Los usuarios no podrán recabar datos almacenados en el Sitio con fines publicitarios ni enviar publicidad sin autorización previa y expresa de La Manija Official. El usuario tiene prohibido realizar manifestaciones falsas, inexactas o incorrectas sobre el Sitio o sobre La Manija Official. Todo usuario que viole estas condiciones será responsable civil y penalmente por los daños y perjuicios que su accionar pudiere ocasionar.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">3.4 — Implementación de Links</h3>
                                <p>El Usuario podrá implementar Links entre su página en internet y el Sitio. La autorización a implementar un Link no constituye ningún tipo de sociedad, asociación o vínculo comercial entre las partes.</p>
                            </div>
                        </div>
                    </section>

                    {/* 4 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">4</span>
                            Garantías y Licencias
                        </h2>
                        <div className="space-y-6 pl-11">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">4.1 — Continuidad y Disponibilidad</h3>
                                <p>La Manija Official no garantiza la disponibilidad permanente ni el irrestricto acceso del usuario al Sitio ni a los servicios allí ofrecidos. La Manija Official se obliga a tomar todas las medidas necesarias para permitir el correcto funcionamiento del Sitio.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">4.2 — Seguridad, Privacidad y Confidencialidad</h3>
                                <p>La Manija Official se obliga a tomar todos los recaudos técnicos a su alcance para proteger la información personal de los usuarios. Los datos personales son utilizados para proveer un servicio personalizado. Sin perjuicio de ello, La Manija Official no garantiza en forma alguna la seguridad absoluta en la utilización del Sitio.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">4.3 — Virus</h3>
                                <p>La Manija Official tomará los recaudos a su alcance para evitar virus informáticos en los contenidos del Sitio. Sin embargo, no garantiza la inexistencia de virus ni de otros elementos que pudieren producir alteraciones en el sistema informático del usuario.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">4.4 — Cookies</h3>
                                <p>El Sitio utiliza cookies para ofrecer un servicio personalizado, almacenando la frecuencia de utilización y las secciones visitadas. Aceptar las cookies es requisito para poder recibir y/o utilizar los servicios del Sitio.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">4.5 — Licencia</h3>
                                <p>La Manija Official le confiere al Usuario una licencia gratuita de uso de los Contenidos y Servicios difundidos en el Sitio, siempre y cuando el Usuario respete los presentes Términos y Condiciones. Todas las marcas, patentes y signos distintivos que aparecen en el Sitio son propiedad de La Manija Official o de Terceros.</p>
                            </div>
                        </div>
                    </section>

                    {/* 5 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">5</span>
                            Contenidos
                        </h2>
                        <div className="pl-11">
                            <p>Los usuarios, terceros y público en general serán enteramente responsables de los contenidos que publiquen en el Sitio, incluyendo fotos, perfiles, mensajes, notas, texto, información, música, video, anuncios y demás material. La Manija Official podrá, sin constituir su obligación, revisar y eliminar cualquier contenido que considere ofensivo, ilegal o que infrinja derechos de terceros. El Sitio propicia la formación de una comunidad virtual cuyo objetivo es fomentar el libre intercambio de ideas y opiniones relacionadas con la música electrónica. Las opiniones publicadas no reflejan necesariamente la opinión de La Manija Official.</p>
                        </div>
                    </section>

                    {/* 6 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">6</span>
                            Responsabilidad
                        </h2>
                        <div className="pl-11">
                            <p>La Manija Official no será responsable de ningún contenido publicado por usuarios, terceros o público en general. La Manija Official no controla lo que los usuarios publican, transmiten o comparten en el Sitio. La Manija Official no asume ningún tipo de responsabilidad por errores, omisiones, interrupciones, fallos técnicos, ni por daños derivados de la utilización del Sitio. El Sitio y servicios se proporcionan &ldquo;tal cual&rdquo; y La Manija Official excluye expresamente todas las garantías implícitas. Los usuarios aceptan exonerar de toda responsabilidad a La Manija Official y sus asociados frente a cualesquiera pérdidas, responsabilidades o daños derivados del uso del Sitio.</p>
                        </div>
                    </section>

                    {/* 7 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">7</span>
                            Notificaciones
                        </h2>
                        <div className="pl-11">
                            <p>En el supuesto de que un usuario detectare una violación de los presentes términos, deberá notificar a La Manija Official en un plazo no mayor a 24 horas. Para comunicarse con La Manija Official puede enviar un correo electrónico a: <a href="mailto:lamanijaofficial@gmail.com" className="text-primary hover:text-accent">lamanijaofficial@gmail.com</a>.</p>
                        </div>
                    </section>

                    {/* 8 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">8</span>
                            Confidencialidad de los Menores
                        </h2>
                        <div className="pl-11">
                            <p>La salvaguarda de la información personal infantil es extremadamente importante. La Manija Official recauda el mínimo indispensable de información necesaria para brindar sus servicios y no solicita información de identificación personal a los menores. Los menores siempre deben solicitar permiso a sus padres antes de enviar información personal.</p>
                        </div>
                    </section>

                    {/* 9 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">9</span>
                            Aceptación
                        </h2>
                        <div className="pl-11">
                            <p>Los términos y condiciones aquí desarrollados constituyen un acuerdo legal entre el usuario y La Manija Official. Si el usuario utiliza los servicios de La Manija Official significa que ha leído, entendido y acordado los términos antes expuestos. Si no está de acuerdo con ellos, el usuario no deberá proporcionar ninguna información personal, ni utilizar el servicio.</p>
                        </div>
                    </section>

                    {/* 10 */}
                    <section>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold shrink-0">10</span>
                            Legislación y Jurisdicción
                        </h2>
                        <div className="pl-11">
                            <p>Los presentes términos y condiciones se rigen por las leyes de la República Argentina, debiendo las partes acudir a los tribunales ordinarios de la Ciudad de Buenos Aires a fin de resolver cualquier diferendo que no haya sido solucionado de manera amigable.</p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <Link href="/" className="text-primary hover:text-accent text-sm font-medium">&larr; Volver al inicio</Link>
                    <Link href="/privacidad" className="text-muted-foreground hover:text-foreground text-sm">Política de Privacidad &rarr;</Link>
                </div>
            </article>
        </MainLayout>
    );
}

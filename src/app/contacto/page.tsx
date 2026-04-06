'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Send, Music, PartyPopper, Building2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import WhatsappIcon from '@/components/icons/whatsapp-icon';
import InstagramIcon from '@/components/icons/instagram-icon';
import { useSettingsContext } from '@/lib/settings-context';

const contactTypes = [
    { value: 'dj', label: 'DJ / Productor', icon: Music, description: 'Promoción de tu perfil artístico' },
    { value: 'fiesta', label: 'Fiesta / Evento', icon: PartyPopper, description: 'Difusión de tu evento' },
    { value: 'productora', label: 'Productora / Marca', icon: Building2, description: 'Publicidad y partnerships' },
    { value: 'general', label: 'Consulta general', icon: MessageCircle, description: 'Otras consultas' },
];

export default function ContactoPage() {
    const settings = useSettingsContext();
    const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', phone: '', type: '', message: '' });
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error al enviar.');
                setStatus('error');
            }
        } catch {
            setErrorMsg('Error de conexión.');
            setStatus('error');
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-primary mb-3">
                        Contacto
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Promocioná tu perfil artístico, tu fiesta o tu marca con La Manija Official.
                    </p>
                </div>

                {/* Tipo de consulta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {contactTypes.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, type: type.value }))}
                            className={`p-4 rounded-xl border text-left transition-all ${form.type === type.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                                }`}
                        >
                            <type.icon className="w-6 h-6 mb-2" />
                            <p className="text-sm font-semibold">{type.label}</p>
                            <p className="text-[10px] mt-0.5 opacity-70">{type.description}</p>
                        </button>
                    ))}
                </div>

                {status === 'success' ? (
                    <div className="text-center py-16 bg-card rounded-xl border border-border">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="w-7 h-7 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Mensaje enviado</h2>
                        <p className="text-muted-foreground mb-6">Te responderemos a la brevedad.</p>
                        <button type="button" onClick={() => setStatus('idle')} className="text-primary hover:text-accent text-sm font-medium">
                            Enviar otro mensaje
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Nombre *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Teléfono</label>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="+54 11 1234-5678"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Mensaje *</label>
                            <textarea
                                required
                                rows={5}
                                value={form.message}
                                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                                placeholder="Contanos sobre tu proyecto..."
                            />
                        </div>

                        {status === 'error' && (
                            <p className="text-red-400 text-sm">{errorMsg}</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'sending' || !form.type}
                            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                        </button>
                    </form>
                )}

                {/* Alternativas de contacto */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center mb-4">También podés contactarnos por</p>
                    <div className="flex justify-center gap-3">
                        <a href={`https://api.whatsapp.com/send?phone=${settings.contact.whatsapp_number || '5491173579166'}&text=Hola%20La%20Manija!`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-sm font-medium">
                            <WhatsappIcon className="w-5 h-5" /> WhatsApp
                        </a>
                        <a href={settings.social.instagram_url || '#'} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20 transition-colors text-sm font-medium">
                            <InstagramIcon className="w-5 h-5" /> Instagram
                        </a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

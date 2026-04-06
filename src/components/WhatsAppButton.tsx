'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import WhatsappIcon from './icons/whatsapp-icon';
import { useSettingsContext } from '@/lib/settings-context';

export default function WhatsAppButton() {
    const settings = useSettingsContext();
    const WHATSAPP_NUMBER = settings.contact.whatsapp_number || '5491173579166';
    const DEFAULT_TEXT = 'Hola La Manija! Quiero más información';

    const ANNOUNCE_TEXTS = ['¡Contactanos!', '¡Estamos para asesorarte!'];

    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const [typing, setTyping] = useState(false);
    const [badgeVisible, setBadgeVisible] = useState(false);

    const msgIndex = useRef(0);

    // Badge aparece después de 3 segundos
    useEffect(() => {
        const timer = setTimeout(() => setBadgeVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Vibración
    useEffect(() => {
        const interval = setInterval(() => {
            const btn = document.getElementById('lmj-btn');
            btn?.classList.add('vibrate');
            setTimeout(() => btn?.classList.remove('vibrate'), 600);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Typing effect
    const typeAndShow = (message: string) => {
        let i = 0;
        setText('');
        setVisible(true);
        setTyping(true);

        const tick = setInterval(() => {
            i++;
            setText(message.slice(0, i));

            if (i >= message.length) {
                clearInterval(tick);
                setTyping(false);

                setTimeout(() => {
                    setVisible(false);
                    setText('');
                }, 4200);
            }
        }, 45);
    };

    // Mensajes automáticos
    useEffect(() => {
        const interval = setInterval(() => {
            typeAndShow(ANNOUNCE_TEXTS[msgIndex.current]);
            msgIndex.current =
                (msgIndex.current + 1) % ANNOUNCE_TEXTS.length;
        }, 25000);

        return () => clearInterval(interval);
    }, [ANNOUNCE_TEXTS]);

    return (
        <div id="lmj" className={visible ? 'announce' : ''}>
            <div
                id="lmj-label"
                className={typing ? 'typing' : ''}
            >
                {text}
            </div>

            <Link
                id="lmj-btn"
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                    DEFAULT_TEXT
                )}`}
                target="_blank"
                rel="nofollow"
            >
                <WhatsappIcon className='size-8' title="Contactar por WhatsApp" />

                <span
                    id="lmj-badge"
                    className={badgeVisible ? 'lmj-badge--show' : ''}
                >
                    1
                </span>
            </Link>
        </div>
    );
}
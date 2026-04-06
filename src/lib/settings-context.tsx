'use client';

import { createContext, useContext } from 'react';
import { useSettings } from '@/lib/api/hooks';
import type { SiteSettings } from '@/lib/api/settings';

const defaultSettings: SiteSettings = {
    social: {},
    contact: {},
    branding: {},
    seo: {},
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const { data } = useSettings();
    const settings = data ?? defaultSettings;

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettingsContext(): SiteSettings {
    return useContext(SettingsContext);
}

import { apiClient } from "./client";

export interface SiteSettings {
    social: {
        instagram_url?: string;
        facebook_url?: string;
        x_url?: string;
        tiktok_url?: string;
        youtube_url?: string;
    };
    contact: {
        whatsapp_number?: string;
        email?: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        country?: string;
    };
    branding: {
        site_name?: string;
        site_description?: string;
        site_url?: string;
    };
    seo: {
        home_meta_title?: string;
        home_meta_description?: string;
        google_analytics_id?: string;
    };
}

export const settingsApi = {
    async getAll(): Promise<SiteSettings> {
        const response = await apiClient.get('/settings');
        return response as unknown as SiteSettings;
    },
};

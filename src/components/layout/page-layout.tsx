"use client";

import { MainLayout } from "./main-layout";

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export function PageLayout({ children }: PageLayoutProps) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}

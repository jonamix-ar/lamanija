"use client";

import { MainLayout } from "./main-layout";

interface PageLayoutProps {
    children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}

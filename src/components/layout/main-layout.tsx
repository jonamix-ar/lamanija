'use client';

import { Header } from "@/components/header";
import { MobileSearch } from "@/components/mobile-search";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Sidebar />
            <div className="relative ml-0 lg:ml-64">
                <Header />
                <MobileSearch />
                <main className="relative px-4 pt-4 pb-16 sm:px-4 md:px-6 xl:px-8">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}

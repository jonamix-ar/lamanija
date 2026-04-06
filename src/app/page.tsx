'use client';

import dynamic from "next/dynamic";
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/hero-section";
import { FeaturedPosts } from "@/components/home/featured-posts";
import { useSettingsContext } from "@/lib/settings-context";

const UpcomingEvents = dynamic(() => import("@/components/upcoming-events").then(m => ({ default: m.UpcomingEvents })));
const SectionShowcase = dynamic(() => import("@/components/home/section-showcase").then(m => ({ default: m.SectionShowcase })));
const FeaturedDJs = dynamic(() => import("@/components/home/featured-djs").then(m => ({ default: m.FeaturedDJs })));
const ProductsShowcase = dynamic(() => import("@/components/home/products-showcase").then(m => ({ default: m.ProductsShowcase })));
const BrandMission = dynamic(() => import("@/components/home/brand-mission").then(m => ({ default: m.BrandMission })));

const sectionComponents: Record<string, React.ReactNode> = {
    hero: <HeroSection />,
    featured_posts: <FeaturedPosts />,
    events: <UpcomingEvents limit={6} />,
    section_showcase: <SectionShowcase maxSections={3} />,
    products: <ProductsShowcase />,
    djs: <FeaturedDJs />,
    brand_mission: <BrandMission />,
};

const defaultOrder = 'hero,featured_posts,events,section_showcase,products,djs,brand_mission';

export default function Home() {
    const settings = useSettingsContext();
    const home = (settings as unknown as Record<string, Record<string, string>>)?.home;
    const orderStr = home?.home_sections_order || defaultOrder;
    const order = orderStr.split(',').map((s: string) => s.trim()).filter(Boolean);

    // Hero siempre primero, el resto según orden
    const heroSection = order.includes('hero') ? sectionComponents['hero'] : null;
    const otherSections = order.filter((key: string) => key !== 'hero' && sectionComponents[key]);

    return (
        <MainLayout>
            {heroSection}
            <div className="space-y-16 pt-12">
                {otherSections.map((key: string) => (
                    <div key={key}>{sectionComponents[key]}</div>
                ))}
            </div>
        </MainLayout>
    );
}

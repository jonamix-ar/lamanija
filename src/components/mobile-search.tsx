'use client';

import { Search } from "lucide-react";

export function MobileSearch() {
    return (
        <div className="px-4 mt-3 mb-2 lg:hidden">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-full text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
            </div>
        </div>
    );
}

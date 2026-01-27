'use client';

import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { config } from '@/lib/config';
import { useState } from 'react';
import { StaticSearchOverlay } from './SearchOverlay';
import { PostOrPage } from '@tryghost/content-api';

interface HeaderProps {
    searchPosts?: PostOrPage[];
}

export function Header({ searchPosts = [] }: HeaderProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Mobile Menu */}
                    <button className="md:hidden p-2">
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="text-2xl font-serif font-black tracking-tighter hover:opacity-80 transition-opacity">
                        {config.siteTitle.toUpperCase()}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                        {config.navigation.map((item) => (
                            <Link key={item.url} href={item.url} className="text-gray-600 hover:text-black transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            </header>

            <StaticSearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                posts={searchPosts}
            />
        </>
    );
}

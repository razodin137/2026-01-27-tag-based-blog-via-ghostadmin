'use client';

import { Header } from '@/components/Header';
import { PostOrPage } from '@tryghost/content-api';

interface ClientLayoutProps {
    children: React.ReactNode;
    searchPosts: PostOrPage[];
    siteTitle: string;
    siteDescription: string;
}

export function ClientLayout({ children, searchPosts, siteTitle, siteDescription }: ClientLayoutProps) {
    return (
        <>
            <Header searchPosts={searchPosts} />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-black text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-serif font-black mb-4">{siteTitle}</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">{siteDescription}</p>
                    <div className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}

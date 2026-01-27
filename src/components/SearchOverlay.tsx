'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { PostOrPage } from '@tryghost/content-api';
import Link from 'next/link';

interface StaticSearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    posts: PostOrPage[];
}

export function StaticSearchOverlay({ isOpen, onClose, posts }: StaticSearchOverlayProps) {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    // Filter posts client-side
    const results = useMemo(() => {
        if (query.trim().length < 2) return [];

        return posts.filter(post =>
            post.title?.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10); // Limit to 10 results
    }, [query, posts]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-end mb-8">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-8 h-8 text-gray-400" />
                    </button>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative mb-12">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-300" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search stories..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full text-4xl font-serif font-bold text-black placeholder:text-gray-200 border-b-2 border-gray-100 py-4 pl-16 focus:outline-none focus:border-black transition-colors bg-transparent"
                        />
                    </div>

                    <div className="space-y-4">
                        {results.length > 0 ? (
                            results.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/post/${post.slug}/`}
                                    onClick={onClose}
                                    className="block group"
                                >
                                    <article className="py-4 border-b border-gray-50 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold font-serif group-hover:underline">{post.title}</h3>
                                            <p className="text-gray-500 text-sm mt-1">{post.excerpt?.slice(0, 100)}...</p>
                                        </div>
                                    </article>
                                </Link>
                            ))
                        ) : query.length >= 2 ? (
                            <p className="text-center text-gray-400">No stories found.</p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

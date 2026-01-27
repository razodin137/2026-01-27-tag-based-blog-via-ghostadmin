'use client';

import { useState } from 'react';
import { PostCard } from './PostCard';
import { type PostOrPage } from '@tryghost/content-api';

interface StaticPostGridProps {
    posts: PostOrPage[];
    postsPerPage?: number;
}

export function StaticPostGrid({ posts, postsPerPage = 12 }: StaticPostGridProps) {
    const [visibleCount, setVisibleCount] = useState(postsPerPage);

    const visiblePosts = posts.slice(0, visibleCount);
    const hasMore = visibleCount < posts.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + postsPerPage);
    };

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {visiblePosts.map((post) => (
                    <div key={post.id} className="h-full">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="w-full flex justify-center py-8">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Load More Stories
                    </button>
                </div>
            )}
        </>
    );
}

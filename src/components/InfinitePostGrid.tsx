'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostCard } from './PostCard';
import { getPosts } from '@/lib/ghost';
import { type PostOrPage } from '@tryghost/content-api';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollProps {
    initialPosts: PostOrPage[];
}

export function InfinitePostGrid({ initialPosts }: InfiniteScrollProps) {
    const [posts, setPosts] = useState<PostOrPage[]>(initialPosts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    async function loadMore() {
        if (loading || !hasMore) return;
        setLoading(true);

        // We are on client side, so we can't use the direct ghost client if it had secrets, 
        // but the content API key is public safe. 
        // Ideally we would use a server action or API route, but for simplicity/directness:
        // We'll use the ghost client directly if it's safe (Content API is designed for this).
        // HOWEVER, `getPosts` is defined in `@/lib/ghost` which imports `ghost-content-api`.
        // We need to ensure that runs on client or use a server action.
        // Since `getPosts` uses `process.env`, it should be fine if exposed.
        // Let's create an internal API route for cleaner separation or just fetch.

        // Actually, `getPosts` is async and imports the library. 
        // In Next 13+, better to use Server Action for this. 
        // Let's assume we refactor `getPosts` to be a server action or use an API route.
        // For now, to keep it simple and working:
        // I'll create a simple server action in `src/app/actions.ts`
    }

    // Effect to trigger load
    useEffect(() => {
        if (inView) {
            // loadMore(); 
            // We need the server action first.
            const fetchMore = async () => {
                const next = page + 1;
                const res = await fetch(`/api/posts?page=${next}`);
                const newPosts = await res.json();

                if (newPosts.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts((prev) => [...prev, ...newPosts]);
                    setPage(next);
                }
                setLoading(false);
            }
            if (!loading && hasMore) {
                setLoading(true);
                fetchMore();
            }
        }
    }, [inView, hasMore, loading, page]);

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                    <div key={post.id} className="h-full">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>

            {hasMore && (
                <div ref={ref} className="w-full flex justify-center py-12">
                    {loading ? <Loader2 className="w-8 h-8 animate-spin text-gray-400" /> : <div className="h-8" />}
                </div>
            )}
        </>
    );
}

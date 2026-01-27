import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { type PostOrPage } from '@tryghost/content-api';

interface PostCardProps {
    post: PostOrPage;
    priority?: boolean;
}

export function PostCard({ post, priority = false }: PostCardProps) {
    return (
        <Link href={`/post/${post.slug}`} className="group block h-full">
            <article className="flex flex-col h-full overflow-hidden">
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 rounded-lg mb-4">
                    {post.feature_image ? (
                        <Image
                            src={post.feature_image}
                            alt={post.title || 'Post image'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={priority}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                            <span className="font-serif italic">No image</span>
                        </div>
                    )}
                    {post.primary_tag && (
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider text-black rounded-full">
                            {post.primary_tag.name}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                        {/* Authors could go here */}
                        <time dateTime={post.published_at || ''}>
                            {formatDate(post.published_at || new Date().toISOString())}
                        </time>
                    </div>

                    <h2 className="text-xl font-bold font-serif leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4 decoration-black">
                        {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>
            </article>
        </Link>
    );
}

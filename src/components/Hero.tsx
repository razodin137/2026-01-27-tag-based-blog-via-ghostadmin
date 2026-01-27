import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { type PostOrPage } from '@tryghost/content-api';

interface HeroProps {
    post: PostOrPage;
}

export function Hero({ post }: HeroProps) {
    if (!post) return null;

    return (
        <section className="relative px-4 py-8 md:py-12 pb-16 border-b border-gray-100">
            <div className="container mx-auto grid md:grid-cols-12 gap-8 items-center">
                {/* Main Content */}
                <div className="md:col-span-5 md:pr-8 order-2 md:order-1">
                    <div className="flex flex-col gap-4">
                        {post.primary_tag && (
                            <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">
                                {post.primary_tag.name}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-[1.1] tracking-tight">
                            <Link href={`/post/${post.slug}`} className="hover:text-blue-900 transition-colors">
                                {post.title}
                            </Link>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-4">
                            {post.custom_excerpt || post.excerpt}
                        </p>
                        <div className="pt-4 flex items-center gap-4 text-sm text-gray-500 font-medium">
                            {post.authors?.[0] && (
                                <span className="text-black">{post.authors[0].name}</span>
                            )}
                            <span>•</span>
                            <time>{formatDate(post.published_at || new Date().toISOString())}</time>
                        </div>
                    </div>
                </div>

                {/* Feature Image */}
                <div className="md:col-span-7 relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden order-1 md:order-2">
                    {post.feature_image && (
                        <Image
                            src={post.feature_image}
                            alt={post.title || 'Featured'}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

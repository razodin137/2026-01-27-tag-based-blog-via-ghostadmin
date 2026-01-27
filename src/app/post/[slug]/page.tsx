import { getSinglePost, getPosts } from '@/lib/ghost';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

interface PostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = await getPosts(1, 10); // generating for first page essentially
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getSinglePost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="pb-20">
            {/* Header */}
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl text-center">
                {post.primary_tag && (
                    <Link href="/" className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 inline-block hover:underline">
                        {post.primary_tag.name}
                    </Link>
                )}
                <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight mb-6">
                    {post.title}
                </h1>
                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                    {post.custom_excerpt || post.excerpt}
                </p>

                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                    {post.authors?.[0] && (
                        <div className="flex items-center gap-2">
                            {post.authors[0].profile_image && (
                                <Image
                                    src={post.authors[0].profile_image}
                                    alt={post.authors[0].name || 'Author'}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            )}
                            <span>{post.authors[0].name}</span>
                        </div>
                    )}
                    <span className="text-gray-300">•</span>
                    <time className="text-gray-500">{formatDate(post.published_at || '')}</time>
                </div>
            </div>

            {/* Feature Image */}
            {post.feature_image && (
                <div className="container mx-auto px-4 mb-16 max-w-6xl">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src={post.feature_image}
                            alt={post.title || ''}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4 max-w-3xl">
                <div
                    className="prose prose-lg md:prose-xl prose-serif max-w-none 
            prose-headings:font-serif prose-headings:font-black 
            prose-p:text-gray-700 prose-p:leading-loose
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: post.html || '' }}
                />
            </div>
        </article>
    );
}

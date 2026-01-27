import { getPosts, getFeaturedPosts } from '@/lib/ghost';
import { Hero } from '@/components/Hero';
import { StaticPostGrid } from '@/components/StaticPostGrid';

// For static export, we fetch everything at build time
export default async function Home() {
  const [featuredPosts, allPosts] = await Promise.all([
    getFeaturedPosts(),
    getPosts(1, 100) // Fetch up to 100 posts at build time
  ]);

  const featured = featuredPosts[0] || allPosts[0];
  // Filter out the featured post from the grid if it's the same
  const gridPosts = allPosts.filter((p: { id?: string }) => p.id !== featured?.id);

  return (
    <div className="min-h-screen pb-20">
      <Hero post={featured} />

      <div className="container mx-auto px-4 py-12">
        <h3 className="font-serif font-bold text-2xl mb-8 border-b border-black pb-2 inline-block">
          Latest Stories
        </h3>
        <StaticPostGrid posts={gridPosts} />
      </div>
    </div>
  );
}

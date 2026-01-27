import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';
import { config } from '@/lib/config';
import { getPosts } from '@/lib/ghost';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: config.siteTitle,
  description: config.siteDescription,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch posts at build time for search functionality
  const allPosts = await getPosts(1, 100);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col`}>
        <ClientLayout
          searchPosts={allPosts}
          siteTitle={config.siteTitle}
          siteDescription={config.siteDescription}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

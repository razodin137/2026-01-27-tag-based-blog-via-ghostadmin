export const config = {
  // Ghost API Credentials
  ghostUrl: process.env.NEXT_PUBLIC_GHOST_URL || 'https://demo.ghost.io',
  contentApiKey: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '22444f78447824223cefc48062',

  // Site Configuration
  siteTitle: 'Tag Based Blog',
  siteDescription: 'A curated collection of posts.',
  
  // The Tag to filter by (slug)
  // This is the key setting that compartmentalizes the content
  filterTag: process.env.NEXT_PUBLIC_FILTER_TAG || 'getting-started', 
  
  // Navigation
  navigation: [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
  ],

  // Socials
  socials: {
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
  }
};

# Tag-Based Blog via Ghost Admin

A [Next.js](https://nextjs.org) blog frontend that pulls posts from a [Ghost](https://ghost.org) CMS via `@tryghost/content-api`, filtered by tag — point it at your Ghost install and it only shows posts tagged with your chosen tag.

**Repository:** [razodin137/2026-01-27-tag-based-blog-via-ghostadmin](https://github.com/razodin137/2026-01-27-tag-based-blog-via-ghostadmin)

## How it works

- [`src/lib/ghost.ts`](./src/lib/ghost.ts) — Ghost Content API client: fetch paginated posts, featured posts, and single posts, all filtered by tag, with tags and authors included.
- [`src/lib/config.ts`](./src/lib/config.ts) — configuration: Ghost URL, content API key, site title/description, the filter tag, navigation, and socials. Overridable via environment variables:

  - `NEXT_PUBLIC_GHOST_URL`
  - `NEXT_PUBLIC_GHOST_CONTENT_API_KEY`
  - `NEXT_PUBLIC_FILTER_TAG`

- `src/app/` — App Router pages: home (post list) and `post/[slug]` (single post).
- Styled with Tailwind CSS v4 and `@tailwindcss/typography`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Ghost Content API (`@tryghost/content-api`)
- Tailwind CSS v4 + typography plugin
- lucide-react icons, date-fns
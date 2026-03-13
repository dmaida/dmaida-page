# dmaida-page

Personal portfolio and blog for Daniel Maida — built with Next.js 16, TypeScript, and Tailwind CSS v4. Self-hosted via Docker on Unraid behind Nginx Proxy Manager.

## Stack

- **Framework:** Next.js 16.1 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Blog:** MDX via `next-mdx-remote`, syntax highlighting with `rehype-pretty-code` + Shiki
- **Deployment:** Docker (standalone build), self-hosted on Unraid

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with bio and CTAs |
| `/about` | Experience, education, and skills |
| `/projects` | Featured and grid project listing |
| `/blog` | MDX blog with tag filtering |
| `/contact` | Contact form with server-side validation |

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating Content

**Profile / skills / social links** — edit `src/data/profile.ts`

**Projects** — edit `src/data/projects.ts`

**Blog posts** — add `.mdx` files to `content/posts/` with the following frontmatter:

```mdx
---
title: Post Title
date: 2026-03-12
description: A short description.
tags: [tag1, tag2]
slug: post-title
---
```

The `slug` must match the filename (without `.mdx`).

## Docker Deployment

```bash
docker-compose up --build -d
```

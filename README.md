## Audiophile E-Commerce Website

The Audiophile E-Commerce Website is designed to deliver a seamless shopping experience for premium audio products — including headphones, speakers, and earphones.

It includes:

- Elegant, minimalistic product layouts
- Detailed product pages with feature highlights
- Interactive cart and checkout flows
- Responsive mobile and tablet designs
- Reusable UI components for scalability

## Tech Stack

Next.js
– App framework for React

TypeScript
– Type safety

Tailwind CSS
– Styling and layout

Convex
– Database

## Features

- Fully responsive across all devices
- Dynamic product categories and routes
- Shopping cart and checkout workflow
- Reusable UI components (cards, buttons, modals)
- Optimized for SEO and accessibility
- Clean, maintainable folder structure

## Developer Notes

- Follow the Figma spacing, font sizes, and grid layout strictly for pixel-perfect implementation.
- Use Tailwind’s design tokens to map colors and typography from Figma.
- Components should be modular and easily composable.
- Prefer reusable layout sections (e.g., HeroSection, CategoryGrid).

## Getting Started

First, run the development servers for both next and convex:

```bash
npm run dev
```

```bash
npx convex dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Setting up convex

1. Install Convex: npm install convex
2. Set up Convex project: npx convex dev
3. Create orders schema in convex/schema.ts
4. Create convex mutations and query in convex/orders.ts
5. Replace implementations below with Convex mutations/queries

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official JustEvery homepage - a modern Next.js application deployed on Cloudflare Workers with video assets served from Cloudflare R2. The site features responsive video backgrounds, animated sections, and is optimized for performance and SEO.

## Core Modules & Files

- `src/app/page.tsx`: Main homepage component
- `src/app/layout.tsx`: Root layout component with metadata
- `src/app/not-found.tsx`: Custom 404 page
- `src/app/globals.css`: Global styles and Tailwind imports
- `src/components/Header.tsx`: Navigation header with mobile menu
- `src/components/Footer.tsx`: Site footer with newsletter
- `src/components/VideoPlayer.tsx`: Responsive video component with R2 integration
- `public/video/`: Local video files (development only)
- `wrangler.jsonc`: Cloudflare Workers configuration
- `open-next.config.ts`: OpenNext adapter configuration

## Commands

### Development

```bash
npm install           # Install dependencies
npm run dev           # Start development server with TurboPack
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

### Testing

```bash
npm test              # Run tests (when implemented)
```

### Build & Production

```bash
npm run build         # Build for production
npm run build:cloudflare # Build for Cloudflare Workers deployment
npm start             # Start production server
npm run preview       # Preview production build locally
```

### Deployment

```bash
npx wrangler deploy   # Deploy to Cloudflare Workers
npm run deploy        # CI/CD deployment (GitHub Actions)
```

## Architecture Overview

The homepage is built with Next.js 15.3 using the App Router pattern and deployed to Cloudflare Workers via OpenNext adapter. Video assets are stored in Cloudflare R2 for optimal global delivery.

### Core Components

1. **Frontend** - Next.js with React Server Components
2. **Styling** - Tailwind CSS v4 with custom animations
3. **Video Delivery** - Dual approach: local files for dev, R2 for production
4. **Deployment** - Cloudflare Workers with automatic GitHub Actions CI/CD
5. **Performance** - Edge rendering, lazy loading, optimized assets

### Key Patterns

- Server Components by default, client components only for interactivity
- Responsive video sources based on device capabilities
- Environment-based asset serving (local vs R2)
- Automated deployment pipeline with asset uploading

## Pre-Commit Requirements

**IMPORTANT**: Always run these commands before committing:

```bash
npm run lint          # Check for linting errors
npm run build         # Ensure production build succeeds
```

Only commit if both commands succeed without errors.

## TypeScript Configuration

- Strict mode enabled for type safety
- Path aliases configured for clean imports
- Next.js specific types included
- Target: ES2022 with module resolution for Node

## Code Style Guidelines

- Follow TypeScript best practices with strict type checking
- Use Next.js App Router for routing and layouts
- Implement React Server Components for static content
- Use client-side components only when necessary
- Follow component organization by feature
- Use Tailwind CSS for styling with consistent design tokens
- Follow semantic HTML practices for accessibility

## Testing Instructions

- Run tests with `npm test`
- Add unit tests for components when applicable
- Use React Testing Library for component tests
- Verify responsive design across device sizes
- Test across different browsers

## Repository Etiquette

- Branch names: `feature/short-description`, `fix/issue-summary`
- Use conventional commits (e.g., `feat:`, `fix:`, `chore:`)
- Pull requests should target the main branch
- Include screenshots for visual changes
- Document significant changes

## Developer Environment Setup

- Requires Node.js 18.x or higher
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Access the site at http://localhost:3000
- Enable development builds with `NODE_ENV=development`

## Package Management

- Use `npm ci` for clean installs in CI/CD
- Lock file (`package-lock.json`) must be committed
- Avoid adding large dependencies that impact bundle size
- Check bundle analyzer before adding new packages

## Project-Specific Warnings

- **Video Files**: Never commit video files to the repository (use Git LFS or R2)
- **Bundle Size**: Worker deployment has 25MB limit - exclude large assets
- **Environment Variables**: R2 URLs are set via GitHub Actions for production
- **Server Components**: Cannot use browser APIs, hooks, or event handlers
- **Cloudflare Limits**: Be aware of Worker script size and execution limits
- **CORS**: R2 bucket must have proper CORS configuration for production

## Key Utility Functions & APIs

- `src/components/VideoPlayer.tsx`: Intelligent video source selection
- `src/components/FlowingParticles.tsx`: WebGL particle animation
- `src/lib/animations.ts`: Framer Motion animation variants
- `src/lib/env.ts`: Environment variable validation
- Next.js Image component for optimized images
- Next.js dynamic imports for code splitting

## Troubleshooting

### Common Issues

- **Videos not loading**: Check R2 environment variables in production
- **Build failures**: Ensure no files exceed 25MB limit
- **Type errors**: Run `npm run typecheck` to catch issues early
- **Deployment failures**: Check GitHub Actions logs and secrets

### Cloudflare-Specific

- Use `wrangler tail` to debug Worker errors
- Check Worker logs in Cloudflare dashboard
- Verify R2 bucket permissions and CORS settings

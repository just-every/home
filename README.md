# JustEvery Homepage

The official homepage for JustEvery - building UI-first, generative software with ensemble AI.

## 🚀 Overview

This is a modern Next.js application deployed on Cloudflare Workers with video assets served from Cloudflare R2. The site features a responsive design with high-quality video backgrounds, animated sections, and optimized performance.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Workers via OpenNext
- **Asset Storage**: Cloudflare R2 for video hosting
- **CI/CD**: GitHub Actions for automated deployment
- **Animation**: Framer Motion
- **Font**: Space Grotesk (custom font)

## 📁 Project Structure

```
/
├── .github/workflows/       # GitHub Actions CI/CD
├── public/                  # Static assets
│   ├── img/                 # Logo and favicons
│   └── video/              # Video files (local dev only)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── contact/        # Contact page
│   │   ├── docs/           # Documentation page
│   │   ├── ensemble/       # Ensemble product page
│   │   ├── future/         # Future vision page
│   │   ├── task/           # Magi product page
│   │   ├── mech/           # MECH product page
│   │   ├── one/            # One product page
│   │   ├── showcase/       # App showcase page
│   │   ├── signup/         # Signup page
│   │   ├── stack/          # Tech stack page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── not-found.tsx   # 404 page
│   │   └── page.tsx        # Homepage
│   └── components/         # Reusable components
│       ├── Footer.tsx      # Site footer
│       ├── Header.tsx      # Site header
│       ├── HeaderWrapper.tsx # Header state wrapper
│       └── VideoPlayer.tsx # Responsive video component
├── wrangler.jsonc          # Cloudflare Workers config
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Cloudflare account (for deployment)
- GitHub account (for CI/CD)

### Local Development

```bash
# Install dependencies
npm install

# Start development server with TurboPack
npm run dev

# The site will be available at http://localhost:3000
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Cloudflare R2 Configuration (commented out for local dev)
# NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.justevery.com
# NEXT_PUBLIC_R2_BUCKET_NAME=justevery-assets
```

For local development, keep these commented out to use local video files. In production, they're set automatically by GitHub Actions.

## 🎬 Video Architecture

### Video Handling

The site uses a dual approach for video content:

1. **Local Development**: Videos are served from `/public/video/`
2. **Production**: Videos are served from Cloudflare R2 at `https://assets.justevery.com`

### VideoPlayer Component

The `VideoPlayer` component automatically detects the environment and serves videos from the appropriate source. It includes:

- Responsive video sources based on screen size and pixel density
- WebM and MP4 formats for browser compatibility
- Subtitle support with custom positioning
- Fullscreen playback with sound
- Automatic quality selection

### Video Quality Breakpoints

- **4K**: 1440px+ width with 2x density, or 2560px+ width
- **2K**: 1280px-1439px with 2x density, or 1920px-2559px
- **1080p**: 1280px+ with standard density
- **720p**: 768px+ on mobile/tablet
- **480p**: Mobile devices under 768px

## 🚀 Deployment

### Automatic Deployment

The site automatically deploys to Cloudflare Workers when you push to the `main` branch via GitHub Actions.

### Manual Deployment

```bash
# Build for Cloudflare Workers
npm run build:cloudflare

# Deploy to Cloudflare (requires wrangler authentication)
npx wrangler deploy
```

### Preview Deployment

```bash
# Build and preview locally (excludes video files)
npm run preview
```

## 📦 Asset Management

### Video Files

Videos are stored in `public/video/` for local development but are excluded from the Worker deployment due to the 25MB size limit. In production, they're served from R2.

### R2 Configuration

The R2 bucket (`justevery-assets`) is configured with:

- Public access at `https://assets.justevery.com`
- CORS enabled for `justevery.com` domains
- Automatic upload of changed assets via GitHub Actions

## 🔧 GitHub Actions CI/CD

The deployment workflow (`.github/workflows/deploy-production.yml`) handles:

1. **Asset Upload**: Detects and uploads changed assets to R2
2. **Build Optimization**: Caches dependencies and build artifacts
3. **Smart Building**: Only rebuilds when source files change
4. **Deployment**: Deploys to Cloudflare Workers
5. **Verification**: Ensures build artifacts exist before deployment

### Required GitHub Secrets

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Workers and R2 permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

## 🎨 Design System

### Colors

- **Brand Cyan**: `#00e0ff`
- **Brand Pink**: `#ff00ff`
- **Brand Amber**: `#ffa500`
- **Dark backgrounds**: `#0a0a0b`, `#1a1a1b`

### Typography

- **Display Font**: Space Grotesk (for headings)
- **Body Font**: System font stack

### Components

- Responsive header with mobile menu
- Footer with newsletter signup
- Hero section with video background
- Feature sections with animations
- Call-to-action buttons with gradients

## 📝 Common Tasks

### Update Video Content

1. Add new video files to `public/video/`
2. Update `VideoPlayer` component if needed
3. Push to main branch - GitHub Actions will upload to R2

### Add New Pages

1. Create a new directory in `src/app/[page-name]/`
2. Add `page.tsx` file
3. Update navigation in `Header.tsx`

### Modify Styles

- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind classes
- Theme customization: `tailwind.config.js`

## 🐛 Troubleshooting

### Videos Not Loading in Development

- Ensure `.env.local` has R2 variables commented out
- Check that video files exist in `public/video/`

### Deployment Failures

- Check GitHub Actions logs
- Verify GitHub secrets are set correctly
- Ensure no files exceed 25MB in the Worker bundle

### CORS Issues

- R2 CORS is configured for production domains
- For local testing with R2, you may need to adjust CORS settings

## 📚 Additional Documentation

- [CLAUDE.md](./CLAUDE.md) - AI assistant instructions
- [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) - Detailed deployment guide
- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## 🤝 Contributing

This is the official JustEvery homepage. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

© 2024 JustEvery. All rights reserved.

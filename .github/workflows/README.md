# GitHub Actions Setup

## Required Secrets

You need to add these secrets to your GitHub repository:

1. **CLOUDFLARE_API_TOKEN**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use template: "Edit Cloudflare Workers"
   - Add permissions:
     - Account: Cloudflare Workers Scripts:Edit
     - Account: Account Settings:Read
     - Zone: Workers Routes:Edit (for your domain)
     - Account: Cloudflare R2:Edit
   - Copy the token

2. **CLOUDFLARE_ACCOUNT_ID**
   - Find it in your Cloudflare dashboard URL
   - Or run: `npx wrangler whoami`

## Add Secrets to GitHub

1. Go to your repository on GitHub
2. Navigate to: Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add both secrets:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (your token)
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: (your account ID)

## Workflows

### deploy-production.yml
- **Triggers on**: Push to main branch
- **Actions**:
  1. Checks for changes in public/video, public/images, or public/docs
  2. Uploads changed assets to R2
  3. Builds the Next.js application
  4. Deploys to Cloudflare Workers

### Manual Deployment
You can also trigger deployment manually:
1. Go to Actions tab
2. Select "Deploy Production"
3. Click "Run workflow"

## Local Testing
To test the build locally:
```bash
npm run build:open-next
./scripts/post-build-cleanup.sh
```
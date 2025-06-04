# How to Get Your Cloudflare API Token

## Step 1: Log in to Cloudflare

1. Go to https://dash.cloudflare.com
2. Log in with your Cloudflare account

## Step 2: Navigate to API Tokens

1. Click on your profile icon in the top right corner
2. Select "My Profile"
3. In the left sidebar, click on "API Tokens"
4. Or go directly to: https://dash.cloudflare.com/profile/api-tokens

## Step 3: Create a New Token

1. Click "Create Token"
2. You have two options:
   - Use a template: Look for "Custom token" and click "Get started"
   - Or use the "Edit Cloudflare Workers" template if available

## Step 4: Configure Token Permissions

For this project, you need these permissions:

### Required Permissions:

- **Account** - Cloudflare Workers R2 Storage:Edit
- **Zone** - Zone:Read
- **Zone** - Cache Purge:Purge

### Token Settings:

1. **Token name**: "JustEvery Deployment"
2. **Permissions**:
   - Account → Cloudflare Workers R2 Storage → Edit
   - Zone → Zone → Read
   - Zone → Cache Purge → Purge
3. **Account Resources**: Include → Your account
4. **Zone Resources**: Include → Specific zone → justevery.com

## Step 5: Create and Copy Token

1. Click "Continue to summary"
2. Review the permissions
3. Click "Create Token"
4. **IMPORTANT**: Copy the token immediately - you won't be able to see it again!

## Step 6: Get Your Account ID

1. Go back to the Cloudflare dashboard
2. Select your domain (justevery.com)
3. In the right sidebar, you'll see "Account ID"
4. Copy this ID

## Step 7: Get Your Zone ID (for cache purging)

1. On the same page (domain overview)
2. In the right sidebar, you'll see "Zone ID"
3. Copy this ID

## Using the Token Locally

Once you have your token and IDs, you can run:

```bash
CLOUDFLARE_API_TOKEN=your_token_here \
CLOUDFLARE_ACCOUNT_ID=your_account_id_here \
./scripts/upload-assets-to-r2.sh
```

## Storing for GitHub Actions

Add these as secrets in your GitHub repository:

1. Go to your repo settings
2. Navigate to Secrets and variables → Actions
3. Add these secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_ZONE_ID`

## Security Notes

- Never commit these tokens to your repository
- Tokens can be revoked anytime from the Cloudflare dashboard
- Use environment variables or GitHub secrets only
- Consider creating separate tokens for different purposes

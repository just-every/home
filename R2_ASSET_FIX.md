# R2 Asset Availability Fix

## Issue Summary

The JustEvery homepage was experiencing "Application error: a client-side exception" because video assets on R2 were becoming unavailable after deployment.

## Root Cause

1. **The deployment workflow was not pulling Git LFS files** - The `git lfs pull` commands were commented out
2. **Only changed assets were being uploaded** - If R2 assets disappeared, they wouldn't be re-uploaded
3. **No verification step** - The workflow didn't check if critical assets existed in R2

## Solutions Implemented

### 1. Fixed Deployment Workflow

- Re-enabled Git LFS pull in the deployment workflow
- Added asset verification that checks if key files exist in R2
- Made the workflow re-upload ALL assets if any are missing

### 2. Created Force Upload Script

A new script at `scripts/force-upload-assets-to-r2.sh` that:

- Pulls all Git LFS files
- Uploads ALL video and image assets to R2
- Verifies critical assets are accessible

## Immediate Fix Steps

1. **Run the force upload script locally:**

   ```bash
   cd /Users/zemaj/www/just-every/home
   export CLOUDFLARE_API_TOKEN='your-token'
   export CLOUDFLARE_ACCOUNT_ID='your-account-id'
   ./scripts/force-upload-assets-to-r2.sh
   ```

2. **Trigger a new deployment** to use the fixed workflow:
   ```bash
   git add .
   git commit -m "fix: ensure R2 assets are always available during deployment"
   git push origin main
   ```

## Verification

After running the fix:

1. Check https://justevery.com loads without errors
2. Verify videos play correctly
3. Check browser console for any asset loading errors

## Prevention

The updated workflow now:

- Always pulls LFS files during deployment
- Verifies assets exist in R2 before deploying
- Re-uploads missing assets automatically
- Fails the deployment if critical assets can't be verified

This ensures assets will always be available, even if they disappear from R2.

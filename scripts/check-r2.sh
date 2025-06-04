#!/bin/bash

echo "🔍 Checking R2 configuration..."

# Check if required environment variables are set
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ Error: Please set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID environment variables"
    exit 1
fi

echo "✅ Environment variables set"
echo "Account ID: $CLOUDFLARE_ACCOUNT_ID"

# List R2 buckets
echo -e "\n📋 Listing R2 buckets:"
npx wrangler r2 bucket list 2>/dev/null || echo "Failed to list buckets - authentication error"

# Check if we can use direct API calls
echo -e "\n📋 Trying direct API call to list R2 buckets:"
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" | jq '.' 2>/dev/null || echo "Failed to parse JSON response"
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Video files are excluded from deployment since they're served from R2
  // Videos remain in public/video for local development
});
import { ShowcaseItem } from '@/types';

export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'startup-metrics',
    title: 'Startup Metrics Dashboard',
    prompt:
      'Build me a real-time dashboard that tracks our MRR, churn, and runway with Stripe integration',
    buildTime: 47,
    clones: 2300,
    gradientFrom: 'brand-cyan',
    gradientTo: 'brand-pink',
  },
  {
    id: 'ai-study-buddy',
    title: 'AI Study Buddy',
    prompt:
      'Create a flashcard app that uses AI to generate questions from my uploaded PDFs',
    buildTime: 35,
    clones: 8700,
    gradientFrom: 'brand-pink',
    gradientTo: 'brand-amber',
  },
  {
    id: 'local-events',
    title: 'Local Events Aggregator',
    prompt:
      'Show me all concerts, art shows, and food festivals happening this weekend in Brooklyn',
    buildTime: 52,
    clones: 4100,
    gradientFrom: 'brand-amber',
    gradientTo: 'brand-cyan',
  },
  {
    id: 'team-retro',
    title: 'Team Retrospective Tool',
    prompt:
      'Anonymous feedback board with real-time voting and action item tracking',
    buildTime: 28,
    clones: 12500,
    gradientFrom: 'brand-cyan',
    gradientVia: 'brand-pink',
    gradientTo: 'brand-amber',
  },
];

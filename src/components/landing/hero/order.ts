import { volumes } from '@/components/landing/volumes';
import type { Volume } from '@/components/landing/volumes';

/**
 * The rows, in the 12ui design's order: each rented tool beside the seed
 * that replaces it (Notion beside Slate, Slack beside Nook, and so on). A
 * seed added later joins the end of both lists.
 */
const designOrder = [
  'slate',
  'nook',
  'happytohelp',
  'dial',
  'vector',
  'orbit',
  'cradle',
  'pencil',
  'mango',
  'lamp',
  'uptime',
  'spool',
  'penny',
  'oncall',
];

const rank = (volume: Volume) => {
  const index = designOrder.indexOf(volume.slug);
  return index < 0 ? designOrder.length : index;
};

export const rows: Volume[] = [...volumes].sort((a, b) => rank(a) - rank(b));

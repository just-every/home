'use client';

import { motion } from 'framer-motion';
import { ShowcaseItem } from '@/types';
import PlaceholderImage from '@/components/PlaceholderImage';

interface ShowcaseCardProps {
  item: ShowcaseItem;
  index: number;
}

export default function ShowcaseCard({ item, index }: ShowcaseCardProps) {
  const gradientClass = item.gradientVia
    ? `from-${item.gradientFrom}/20 via-${item.gradientVia}/20 to-${item.gradientTo}/20`
    : `from-${item.gradientFrom}/20 to-${item.gradientTo}/20`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
    >
      <div className="bg-dark-100 relative aspect-video overflow-hidden rounded-lg">
        <PlaceholderImage
          width={600}
          height={337}
          text={item.title}
          className="h-full w-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
        ></div>
      </div>
      <div className="mt-4">
        <h3 className="gradient-text mb-2 text-2xl font-bold">{item.title}</h3>
        <p className="text-white/60 italic">&quot;{item.prompt}&quot;</p>
        <p className="text-brand-amber mt-2 text-sm">
          Built in {item.buildTime} seconds • {(item.clones / 1000).toFixed(1)}k
          clones
        </p>
      </div>
    </motion.div>
  );
}

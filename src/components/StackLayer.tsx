'use client';

import { motion } from 'framer-motion';
import { Code, Diamond, Box, Minus, LucideIcon } from 'lucide-react';
import { StackLayer as StackLayerType } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Diamond,
  Box,
  Minus,
};

interface StackLayerProps {
  layer: StackLayerType;
  index: number;
}

export default function StackLayer({ layer, index }: StackLayerProps) {
  const Icon = iconMap[layer.icon] || Code;
  const gradientClass = layer.gradientVia
    ? `from-${layer.gradientFrom} via-${layer.gradientVia} to-${layer.gradientTo}`
    : `from-${layer.gradientFrom} to-${layer.gradientTo}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div
        className={`mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{layer.name}</h3>
      <p className="text-white/60">{layer.description}</p>
    </motion.div>
  );
}

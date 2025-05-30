import { StackLayer } from '@/types';

export const stackLayers: StackLayer[] = [
  {
    id: 'ensemble',
    name: 'ensemble',
    description: 'multi-model conversations',
    icon: 'Code',
    gradientFrom: 'brand-cyan',
    gradientTo: 'brand-pink',
  },
  {
    id: 'MECH',
    name: 'MECH',
    description: 'ensemble chain-of-thought',
    icon: 'Cpu',
    gradientFrom: 'brand-pink',
    gradientTo: 'brand-amber',
  },
  {
    id: 'magi',
    name: 'magi',
    description: 'mostly autonomous intelligence',
    icon: 'Box',
    gradientFrom: 'brand-amber',
    gradientTo: 'brand-cyan',
  },
  {
    id: 'justevery',
    name: 'JustEvery_',
    description: 'the end game',
    icon: 'Sparkles',
    gradientFrom: 'brand-cyan',
    gradientVia: 'brand-pink',
    gradientTo: 'brand-amber',
  },
];

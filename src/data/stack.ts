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
    id: 'task',
    name: 'task',
    description: 'thoughtful task loop',
    icon: 'Diamond',
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
    icon: 'Minus',
    gradientFrom: 'brand-cyan',
    gradientVia: 'brand-pink',
    gradientTo: 'brand-amber',
  },
];

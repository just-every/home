export interface ShowcaseItem {
  id: string;
  title: string;
  prompt: string;
  buildTime: number;
  clones: number;
  gradientFrom: string;
  gradientTo: string;
  gradientVia?: string;
}

export interface StackLayer {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  gradientVia?: string;
}

export interface VideoSource {
  src: string;
  type: string;
  media?: string;
}

export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

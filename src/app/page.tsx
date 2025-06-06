'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ShowcaseCard from '@/components/ShowcaseCard';
import StackLayer from '@/components/StackLayer';
import { showcaseItems } from '@/data/showcase';
import { stackLayers } from '@/data/stack';
// import { playVideoDirectly } from '@/components/VideoPlayer';

const VideoPlayer = dynamic(
  () =>
    import('@/components/VideoPlayer').then(mod => ({
      default: mod.VideoPlayer,
    })),
  {
    loading: () => (
      <div className="bg-dark-100 h-[60vh] w-full animate-pulse lg:h-auto lg:min-h-[80vh]" />
    ),
  }
);

export default function Home() {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoContainerStyle, setVideoContainerStyle] =
    useState<React.CSSProperties>({});
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateVideoSize = () => {
      const isSmallScreen = window.innerWidth < 640;

      if (isSmallScreen) {
        // Small screens: fixed 60vh height
        setVideoContainerStyle({
          height: '60vh',
          width: '100%',
        });
      } else {
        // Large screens: video + subtitles
        const maxWidth = window.innerWidth;
        const videoHeight = maxWidth / 2.4;
        const containerHeight = videoHeight + 120;

        // Ensure it doesn't exceed 100vh
        const maxHeight = window.innerHeight;
        if (containerHeight > maxHeight) {
          const scale = maxHeight / containerHeight;
          setVideoContainerStyle({
            width: maxWidth * scale + 'px',
            height: maxHeight + 'px',
          });
        } else {
          setVideoContainerStyle({
            width: maxWidth + 'px',
            height: containerHeight + 'px',
          });
        }
      }
    };

    calculateVideoSize();
    window.addEventListener('resize', calculateVideoSize);
    return () => window.removeEventListener('resize', calculateVideoSize);
  }, []);

  const handlePlayFullscreen = () => {
    setShowPlayButton(false);

    // Show button again when exiting fullscreen
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowPlayButton(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange, {
      once: true,
    });
    document.addEventListener(
      'webkitfullscreenchange',
      handleFullscreenChange,
      { once: true }
    );
  };

  return (
    <>
      {/* Hero Section - Full viewport with video */}
      <div className="bg-dark-200 relative flex min-h-screen items-center justify-center overflow-x-hidden">
        {/* Play button overlay - increased z-index and added background for debugging */}
        {showPlayButton && (
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-[100] flex h-[72px] items-center">
            <div className="container mx-auto flex justify-end px-4">
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Use the VideoPlayer's exposed API
                  const playVideoFullscreen = (
                    window as Window & { playVideoFullscreen?: () => void }
                  ).playVideoFullscreen;
                  if (playVideoFullscreen) {
                    playVideoFullscreen();
                  } else {
                    console.error('playVideoFullscreen function not available');
                  }
                }}
                className={`pointer-events-auto flex items-center gap-2 rounded-full border-2 border-white/50 bg-black/50 p-4 transition-all duration-300 hover:scale-105 hover:bg-white/20 ${
                  isScrolled ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
                aria-label="Play video with sound"
              >
                <Play className="h-5 w-5 text-white" />
                <span className="px-2 text-sm text-white">
                  <span className="sm:hidden">Play</span>
                  <span className="hidden sm:inline">Play with sound</span>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Video container with calculated sizing */}
        <div
          ref={videoContainerRef}
          className="relative z-10 overflow-hidden"
          style={videoContainerStyle}
        >
          <VideoPlayer
            className="hero-video h-full w-full object-cover sm:object-contain"
            onPlayFullscreen={handlePlayFullscreen}
            style={{ objectPosition: 'center' }}
          />
          {/* Removed overlays that were blocking interactions */}
        </div>
      </div>

      {/* Title section - below the fold */}
      <section className="bg-dark-200 flex min-h-[40vh] items-center justify-center overflow-x-hidden px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-center text-5xl font-bold md:text-7xl"
          >
            <span className="block">Apps end. Ideas begin.</span>
          </motion.h1>
        </div>
      </section>

      {/* Additional content section */}
      <section className="bg-dark-200 overflow-x-hidden px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-6 max-w-3xl text-xl text-white/80 md:text-2xl"
          >
            We&apos;re building UI first, generative software, with ensemble AI.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-6 max-w-3xl text-xl text-white/80 md:text-2xl"
          >
            We build in the <span className="font-semibold">Open</span>. No,
            really.
            <br />
            It&apos;s not in our name, it&apos;s in our repo.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-white/60"
          >
            <span className="text-brand-amber font-semibold">
              Fair warning:
            </span>{' '}
            We&apos;re an MVP that will fail sometimes. But we&apos;re improving
            at an exponential rate. Join the revolution now and watch it evolve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/signup"
              className="group relative inline-flex items-center overflow-hidden rounded-full px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:scale-105"
            >
              <span className="from-brand-cyan via-brand-pink to-brand-amber absolute inset-0 bg-gradient-to-r opacity-75 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative">Build Your First App</span>
            </Link>

            <a
              href="#trailer"
              className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-white/10"
            >
              Watch 50″ trailer
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Stack Section */}
      <section className="bg-dark-100 overflow-x-hidden px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-4 text-center text-3xl font-bold md:text-5xl">
            Four layers. One request.
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {stackLayers.map((layer, index) => (
              <StackLayer key={layer.id} layer={layer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-dark-200 overflow-x-hidden px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-4 text-center text-3xl font-bold md:text-5xl">
            What can you build in 30 seconds?
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-xl text-white/60">
            Real apps, built by real people, in under a minute. Share your
            creations with the community.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {showcaseItems.map((item, index) => (
              <ShowcaseCard key={item.id} item={item} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/showcase"
              className="text-brand-cyan hover:text-brand-pink inline-flex items-center gap-2 transition-colors duration-300"
            >
              Explore the app gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-dark-100 overflow-x-hidden px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display mb-8 text-3xl font-bold md:text-5xl">
            UI-first, then code follows
          </h2>
          <p className="mb-12 text-2xl text-white/80">
            <span className="text-brand-cyan">Ask</span> →
            <span className="text-brand-pink mx-2">Imagine</span> →
            <span className="text-brand-amber mx-2">Materialise</span> →
            <span className="text-brand-cyan">Iterate</span>
          </p>
          <div className="mx-auto max-w-3xl space-y-6 text-left text-lg text-white/70">
            <p>
              <span className="text-brand-cyan font-semibold">
                1. You describe
              </span>{' '}
              what you want in plain English. No technical knowledge required.
            </p>
            <p>
              <span className="text-brand-pink font-semibold">
                2. AI generates mockups
              </span>{' '}
              using image generators to visualize your app before writing a
              single line of code. This ensures we nail the design first.
            </p>
            <p>
              <span className="text-brand-amber font-semibold">
                3. Magi materializes
              </span>{' '}
              the visual design into working code, spinning up secured
              containers with proper backend, database, and API integrations.
            </p>
            <p>
              <span className="text-brand-cyan font-semibold">
                4. Watch it evolve
              </span>{' '}
              as the system observes real user interactions and automatically
              refactors to improve performance and UX.
            </p>
          </div>
          <p className="text-md mt-8 text-white/50 italic">
            Yes, it will break sometimes. But each failure makes the system
            smarter.
          </p>
        </div>
      </section>

      {/* Social Network Section */}
      <section className="bg-dark-200 overflow-x-hidden px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display mb-6 text-3xl font-bold md:text-5xl">
                Not just a builder.
                <br />
                <span className="gradient-text">A community.</span>
              </h2>
              <p className="mb-6 text-xl text-white/80">
                Every app you create becomes part of the JustEvery ecosystem.
                Clone, remix, and improve on what others have built.
              </p>
              <ul className="space-y-4 text-lg text-white/70">
                <li className="flex items-start">
                  <span className="text-brand-cyan mr-3">▸</span>
                  <span>
                    <strong>Share your apps</strong> with one click and let
                    others build on your ideas
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-pink mr-3">▸</span>
                  <span>
                    <strong>Fork and customize</strong> any public app to make
                    it your own
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-amber mr-3">▸</span>
                  <span>
                    <strong>Learn from the best</strong> by exploring how
                    successful apps are built
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-cyan mr-3">▸</span>
                  <span>
                    <strong>Collaborate in real-time</strong> with AI and human
                    developers alike
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden">
              <div className="bg-dark-100 aspect-square overflow-hidden rounded-lg">
                <div className="from-brand-cyan/20 via-brand-pink/20 to-brand-amber/20 flex h-full w-full items-center justify-center bg-gradient-to-br">
                  <p className="px-8 text-center text-white/40">
                    Community visualization coming soon
                  </p>
                </div>
              </div>
              <div className="from-brand-pink to-brand-amber absolute -right-3 -bottom-3 rounded-full bg-gradient-to-r px-4 py-2 text-xs font-semibold text-white sm:-right-6 sm:-bottom-6 sm:px-6 sm:py-3 sm:text-sm">
                37,842 apps created this week
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="bg-dark-200 overflow-x-hidden px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display mb-8 text-3xl font-bold md:text-5xl">
            Open source, open future
          </h2>
          <p className="mb-6 text-2xl text-white/90">
            100% MIT-licensed. Forever free to use, modify, and distribute.
          </p>
          <p className="mb-4 text-xl text-white/80">
            We <em>encourage</em> commercial users to donate{' '}
            <span className="text-brand-amber text-2xl font-bold">90%</span> of
            profits toward building a post-scarcity world.
          </p>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-white/60">
            This isn&apos;t just another startup. It&apos;s the beginning of a
            world where anyone can build anything. Where software creation is
            democratized. Where the barrier between idea and reality disappears.
          </p>
          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/future"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-white transition-all duration-300 hover:bg-white/10"
            >
              Read the manifesto
            </Link>
            <a
              href="https://github.com/just-every"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-white transition-all duration-300 hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the code
            </a>
          </div>
          <p className="text-sm text-white/40">
            Join us in building the future. One app at a time.
          </p>
        </div>
      </section>
    </>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Code, Cpu, Box, Sparkles, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function Home() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showPlayButton, setShowPlayButton] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force subtitles to show even when muted
        const enableSubtitles = () => {
            if (video.textTracks && video.textTracks.length > 0) {
                // Find the subtitle track
                for (let i = 0; i < video.textTracks.length; i++) {
                    const track = video.textTracks[i];
                    if (track.kind === 'subtitles' || track.kind === 'captions') {
                        track.mode = 'showing';
                        console.log('Subtitles enabled:', track.label);
                    }
                }
            }
        };

        const handleTimeUpdate = () => {
            // Only loop at 58 seconds if not in fullscreen
            const isFullscreen = document.fullscreenElement || 
                                (document as any).webkitFullscreenElement || 
                                (document as any).msFullscreenElement;
            
            if (!isFullscreen && video.currentTime >= 58) {
                video.currentTime = 0;
                video.play();
            }
        };

        video.addEventListener('loadedmetadata', enableSubtitles);
        video.addEventListener('timeupdate', handleTimeUpdate);
        
        // Try to enable subtitles immediately if already loaded
        enableSubtitles();
        
        return () => {
            video.removeEventListener('loadedmetadata', enableSubtitles);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const playFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        // Remove the loop attribute for fullscreen playback
        video.loop = false;
        
        // Unmute and restart video
        video.muted = false;
        video.currentTime = 0;
        
        // Hide subtitles in fullscreen with sound
        if (video.textTracks && video.textTracks.length > 0) {
            for (let i = 0; i < video.textTracks.length; i++) {
                video.textTracks[i].mode = 'hidden';
            }
        }
        
        // Set video to contain within viewport to prevent cutoff
        video.style.objectFit = 'contain';
        video.style.width = '100%';
        video.style.height = '100%';
        
        // Add controls for fullscreen playback
        video.controls = true;
        
        // Request fullscreen on the video element itself to get native controls
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if ((video as any).webkitRequestFullscreen) {
            (video as any).webkitRequestFullscreen();
        } else if ((video as any).msRequestFullscreen) {
            (video as any).msRequestFullscreen();
        }
        
        video.play();
        setShowPlayButton(false);
        
        // Show button again when exiting fullscreen
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                video.muted = true;
                video.loop = true;
                video.controls = false; // Hide controls again
                video.style.objectFit = 'cover'; // Reset to original
                
                // Re-enable subtitles
                if (video.textTracks && video.textTracks.length > 0) {
                    for (let i = 0; i < video.textTracks.length; i++) {
                        const track = video.textTracks[i];
                        if (track.kind === 'subtitles' || track.kind === 'captions') {
                            track.mode = 'showing';
                        }
                    }
                }
                
                setShowPlayButton(true);
            }
        };
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    };

    return (
        <>
            {/* Hero Section - Full viewport with video and title */}
            <div className="flex flex-col min-h-screen">
                {/* Black space at top with play button */}
                <div className="h-[72px] bg-dark-200 flex-shrink-0 relative">
                    {/* Play with sound button */}
                    {showPlayButton && (
                        <div className="absolute top-0 left-0 right-0 h-full flex items-center">
                            <div className="container mx-auto px-4 flex justify-end">
                                <button
                                    onClick={playFullscreen}
                                    className={`hover:bg-white/20 transition-all duration-300 rounded-full p-3 flex items-center gap-2 hover:scale-105 z-[60] relative ${
                                        isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                    }`}
                                    aria-label="Play video with sound"
                                >
                                    <Play className="w-5 h-5 text-white" />
                                    <span className="text-white text-sm px-2">
                                        <span className="sm:hidden">Play</span>
                                        <span className="hidden sm:inline">Play with sound</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Video section with fixed height */}
                <div className="relative h-[60vh] overflow-hidden flex-shrink-0 group">
                    <div className="absolute inset-0 -top-[20px] -bottom-[20px]">
                        <video 
                            ref={videoRef}
                            autoPlay 
                            muted 
                            playsInline
                            crossOrigin="anonymous"
                            className="absolute inset-0 w-full h-full object-cover hero-video"
                        >
                            <source src="/video/promo-4k.webm" type="video/webm" />
                            <source src="/video/promo-4k.mp4" type="video/mp4" />
                            <track 
                                label="English" 
                                kind="subtitles" 
                                srcLang="en" 
                                src="/video/promo.vtt" 
                                default
                            />
                        </video>
                    </div>
                    <div className="absolute inset-0 bg-dark-200 opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-radial from-brand-cyan/10 via-brand-pink/10 to-transparent"></div>
                </div>
                
                {/* Title section - fills remaining viewport height */}
                <section className="bg-dark-200 flex-grow flex items-center justify-center px-4 pb-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-display font-bold text-center"
                    >
                        <span className="block">When apps end, ideas begin.</span>
                    </motion.h1>
                </section>
            </div>
            
            {/* Additional content section */}
            <section className="bg-dark-200 py-16 px-4">
                <div className="text-center max-w-6xl mx-auto">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/80 mb-6 max-w-3xl mx-auto"
                    >
                        We&apos;re building UI first, generative software, with ensemble AI.
                    </motion.p>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/80 mb-6 max-w-3xl mx-auto"
                    >
                        We build in the <span className="font-semibold">Open</span>. No, really.<br />It&apos;s not in our name, it&apos;s in our repo.
                    </motion.p>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg text-white/60 mb-10 max-w-2xl mx-auto"
                    >
                        <span className="text-brand-amber font-semibold">Fair warning:</span> We&apos;re an MVP that will fail sometimes. 
                        But we&apos;re improving at an exponential rate. Join the revolution now and watch it evolve.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link 
                            href="/signup"
                            className="relative group inline-flex items-center px-8 py-4 text-lg font-medium text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-amber opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative">Build Your First App</span>
                        </Link>
                        
                        <a 
                            href="#trailer"
                            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                        >
                            Watch 50″ trailer
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* The Stack Section */}
            <section className="py-20 px-4 bg-dark-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4">
                        Four layers. One request.
                    </h2>
                    
                    <div className="mt-16 grid md:grid-cols-4 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-brand-cyan to-brand-pink flex items-center justify-center">
                                <Code className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ensemble</h3>
                            <p className="text-white/60">multi-model conversations</p>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-brand-pink to-brand-amber flex items-center justify-center">
                                <Cpu className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">MECH</h3>
                            <p className="text-white/60">ensemble chain-of-thought</p>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-brand-amber to-brand-cyan flex items-center justify-center">
                                <Box className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">magi</h3>
                            <p className="text-white/60">mostly autonomous intelligence</p>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-brand-cyan via-brand-pink to-brand-amber flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">JustEvery_</h3>
                            <p className="text-white/60">the end game</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-20 px-4 bg-dark-200">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4">
                        What can you build in 30 seconds?
                    </h2>
                    <p className="text-xl text-white/60 text-center mb-16 max-w-3xl mx-auto">
                        Real apps, built by real people, in under a minute. Share your creations with the community.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="aspect-video bg-dark-100 rounded-lg overflow-hidden">
                                {/* Replace with actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-brand-cyan/20 to-brand-pink/20"></div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-bold mb-2 gradient-text">Startup Metrics Dashboard</h3>
                                <p className="text-white/60 italic">&quot;Build me a real-time dashboard that tracks our MRR, churn, and runway with Stripe integration&quot;</p>
                                <p className="text-sm text-brand-amber mt-2">Built in 47 seconds • 2.3k clones</p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="aspect-video bg-dark-100 rounded-lg overflow-hidden">
                                {/* Replace with actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-brand-pink/20 to-brand-amber/20"></div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-bold mb-2 gradient-text">AI Study Buddy</h3>
                                <p className="text-white/60 italic">&quot;Create a flashcard app that uses AI to generate questions from my uploaded PDFs&quot;</p>
                                <p className="text-sm text-brand-amber mt-2">Built in 35 seconds • 8.7k clones</p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="aspect-video bg-dark-100 rounded-lg overflow-hidden">
                                {/* Replace with actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-brand-amber/20 to-brand-cyan/20"></div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-bold mb-2 gradient-text">Local Events Aggregator</h3>
                                <p className="text-white/60 italic">&quot;Show me all concerts, art shows, and food festivals happening this weekend in Brooklyn&quot;</p>
                                <p className="text-sm text-brand-amber mt-2">Built in 52 seconds • 4.1k clones</p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="aspect-video bg-dark-100 rounded-lg overflow-hidden">
                                {/* Replace with actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-brand-cyan/20 via-brand-pink/20 to-brand-amber/20"></div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-2xl font-bold mb-2 gradient-text">Team Retrospective Tool</h3>
                                <p className="text-white/60 italic">&quot;Anonymous feedback board with real-time voting and action item tracking&quot;</p>
                                <p className="text-sm text-brand-amber mt-2">Built in 28 seconds • 12.5k clones</p>
                            </div>
                        </motion.div>
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link 
                            href="/showcase"
                            className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-pink transition-colors duration-300"
                        >
                            Explore the app gallery <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-20 px-4 bg-dark-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
                        UI-first, then code follows
                    </h2>
                    <p className="text-2xl text-white/80 mb-12">
                        <span className="text-brand-cyan">Ask</span> → 
                        <span className="text-brand-pink mx-2">Imagine</span> → 
                        <span className="text-brand-amber mx-2">Materialise</span> → 
                        <span className="text-brand-cyan">Iterate</span>
                    </p>
                    <div className="text-left max-w-3xl mx-auto space-y-6 text-lg text-white/70">
                        <p>
                            <span className="text-brand-cyan font-semibold">1. You describe</span> what you want in plain English. 
                            No technical knowledge required.
                        </p>
                        <p>
                            <span className="text-brand-pink font-semibold">2. AI generates mockups</span> using image generators to visualize your app before writing a single line of code. 
                            This ensures we nail the design first.
                        </p>
                        <p>
                            <span className="text-brand-amber font-semibold">3. Magi materializes</span> the visual design into working code, 
                            spinning up secured containers with proper backend, database, and API integrations.
                        </p>
                        <p>
                            <span className="text-brand-cyan font-semibold">4. Watch it evolve</span> as the system observes real user interactions 
                            and automatically refactors to improve performance and UX.
                        </p>
                    </div>
                    <p className="text-md text-white/50 mt-8 italic">
                        Yes, it will break sometimes. But each failure makes the system smarter.
                    </p>
                </div>
            </section>

            {/* Social Network Section */}
            <section className="py-20 px-4 bg-dark-200">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                                Not just a builder.<br/>
                                <span className="gradient-text">A community.</span>
                            </h2>
                            <p className="text-xl text-white/80 mb-6">
                                Every app you create becomes part of the JustEvery ecosystem. Clone, remix, and improve on what others have built.
                            </p>
                            <ul className="space-y-4 text-lg text-white/70">
                                <li className="flex items-start">
                                    <span className="text-brand-cyan mr-3">▸</span>
                                    <span><strong>Share your apps</strong> with one click and let others build on your ideas</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-pink mr-3">▸</span>
                                    <span><strong>Fork and customize</strong> any public app to make it your own</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-amber mr-3">▸</span>
                                    <span><strong>Learn from the best</strong> by exploring how successful apps are built</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-brand-cyan mr-3">▸</span>
                                    <span><strong>Collaborate in real-time</strong> with AI and human developers alike</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-dark-100 rounded-lg overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-brand-cyan/20 via-brand-pink/20 to-brand-amber/20 flex items-center justify-center">
                                    <p className="text-white/40 text-center px-8">Community visualization coming soon</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-brand-pink to-brand-amber text-white px-6 py-3 rounded-full text-sm font-semibold">
                                37,842 apps created this week
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Source Section */}
            <section className="py-20 px-4 bg-dark-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
                        Open source, open future
                    </h2>
                    <p className="text-2xl text-white/90 mb-6">
                        100% MIT-licensed. Forever free to use, modify, and distribute.
                    </p>
                    <p className="text-xl text-white/80 mb-4">
                        We <em>encourage</em> commercial users to donate <span className="font-bold text-brand-amber text-2xl">90%</span> of profits 
                        toward building a post-scarcity world.
                    </p>
                    <p className="text-lg text-white/60 mb-12 max-w-3xl mx-auto">
                        This isn&apos;t just another startup. It&apos;s the beginning of a world where anyone can build anything. 
                        Where software creation is democratized. Where the barrier between idea and reality disappears.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link 
                            href="/future"
                            className="inline-flex items-center px-6 py-3 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                        >
                            Read the manifesto
                        </Link>
                        <a 
                            href="https://github.com/just-every"
                            className="inline-flex items-center px-6 py-3 text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
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
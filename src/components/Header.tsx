'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Github as GitHubIcon } from 'lucide-react';

interface HeaderProps {
  isHomepage?: boolean;
}

export default function Header({ isHomepage = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300`}
    >
      <div className={`w-full transition-all duration-300 ${
        isHomepage && !isScrolled 
          ? 'bg-transparent' 
          : isScrolled 
            ? 'bg-dark-200/80 backdrop-blur-lg' 
            : isHomepage 
              ? 'bg-transparent'
              : 'bg-dark-200/80 backdrop-blur-lg'
      }`}>
        <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center transition-transform duration-200 hover:scale-105"
          >
            <Image 
              src="/img/logo.svg" 
              alt="JustEvery_" 
              width={105} 
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-8 transition-opacity duration-300 ${
            isHomepage && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <Link href="/stack" className="text-white/80 hover:text-white transition-colors duration-200">
              Stack
            </Link>
            <Link href="/showcase" className="text-white/80 hover:text-white transition-colors duration-200">
              Showcase
            </Link>
            <Link href="/docs" className="text-white/80 hover:text-white transition-colors duration-200">
              Docs
            </Link>
           
          </nav>

          {/* Right side - CTA and Mobile Menu */}
          <div className={`flex items-center gap-4 transition-opacity duration-300 ${
            isHomepage && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>

             <a 
              href="https://github.com/just-every"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center px-6 py-2.5 text-sm font-medium text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <GitHubIcon className="w-4 h-4 mr-2" />
              GitHub
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-dark-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/stack"
                className="block py-2 text-white/80 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stack
              </Link>
              <Link
                href="/showcase"
                className="block py-2 text-white/80 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Showcase
              </Link>
              <Link
                href="/docs"
                className="block py-2 text-white/80 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <a 
                href="https://github.com/just-every"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </nav>
      )}
      </div>
    </header>
  );
}

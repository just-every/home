import { Github as GitHubIcon } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-auto bg-dark-100 border-t border-dark-50">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <p className="text-white/60 text-sm flex items-center gap-4">
          © {currentYear} JustEvery ·
          <span className="uppercase tracking-wide text-xs text-white/40">
            Keeping launches fresh
          </span>
          ·
          <a 
            href="https://github.com/just-every" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 flex items-center gap-1"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
          · 
          <a 
            href="https://discord.gg/just-every" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Discord
          </a>
        </p>
      </div>
    </footer>
  );
}

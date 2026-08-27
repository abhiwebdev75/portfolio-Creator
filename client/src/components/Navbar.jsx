import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { mediaUrl } from '../api/client';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const name = profile?.name || 'Portfolio';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? 'border-b border-white/10 bg-slate-950/60 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight text-white">
          {name}
          <span className="text-brand-500">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          {profile?.resumeUrl && (
            <a
              href={mediaUrl(profile.resumeUrl)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary ml-2"
            >
              Resume
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl md:hidden">
          <div className="container flex flex-col py-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

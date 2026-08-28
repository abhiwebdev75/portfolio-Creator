import { useState } from 'react';

// Full-viewport blurred backdrop for the "glass" theme.
// Drop your picture at client/public/bg.jpg (or .jpeg/.png/.webp) and it becomes
// the frosted background; otherwise an ambient gradient mesh is used. Everything
// above the page sits on frosted-glass panels (see .card + the navbar).
const CANDIDATES = ['/bg.jpg', '/bg.jpeg', '/bg.png', '/bg.webp'];

export default function Backdrop({ blur = 'blur-2xl' }) {
  const [idx, setIdx] = useState(0);
  const src = idx < CANDIDATES.length ? CANDIDATES[idx] : null;

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* Uploaded picture, blurred (scaled up so blurred edges never show) */}
      {src && (
        <img
          src={src}
          alt=""
          onError={() => setIdx((i) => i + 1)}
          className={`absolute inset-0 h-full w-full scale-125 object-cover ${blur}`}
        />
      )}
      {/* Neutral light mesh matching the hero's monochrome atmosphere */}
      <div className="absolute -left-1/4 -top-1/4 h-[70vmin] w-[70vmin] rounded-full bg-white/[0.06] blur-3xl" />
      <div className="absolute right-[-10%] top-1/4 h-[65vmin] w-[65vmin] rounded-full bg-white/[0.04] blur-3xl" />
      <div className="absolute bottom-[-15%] left-1/3 h-[60vmin] w-[60vmin] rounded-full bg-white/[0.03] blur-3xl" />
      {/* Readability scrim so glass panels + text stay legible over any image */}
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-slate-950" />
    </div>
  );
}

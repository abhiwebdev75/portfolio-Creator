import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import SocialLinks from '../../components/SocialLinks.jsx';
import { mediaUrl } from '../../api/client';

// Orchestrated load sequence: children rise in a staggered cascade.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile }) {
  const name = profile?.name || 'Your Name';
  const headline = profile?.headline || 'Full-Stack Developer';
  const reduce = useReducedMotion();

  // Pointer parallax for the ambient glow — driven by motion values so it
  // never triggers a React re-render on mouse move.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 40, damping: 20 });
  const gy = useSpring(my, { stiffness: 40, damping: 20 });

  const onMouseMove = (e) => {
    if (reduce) return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 40);
    my.set((e.clientY / window.innerHeight - 0.5) * 40);
  };

  return (
    <section
      id="hero"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Ambient breathing glow (drifts with the pointer) */}
      <motion.div style={{ x: gx, y: gy }} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute -left-24 top-8 h-80 w-80 rounded-full bg-brand-600/25 blur-3xl ${
            reduce ? '' : 'animate-glow'
          }`}
        />
        <div
          className={`absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl ${
            reduce ? '' : 'animate-glow'
          }`}
          style={{ animationDelay: '2.5s' }}
        />
        <div
          className={`absolute bottom-8 left-1/3 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl ${
            reduce ? '' : 'animate-glow'
          }`}
          style={{ animationDelay: '5s' }}
        />
      </motion.div>
      {/* Soft center vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.07),transparent_60%)]" />

      <div className="container grid items-center gap-12 md:grid-cols-[1.5fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-4 flex items-center gap-2 font-mono text-sm text-brand-400"
          >
            <span className="h-px w-8 bg-brand-500" /> Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className={`text-gradient ${reduce ? '' : 'animate-gradient'}`}>{name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-display text-2xl font-semibold text-slate-200 sm:text-3xl"
          >
            {headline}
          </motion.p>

          {profile?.bio && (
            <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-slate-400">
              {profile.bio}
            </motion.p>
          )}

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              View my work
            </a>
            <a href="#contact" className="btn-outline">
              Get in touch
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <SocialLinks socials={profile?.socials} email={profile?.email} />
          </motion.div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div
              className={`absolute -inset-2 rounded-full bg-gradient-to-tr from-brand-500 via-cyan-400 to-violet-500 opacity-60 blur-lg ${
                reduce ? '' : 'animate-glow'
              }`}
            />
            {profile?.avatarUrl ? (
              <img
                src={mediaUrl(profile.avatarUrl)}
                alt={name}
                className="relative h-56 w-56 rounded-full border border-white/10 object-cover shadow-2xl sm:h-72 sm:w-72"
              />
            ) : (
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-brand-600/40 to-slate-800 font-display text-7xl font-extrabold text-white/80 shadow-2xl sm:h-72 sm:w-72">
                {name[0]}
              </div>
            )}
            {profile?.location && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 font-mono text-xs text-slate-300 backdrop-blur">
                {profile.location}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-brand-400"
        aria-label="Scroll to about"
      >
        <HiArrowDown className={reduce ? '' : 'animate-bounce'} size={24} />
      </a>
    </section>
  );
}

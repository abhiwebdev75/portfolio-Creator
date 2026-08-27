import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import SectionHeading from '../../components/SectionHeading.jsx';
import Reveal from '../../components/Reveal.jsx';
import { mediaUrl } from '../../api/client';

export default function About({ profile }) {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <SectionHeading eyebrow="Get to know me" title="About Me" />

        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[1fr_1.6fr]">
          <Reveal className="flex justify-center">
            {profile?.avatarUrl ? (
              <img
                src={mediaUrl(profile.avatarUrl)}
                alt={profile?.name || 'Profile'}
                className="h-48 w-48 rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600/40 to-slate-800 text-5xl font-extrabold text-white/80">
                {(profile?.name || 'P')[0]}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <p className="whitespace-pre-line leading-relaxed text-slate-300">
              {profile?.bio || 'Add your bio from the admin dashboard.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
              {profile?.location && (
                <span className="inline-flex items-center gap-2">
                  <HiOutlineLocationMarker className="text-brand-400" /> {profile.location}
                </span>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <HiOutlineMail className="text-brand-400" /> {profile.email}
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

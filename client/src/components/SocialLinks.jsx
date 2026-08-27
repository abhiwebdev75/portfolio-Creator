import { FaGithub, FaLinkedinIn, FaXTwitter, FaGlobe } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  website: FaGlobe,
};

export default function SocialLinks({ socials = {}, email, size = 18, className = '' }) {
  const items = [];
  for (const key of ['github', 'linkedin', 'twitter', 'website']) {
    if (socials[key]) items.push({ key, href: socials[key], Icon: ICONS[key] });
  }
  if (email) items.push({ key: 'email', href: `mailto:${email}`, Icon: HiOutlineMail });

  if (items.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href}
          target={key === 'email' ? undefined : '_blank'}
          rel="noreferrer"
          aria-label={key}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-brand-400 hover:text-white"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}

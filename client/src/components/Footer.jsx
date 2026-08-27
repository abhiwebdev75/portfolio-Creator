import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks.jsx';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  const name = profile?.name || 'Portfolio';

  return (
    <footer className="border-t border-slate-800 py-10">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-slate-400">
          © {year} {name}. Built with the MERN stack.
        </p>
        <SocialLinks socials={profile?.socials} email={profile?.email} />
        <Link to="/admin/login" className="text-xs text-slate-600 hover:text-slate-400">
          Admin
        </Link>
      </div>
    </footer>
  );
}

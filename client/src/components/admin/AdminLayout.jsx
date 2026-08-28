import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCollection,
  HiOutlineChip,
  HiOutlineBriefcase,
  HiOutlineBadgeCheck,
  HiOutlineMail,
  HiOutlineLogout,
  HiOutlineExternalLink,
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: HiOutlineHome, end: true },
  { to: '/admin/profile', label: 'Profile', icon: HiOutlineUser },
  { to: '/admin/projects', label: 'Projects', icon: HiOutlineCollection },
  { to: '/admin/skills', label: 'Skills', icon: HiOutlineChip },
  { to: '/admin/experience', label: 'Experience', icon: HiOutlineBriefcase },
  { to: '/admin/certificates', label: 'Certificates', icon: HiOutlineBadgeCheck },
  { to: '/admin/messages', label: 'Messages', icon: HiOutlineMail },
];

function navClasses({ isActive }) {
  return `flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`;
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Signed out');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-800 p-4 md:flex">
        <div className="px-2 py-3 text-lg font-extrabold text-white">
          Admin<span className="text-brand-500">.</span>
        </div>
        <nav className="mt-4 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClasses}>
              <item.icon size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-4 space-y-1 border-t border-slate-800 pt-4">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
            <HiOutlineExternalLink size={18} /> View site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <HiOutlineLogout size={18} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top nav */}
        <div className="border-b border-slate-800 p-3 md:hidden">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-base font-bold text-white">Admin</span>
            <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-white">
              Sign out
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClasses}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <main className="flex-1 p-5 sm:p-8">
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-6 text-sm text-slate-500">
              Signed in as <span className="text-slate-300">{user?.email}</span>
            </p>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

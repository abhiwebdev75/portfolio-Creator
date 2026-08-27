import { Link } from 'react-router-dom';
import {
  HiOutlineCollection,
  HiOutlineChip,
  HiOutlineBriefcase,
  HiOutlineBadgeCheck,
  HiOutlineMail,
} from 'react-icons/hi';
import useFetch from '../../hooks/useFetch';

function StatCard({ to, label, value, icon: Icon, accent }) {
  return (
    <Link to={to} className="card flex items-center gap-4 p-5 transition hover:border-brand-500/60">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
        <Icon size={22} />
      </span>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { data: projects } = useFetch('/projects');
  const { data: skills } = useFetch('/skills');
  const { data: experience } = useFetch('/experience');
  const { data: certificates } = useFetch('/certificates');
  const { data: messages } = useFetch('/messages');

  const unread = (messages || []).filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Dashboard</h1>
      <p className="mb-6 text-sm text-slate-400">An overview of your portfolio content.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          to="/admin/projects"
          label="Projects"
          value={projects?.length ?? '—'}
          icon={HiOutlineCollection}
          accent="bg-brand-600/20 text-brand-300"
        />
        <StatCard
          to="/admin/skills"
          label="Skills"
          value={skills?.length ?? '—'}
          icon={HiOutlineChip}
          accent="bg-emerald-600/20 text-emerald-300"
        />
        <StatCard
          to="/admin/experience"
          label="Experience"
          value={experience?.length ?? '—'}
          icon={HiOutlineBriefcase}
          accent="bg-amber-600/20 text-amber-300"
        />
        <StatCard
          to="/admin/certificates"
          label="Certificates"
          value={certificates?.length ?? '—'}
          icon={HiOutlineBadgeCheck}
          accent="bg-sky-600/20 text-sky-300"
        />
        <StatCard
          to="/admin/messages"
          label={`Messages${unread ? ` · ${unread} unread` : ''}`}
          value={messages?.length ?? '—'}
          icon={HiOutlineMail}
          accent="bg-rose-600/20 text-rose-300"
        />
      </div>
    </div>
  );
}

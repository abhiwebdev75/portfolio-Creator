export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-slate-400">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-brand-400" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

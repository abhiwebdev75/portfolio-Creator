export default function SkillBar({ skill }) {
  const level = Math.max(0, Math.min(100, skill.level ?? 0));
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">{skill.name}</span>
        <span className="text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

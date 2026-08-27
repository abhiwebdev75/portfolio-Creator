import { FaBriefcase, FaGraduationCap } from 'react-icons/fa6';
import { dateRange } from '../lib/format';

export default function Timeline({ items = [], emptyLabel = 'Nothing added yet.' }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>;
  }

  return (
    <ol className="relative ml-3 border-l border-slate-800">
      {items.map((item) => {
        const Icon = item.type === 'education' ? FaGraduationCap : FaBriefcase;
        return (
          <li key={item._id} className="mb-6 ml-6 last:mb-0">
            <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-gradient-to-br from-brand-500/30 to-slate-900 text-brand-300 ring-4 ring-slate-950">
              <Icon size={11} />
            </span>
            <div className="card p-4 transition hover:border-brand-500/40">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h4 className="font-display text-lg font-semibold text-white">{item.role}</h4>
                <span className="font-mono text-xs text-slate-500">
                  {dateRange(item.startDate, item.endDate, item.current)}
                </span>
              </div>
              <p className="text-sm font-medium text-brand-400">
                {item.company}
                {item.location ? ` · ${item.location}` : ''}
              </p>
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

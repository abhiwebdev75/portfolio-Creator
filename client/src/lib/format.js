export function formatMonthYear(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function dateRange(start, end, current) {
  const s = formatMonthYear(start);
  const e = current ? 'Present' : formatMonthYear(end);
  if (s && e) return `${s} — ${e}`;
  return s || e || '';
}

/** Convert a Date/ISO string to a value usable by <input type="date"> */
export function toDateInput(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

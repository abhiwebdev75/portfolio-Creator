import CrudManager from '../../components/admin/CrudManager.jsx';
import { dateRange } from '../../lib/format';

const fields = [
  { name: 'role', label: 'Role / title', required: true },
  { name: 'company', label: 'Company / school', required: true },
  { name: 'location', label: 'Location' },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    default: 'work',
    options: [
      { value: 'work', label: 'Work' },
      { value: 'education', label: 'Education' },
    ],
  },
  { name: 'startDate', label: 'Start date', type: 'date' },
  { name: 'endDate', label: 'End date', type: 'date', hint: 'Leave empty if this is current' },
  { name: 'current', label: 'I currently work/study here', type: 'checkbox' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export default function ExperienceAdmin() {
  return (
    <CrudManager
      title="Experience"
      description="Your work history and education timeline."
      endpoint="/experience"
      fields={fields}
      renderItem={(e) => (
        <>
          <p className="truncate font-medium text-white">
            {e.role} <span className="text-slate-400">· {e.company}</span>
          </p>
          <p className="truncate text-sm text-slate-400">
            {e.type === 'education' ? 'Education' : 'Work'} · {dateRange(e.startDate, e.endDate, e.current)}
          </p>
        </>
      )}
    />
  );
}

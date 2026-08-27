import CrudManager from '../../components/admin/CrudManager.jsx';

const fields = [
  { name: 'name', label: 'Skill name', required: true },
  { name: 'category', label: 'Category', placeholder: 'Frontend, Backend, Tools…', default: 'Other' },
  { name: 'level', label: 'Proficiency (0–100)', type: 'number', default: 80, min: 0, max: 100 },
  { name: 'order', label: 'Sort order', type: 'number', default: 0 },
];

export default function SkillsAdmin() {
  return (
    <CrudManager
      title="Skills"
      description="Grouped by category on the public site."
      endpoint="/skills"
      fields={fields}
      renderItem={(s) => (
        <>
          <p className="truncate font-medium text-white">{s.name}</p>
          <p className="truncate text-sm text-slate-400">
            {s.category} · {s.level}%
          </p>
        </>
      )}
    />
  );
}

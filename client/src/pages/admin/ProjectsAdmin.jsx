import CrudManager from '../../components/admin/CrudManager.jsx';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Short description', type: 'textarea', rows: 2 },
  { name: 'longDescription', label: 'Long description', type: 'textarea' },
  { name: 'techStack', label: 'Tech stack', type: 'tags', hint: 'Comma-separated, e.g. React, Node.js, MongoDB' },
  { name: 'imageUrl', label: 'Screenshot', type: 'image' },
  { name: 'liveUrl', label: 'Live demo URL', placeholder: 'https://…' },
  { name: 'repoUrl', label: 'Repository URL', placeholder: 'https://github.com/…' },
  { name: 'featured', label: 'Featured (show first)', type: 'checkbox' },
  { name: 'order', label: 'Sort order', type: 'number', default: 0 },
];

export default function ProjectsAdmin() {
  return (
    <CrudManager
      title="Projects"
      description="Showcase the things you've built."
      endpoint="/projects"
      fields={fields}
      renderItem={(p) => (
        <>
          <p className="flex items-center gap-2 truncate font-medium text-white">
            {p.title}
            {p.featured && <span className="chip">Featured</span>}
          </p>
          <p className="truncate text-sm text-slate-400">{(p.techStack || []).join(', ')}</p>
        </>
      )}
    />
  );
}

import CrudManager from '../../components/admin/CrudManager.jsx';
import { formatMonthYear } from '../../lib/format';

const fields = [
  { name: 'title', label: 'Certificate title', required: true },
  { name: 'issuer', label: 'Issuer', placeholder: 'e.g. Coursera, AWS' },
  { name: 'issueDate', label: 'Issue date', type: 'date' },
  { name: 'credentialId', label: 'Credential ID' },
  { name: 'credentialUrl', label: 'Credential URL', placeholder: 'https://…' },
  { name: 'imageUrl', label: 'Certificate image', type: 'image' },
  { name: 'order', label: 'Sort order', type: 'number', default: 0 },
];

export default function CertificatesAdmin() {
  return (
    <CrudManager
      title="Certificates"
      description="Courses and certifications you've earned."
      endpoint="/certificates"
      fields={fields}
      renderItem={(c) => (
        <>
          <p className="truncate font-medium text-white">{c.title}</p>
          <p className="truncate text-sm text-slate-400">
            {[c.issuer, formatMonthYear(c.issueDate)].filter(Boolean).join(' · ')}
          </p>
        </>
      )}
    />
  );
}

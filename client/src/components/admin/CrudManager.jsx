import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import useCrud from '../../hooks/useCrud';
import { getErrorMessage } from '../../api/client';
import { toDateInput } from '../../lib/format';
import Loader from '../Loader.jsx';
import ImageUpload from './ImageUpload.jsx';

// Build initial form state from the field config (and an existing item when editing)
function buildInitial(fields, item) {
  const state = {};
  for (const f of fields) {
    let v = item ? item[f.name] : undefined;
    if (f.type === 'tags') v = Array.isArray(v) ? v.join(', ') : v || '';
    else if (f.type === 'date') v = toDateInput(v);
    else if (f.type === 'checkbox') v = Boolean(v);
    else if (f.type === 'number') v = v ?? f.default ?? 0;
    else v = v ?? f.default ?? '';
    state[f.name] = v;
  }
  return state;
}

function Field({ field, value, onChange }) {
  const common = { id: field.name, name: field.name, className: 'input' };

  if (field.type === 'image') {
    return <ImageUpload label={field.label} value={value} onChange={(url) => onChange(field.name, url)} />;
  }

  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-brand-600 focus:ring-brand-500"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div>
      <label className="label" htmlFor={field.name}>
        {field.label}
        {field.required && <span className="text-red-400"> *</span>}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          {...common}
          rows={field.rows || 4}
          required={field.required}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="input resize-none"
        />
      ) : field.type === 'select' ? (
        <select {...common} value={value} onChange={(e) => onChange(field.name, e.target.value)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
          required={field.required}
          value={value}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}
      {field.hint && <p className="mt-1 text-xs text-slate-500">{field.hint}</p>}
    </div>
  );
}

export default function CrudManager({ title, description, endpoint, fields, renderItem }) {
  const { items, loading, create, update, remove } = useCrud(endpoint);
  const [editing, setEditing] = useState(null); // null = closed; {} = new; item = edit
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setForm(buildInitial(fields, null));
    setEditing({});
  };
  const openEdit = (item) => {
    setForm(buildInitial(fields, item));
    setEditing(item);
  };
  const close = () => setEditing(null);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      for (const f of fields) {
        if (f.type === 'number') payload[f.name] = Number(payload[f.name]);
      }
      if (editing._id) await update(editing._id, payload);
      else await create(payload);
      toast.success('Saved');
      close();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Save failed'));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (item) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      await remove(item._id);
      toast.success('Deleted');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
        </div>
        <button onClick={openNew} className="btn-primary shrink-0">
          <HiPlus size={18} /> Add
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : items.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">Nothing here yet. Click “Add” to create one.</div>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item._id} className="card flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">{renderItem(item)}</div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => openEdit(item)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                  aria-label="Edit"
                >
                  <HiPencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-red-400"
                  aria-label="Delete"
                >
                  <HiTrash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal form */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center">
          <div className="card my-8 w-full max-w-lg p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editing._id ? 'Edit' : 'Add'} {title.replace(/s$/, '')}
              </h2>
              <button onClick={close} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
                <HiX size={20} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {fields.map((field) => (
                <Field key={field.name} field={field} value={form[field.name]} onChange={setField} />
              ))}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={close} className="btn-ghost">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

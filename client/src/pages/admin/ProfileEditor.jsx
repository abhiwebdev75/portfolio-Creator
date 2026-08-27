import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { getErrorMessage } from '../../api/client';
import Loader from '../../components/Loader.jsx';
import ImageUpload from '../../components/admin/ImageUpload.jsx';

const EMPTY = {
  name: '',
  headline: '',
  bio: '',
  location: '',
  email: '',
  avatarUrl: '',
  resumeUrl: '',
  socials: { github: '', linkedin: '', twitter: '', website: '' },
};

const normalize = (data) => ({
  ...EMPTY,
  ...data,
  socials: { ...EMPTY.socials, ...(data?.socials || {}) },
});

export default function ProfileEditor() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get('/profile')
      .then((res) => setForm(normalize(res.data)))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const setSocial = (name, value) =>
    setForm((f) => ({ ...f, socials: { ...f.socials, [name]: value } }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/profile', form);
      setForm(normalize(res.data));
      toast.success('Profile saved');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Save failed'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Profile</h1>
      <p className="mb-6 text-sm text-slate-400">
        Powers the hero and about sections, the footer, and contact details.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="card space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input id="name" className="input" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="headline">Headline</label>
              <input id="headline" className="input" value={form.headline} onChange={(e) => set('headline', e.target.value)} placeholder="Full-Stack Developer" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="bio">Bio</label>
            <textarea id="bio" rows={5} className="input resize-none" value={form.bio} onChange={(e) => set('bio', e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="location">Location</label>
              <input id="location" className="input" value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="City, Country" />
            </div>
            <div>
              <label className="label" htmlFor="email">Public email</label>
              <input id="email" type="email" className="input" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </div>
          </div>
          <ImageUpload label="Avatar / photo" value={form.avatarUrl} onChange={(url) => set('avatarUrl', url)} />
          <div>
            <label className="label" htmlFor="resumeUrl">Résumé URL</label>
            <input id="resumeUrl" className="input" value={form.resumeUrl} onChange={(e) => set('resumeUrl', e.target.value)} placeholder="Link to a hosted PDF (optional)" />
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="font-semibold text-white">Social links</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {['github', 'linkedin', 'twitter', 'website'].map((key) => (
              <div key={key}>
                <label className="label capitalize" htmlFor={key}>{key}</label>
                <input
                  id={key}
                  className="input"
                  value={form.socials[key]}
                  onChange={(e) => setSocial(key, e.target.value)}
                  placeholder="https://…"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

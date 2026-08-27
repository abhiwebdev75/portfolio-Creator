import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import SectionHeading from '../../components/SectionHeading.jsx';
import Reveal from '../../components/Reveal.jsx';
import SocialLinks from '../../components/SocialLinks.jsx';
import api, { getErrorMessage } from '../../api/client';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post('/messages', form);
      toast.success(data.message || 'Message sent!');
      setForm(EMPTY);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Could not send message'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Say hello"
          title="Get in Touch"
          subtitle="Have a project in mind or just want to connect? Send me a message."
        />

        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          {/* Contact info */}
          <Reveal className="space-y-6">
            <p className="text-slate-400">
              I'm always open to discussing new projects, opportunities, or collaborations.
            </p>
            <div className="space-y-3 text-sm">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-brand-400">
                    <HiOutlineMail size={18} />
                  </span>
                  {profile.email}
                </a>
              )}
              {profile?.location && (
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-brand-400">
                    <HiOutlineLocationMarker size={18} />
                  </span>
                  {profile.location}
                </div>
              )}
            </div>
            <SocialLinks socials={profile?.socials} email={profile?.email} />
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="card space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    className="input"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="input"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="input"
                  placeholder="Let's work together"
                />
              </div>
              <div>
                <label className="label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={5}
                  className="input resize-none"
                  placeholder="Tell me about your project…"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

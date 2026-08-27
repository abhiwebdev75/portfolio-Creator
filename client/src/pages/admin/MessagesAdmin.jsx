import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiTrash, HiOutlineMail, HiOutlineMailOpen } from 'react-icons/hi';
import api, { getErrorMessage } from '../../api/client';
import Loader from '../../components/Loader.jsx';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    api
      .get('/messages')
      .then((res) => setMessages(res.data))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const setRead = async (id, read) => {
    try {
      const res = await api.patch(`/messages/${id}`, { read });
      setMessages((prev) => prev.map((m) => (m._id === id ? res.data : m)));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success('Deleted');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const toggle = (m) => {
    const next = openId === m._id ? null : m._id;
    setOpenId(next);
    if (next && !m.read) setRead(m._id, true); // auto-mark read on open
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Messages</h1>
      <p className="mb-6 text-sm text-slate-400">Contact-form submissions from your site.</p>

      {messages.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">No messages yet.</div>
      ) : (
        <ul className="space-y-2">
          {messages.map((m) => (
            <li key={m._id} className={`card overflow-hidden ${!m.read ? 'border-brand-500/40' : ''}`}>
              <button
                onClick={() => toggle(m)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-400" />}
                <div className="min-w-0 flex-1">
                  <p className={`truncate ${!m.read ? 'font-semibold text-white' : 'text-slate-200'}`}>
                    {m.subject || '(no subject)'}
                  </p>
                  <p className="truncate text-sm text-slate-400">
                    {m.name} · {m.email}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-slate-500">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </button>

              {openId === m._id && (
                <div className="border-t border-slate-800 p-4">
                  <p className="whitespace-pre-line text-sm text-slate-300">{m.message}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || '')}`} className="btn-outline">
                      Reply
                    </a>
                    <button onClick={() => setRead(m._id, !m.read)} className="btn-ghost">
                      {m.read ? <HiOutlineMail size={18} /> : <HiOutlineMailOpen size={18} />}
                      {m.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <button
                      onClick={() => remove(m._id)}
                      className="btn-ghost ml-auto text-red-400 hover:text-red-300"
                    >
                      <HiTrash size={18} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

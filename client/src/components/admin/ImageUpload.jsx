import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import api, { getErrorMessage, mediaUrl } from '../../api/client';

/** Uploads an image to the server and reports back its URL via onChange. */
export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    setUploading(true);
    try {
      const res = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Upload failed'));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <span className="label">{label}</span>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-600">
          {value ? <img src={mediaUrl(value)} alt="" className="h-full w-full object-cover" /> : 'None'}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="text-sm text-slate-400 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-slate-200 hover:file:bg-slate-600"
          />
          {uploading && <span className="text-xs text-slate-400">Uploading…</span>}
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-left text-xs text-red-400 hover:text-red-300"
            >
              Remove image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

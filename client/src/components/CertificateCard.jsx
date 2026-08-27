import { FiExternalLink } from 'react-icons/fi';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { mediaUrl } from '../api/client';
import { formatMonthYear } from '../lib/format';

export default function CertificateCard({ certificate }) {
  const { title, issuer, issueDate, credentialUrl, imageUrl } = certificate;

  return (
    <article className="card group overflow-hidden transition hover:border-brand-500/60">
      {imageUrl ? (
        <a href={credentialUrl || mediaUrl(imageUrl)} target="_blank" rel="noreferrer">
          <div className="aspect-[4/3] overflow-hidden bg-slate-800">
            <img
              src={mediaUrl(imageUrl)}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        </a>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-700/30 to-slate-800">
          <HiOutlineBadgeCheck className="text-5xl text-brand-400/70" />
        </div>
      )}

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
        {issuer && <p className="mt-1 text-sm text-slate-400">{issuer}</p>}
        <div className="mt-3 flex items-center justify-between">
          {issueDate && (
            <span className="text-xs text-slate-500">{formatMonthYear(issueDate)}</span>
          )}
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300"
            >
              <FiExternalLink /> Verify
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { mediaUrl } from '../api/client';

export default function ProjectCard({ project }) {
  const { title, description, techStack = [], imageUrl, liveUrl, repoUrl } = project;

  return (
    <article className="card group flex flex-col overflow-hidden transition hover:border-brand-500/60">
      <div className="aspect-video overflow-hidden bg-slate-800">
        {imageUrl ? (
          <img
            src={mediaUrl(imageUrl)}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-700/40 to-slate-800 text-2xl font-bold text-slate-500">
            {title?.[0] || '?'}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-white">{title}</h3>
        {description && <p className="mt-2 flex-1 text-sm text-slate-400">{description}</p>}

        {techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}

        {(liveUrl || repoUrl) && (
          <div className="mt-5 flex items-center gap-4 border-t border-slate-800 pt-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300"
              >
                <FiExternalLink /> Live demo
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white"
              >
                <FiGithub /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

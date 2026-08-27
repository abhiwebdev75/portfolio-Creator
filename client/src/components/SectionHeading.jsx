export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const isLeft = align === 'left';
  return (
    <div className={`mb-14 max-w-2xl ${isLeft ? 'text-left' : 'mx-auto text-center'}`}>
      {eyebrow && (
        <p
          className={`mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-400 ${
            isLeft ? '' : 'justify-center'
          }`}
        >
          <span className="h-px w-6 bg-brand-500" /> {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-slate-400">{subtitle}</p>}
    </div>
  );
}

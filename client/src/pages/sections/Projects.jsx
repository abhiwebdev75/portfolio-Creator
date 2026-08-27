import SectionHeading from '../../components/SectionHeading.jsx';
import Reveal from '../../components/Reveal.jsx';
import ProjectCard from '../../components/ProjectCard.jsx';

export default function Projects({ projects = [] }) {
  return (
    <section id="projects" className="bg-slate-900/30 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="My work"
          title="Projects"
          subtitle="A selection of things I've built."
        />

        {projects.length === 0 ? (
          <p className="text-center text-slate-500">No projects added yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project._id} delay={(i % 3) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

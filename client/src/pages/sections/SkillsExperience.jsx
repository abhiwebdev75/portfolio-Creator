import SectionHeading from '../../components/SectionHeading.jsx';
import Reveal from '../../components/Reveal.jsx';
import SkillBar from '../../components/SkillBar.jsx';
import Timeline from '../../components/Timeline.jsx';

/** A labeled sub-section with a mono eyebrow marker. */
function Block({ label, children }) {
  return (
    <div>
      <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-400">
        <span className="h-px w-6 bg-brand-500" /> {label}
      </h3>
      {children}
    </div>
  );
}

export default function SkillsExperience({ skills = [], experience = [] }) {
  // Group skills by their category, preserving first-seen order
  const groups = {};
  for (const skill of skills) {
    const key = skill.category || 'Other';
    (groups[key] ||= []).push(skill);
  }
  const categories = Object.keys(groups);

  // Split the timeline into work vs. education tracks
  const work = experience.filter((e) => e.type !== 'education');
  const education = experience.filter((e) => e.type === 'education');

  return (
    <section id="skills" className="py-24">
      <div className="container">
        <SectionHeading
          eyebrow="What I work with"
          title="Skills, Experience & Education"
          subtitle="The tools I reach for and the path that got me here."
        />

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* Skills */}
          <div className="lg:col-span-5">
            <Reveal>
              <Block label="Skills">
                {categories.length === 0 ? (
                  <p className="text-sm text-slate-500">No skills added yet.</p>
                ) : (
                  <div className="space-y-8">
                    {categories.map((cat) => (
                      <div key={cat}>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                          {cat}
                        </h4>
                        <div className="space-y-4">
                          {groups[cat].map((skill) => (
                            <SkillBar key={skill._id} skill={skill} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Block>
            </Reveal>
          </div>

          {/* Experience + Education, as two distinct tracks */}
          <div className="space-y-14 lg:col-span-7">
            <Reveal delay={0.1}>
              <Block label="Experience">
                <Timeline items={work} emptyLabel="No work experience added yet." />
              </Block>
            </Reveal>
            <Reveal delay={0.15}>
              <Block label="Education">
                <Timeline items={education} emptyLabel="No education added yet." />
              </Block>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

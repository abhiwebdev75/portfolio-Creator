// TEMPORARY design-preview page with mock data (no backend needed).
// Delete this file and its route in App.jsx once the design is verified.
import Navbar from '../components/Navbar.jsx';
import Backdrop from '../components/Backdrop.jsx';
import Footer from '../components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import SkillsExperience from './sections/SkillsExperience.jsx';
import Certificates from './sections/Certificates.jsx';
import Contact from './sections/Contact.jsx';

const profile = {
  name: 'Alex Rivera',
  headline: 'Full-Stack Developer & UI Engineer',
  bio: 'I design and build fast, accessible web apps end to end — from the data model to the last pixel. Currently focused on design systems and real-time interfaces.',
  location: 'Bengaluru, India',
  email: 'hello@alexrivera.dev',
  socials: { github: '#', linkedin: '#', twitter: '#', website: '#' },
  avatarUrl: null,
};

const projects = [
  {
    _id: '1',
    title: 'Nimbus Dashboard',
    description: 'Real-time analytics dashboard with streaming charts and role-based access.',
    techStack: ['React', 'Node', 'WebSocket', 'D3'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    _id: '2',
    title: 'Ledger API',
    description: 'A double-entry accounting API handling 2M+ transactions with idempotent writes.',
    techStack: ['Express', 'MongoDB', 'Redis'],
    repoUrl: '#',
  },
  {
    _id: '3',
    title: 'Palette',
    description: 'A color-system generator that outputs accessible, WCAG-checked design tokens.',
    techStack: ['TypeScript', 'Vite', 'Tailwind'],
    liveUrl: '#',
  },
];

const skills = [
  { _id: 's1', name: 'React', category: 'Frontend', level: 92 },
  { _id: 's2', name: 'TypeScript', category: 'Frontend', level: 85 },
  { _id: 's3', name: 'Tailwind CSS', category: 'Frontend', level: 88 },
  { _id: 's4', name: 'Node.js', category: 'Backend', level: 87 },
  { _id: 's5', name: 'MongoDB', category: 'Backend', level: 80 },
  { _id: 's6', name: 'PostgreSQL', category: 'Backend', level: 74 },
];

const experience = [
  {
    _id: 'e1',
    type: 'work',
    role: 'Senior Frontend Engineer',
    company: 'Nimbus Labs',
    location: 'Remote',
    startDate: '2023-01-01',
    current: true,
    description: 'Lead the design-system and dashboard teams; cut time-to-interactive by 40%.',
  },
  {
    _id: 'e2',
    type: 'work',
    role: 'Full-Stack Developer',
    company: 'Bytecraft',
    location: 'Bengaluru',
    startDate: '2021-06-01',
    endDate: '2022-12-01',
    description: 'Built MERN apps and internal tooling for a 30-person product team.',
  },
  {
    _id: 'ed1',
    type: 'education',
    role: 'B.Tech, Computer Science',
    company: 'VIT University',
    location: 'Vellore',
    startDate: '2017-08-01',
    endDate: '2021-05-01',
    description: 'Graduated with distinction; focus on distributed systems.',
  },
  {
    _id: 'ed2',
    type: 'education',
    role: 'Full-Stack Web Nanodegree',
    company: 'Udacity',
    startDate: '2020-01-01',
    endDate: '2020-06-01',
  },
];

const certificates = [
  { _id: 'c1', title: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', issueDate: '2023-04-01', credentialUrl: '#' },
  { _id: 'c2', title: 'Meta Front-End Professional', issuer: 'Meta', issueDate: '2022-09-01', credentialUrl: '#' },
  { _id: 'c3', title: 'MongoDB Associate Developer', issuer: 'MongoDB', issueDate: '2023-01-01', credentialUrl: '#' },
  { _id: 'c4', title: 'Google UX Design', issuer: 'Google', issueDate: '2021-11-01' },
];

export default function Preview() {
  return (
    <div id="top">
      <Backdrop />
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <SkillsExperience skills={skills} experience={experience} />
        <Certificates certificates={certificates} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

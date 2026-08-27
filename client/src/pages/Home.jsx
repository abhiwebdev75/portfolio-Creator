import useFetch from '../hooks/useFetch';
import Navbar from '../components/Navbar.jsx';
import Backdrop from '../components/Backdrop.jsx';
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import SkillsExperience from './sections/SkillsExperience.jsx';
import Certificates from './sections/Certificates.jsx';
import Contact from './sections/Contact.jsx';

export default function Home() {
  const { data: profile, loading } = useFetch('/profile');
  const { data: projects } = useFetch('/projects');
  const { data: skills } = useFetch('/skills');
  const { data: experience } = useFetch('/experience');
  const { data: certificates } = useFetch('/certificates');

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader label="Loading portfolio…" />
      </div>
    );
  }

  return (
    <div id="top">
      <Backdrop />
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects || []} />
        <SkillsExperience skills={skills || []} experience={experience || []} />
        <Certificates certificates={certificates || []} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

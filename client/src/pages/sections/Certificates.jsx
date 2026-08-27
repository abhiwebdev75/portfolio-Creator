import SectionHeading from '../../components/SectionHeading.jsx';
import Reveal from '../../components/Reveal.jsx';
import CertificateCard from '../../components/CertificateCard.jsx';

export default function Certificates({ certificates = [] }) {
  return (
    <section id="certificates" className="bg-slate-900/30 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Credentials"
          title="Certificates"
          subtitle="Courses and certifications I've earned."
        />

        {certificates.length === 0 ? (
          <p className="text-center text-slate-500">No certificates added yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((certificate, i) => (
              <Reveal key={certificate._id} delay={(i % 4) * 0.07}>
                <CertificateCard certificate={certificate} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

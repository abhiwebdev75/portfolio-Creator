import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';
import Certificate from './models/Certificate.js';

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env');
  }

  let user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (user) {
    user.password = password; // re-hashed by the pre-save hook
    user.name = user.name || 'Admin';
    await user.save();
    console.log(`Updated admin password for ${email}`);
  } else {
    user = await User.create({ name: 'Admin', email, password });
    console.log(`Created admin user ${email}`);
  }
}

async function seedProfile() {
  const existing = await Profile.findOne();
  if (existing) {
    console.log('Profile already exists — left unchanged');
    return;
  }
  await Profile.create({
    name: 'Your Name',
    headline: 'Full-Stack Developer',
    bio: 'I build web applications with the MERN stack. Replace this text from the admin dashboard.',
    location: 'City, Country',
    email: process.env.ADMIN_EMAIL || 'you@example.com',
    socials: {
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
    },
  });
  console.log('Created default profile');
}

async function seedCollection(Model, label, docs) {
  const count = await Model.estimatedDocumentCount();
  if (count > 0) {
    console.log(`${label}: ${count} existing document(s) — skipped`);
    return;
  }
  await Model.insertMany(docs);
  console.log(`${label}: inserted ${docs.length} sample document(s)`);
}

async function run() {
  await connectDB();

  await seedAdmin();
  await seedProfile();

  await seedCollection(Project, 'Projects', [
    {
      title: 'Sample Project',
      description: 'A short summary of what this project does.',
      longDescription: 'A longer description shown in the project detail view.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com/yourusername/sample',
      featured: true,
      order: 0,
    },
  ]);

  await seedCollection(Skill, 'Skills', [
    { name: 'React', category: 'Frontend', level: 90, order: 0 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 85, order: 1 },
    { name: 'Node.js', category: 'Backend', level: 85, order: 0 },
    { name: 'Express', category: 'Backend', level: 85, order: 1 },
    { name: 'MongoDB', category: 'Backend', level: 80, order: 2 },
    { name: 'Git', category: 'Tools', level: 85, order: 0 },
  ]);

  await seedCollection(Experience, 'Experience', [
    {
      role: 'Software Developer',
      company: 'Company Name',
      location: 'City, Country',
      type: 'work',
      startDate: new Date('2023-01-01'),
      current: true,
      description: 'Describe your responsibilities and achievements here.',
    },
    {
      role: 'BSc Computer Science',
      company: 'University Name',
      location: 'City, Country',
      type: 'education',
      startDate: new Date('2019-09-01'),
      endDate: new Date('2023-06-01'),
      description: 'Relevant coursework and activities.',
    },
  ]);

  await seedCollection(Certificate, 'Certificates', [
    {
      title: 'Sample Certification',
      issuer: 'Issuing Organization',
      issueDate: new Date('2024-01-01'),
      credentialUrl: 'https://example.com/credential',
      order: 0,
    },
  ]);

  console.log('\nSeed complete.');
}

run()
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });

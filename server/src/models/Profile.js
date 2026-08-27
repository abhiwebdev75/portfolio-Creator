import mongoose from 'mongoose';

/**
 * Singleton document describing the portfolio owner (powers Hero + About).
 * We only ever keep one Profile; the controller upserts it.
 */
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Your Name' },
    headline: { type: String, default: 'Full-Stack Developer' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      website: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    longDescription: { type: String, default: '' },
    techStack: { type: [String], default: [] },
    imageUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Featured first, then by explicit order, then newest
projectSchema.index({ featured: -1, order: 1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;

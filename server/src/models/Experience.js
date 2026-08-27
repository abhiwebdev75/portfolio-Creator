import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    // 'work' or 'education' — lets the timeline show both kinds
    type: { type: String, enum: ['work', 'education'], default: 'work' },
    startDate: { type: Date },
    endDate: { type: Date }, // null/empty when `current` is true
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Newest first by start date
experienceSchema.index({ startDate: -1 });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;

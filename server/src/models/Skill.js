import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // Free-form grouping shown as a heading, e.g. "Frontend", "Backend", "Tools"
    category: { type: String, default: 'Other', trim: true },
    // Proficiency 0–100 (rendered as a bar)
    level: { type: Number, default: 80, min: 0, max: 100 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;

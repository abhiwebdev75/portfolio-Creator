import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, default: '' },
    issueDate: { type: Date },
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

certificateSchema.index({ order: 1, issueDate: -1 });

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { notFound, errorHandler } from './middleware/error.js';

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import experienceRoutes from './routes/experience.js';
import certificateRoutes from './routes/certificates.js';
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';
import heroRoutes from './routes/heroRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Security & parsing
app.use(
  helmet({
    // Allow uploaded images to be embedded from a different origin (e.g. the client dev server)
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Static: uploaded files (served at /uploads/<filename>)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/api/hero', heroRoutes);
// Error handling (must be last)
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API is running',
  });
});
app.use(notFound);
app.use(errorHandler);

export default app;

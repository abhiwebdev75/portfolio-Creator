import Project from '../models/Project.js';
import asyncHandler from '../utils/asyncHandler.js';

// Accept techStack as an array or a comma-separated string
function normalize(body) {
  const data = { ...body };
  if (typeof data.techStack === 'string') {
    data.techStack = data.techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return data;
}

// GET /api/projects  (public)
export const listProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
  res.json(projects);
});

// POST /api/projects  (protected)
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(normalize(req.body));
  res.status(201).json(project);
});

// PUT /api/projects/:id  (protected)
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, normalize(req.body), {
    new: true,
    runValidators: true,
  });
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json(project);
});

// DELETE /api/projects/:id  (protected)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ message: 'Deleted' });
});

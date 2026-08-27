import multer from 'multer';

/** 404 for unmatched routes */
export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not found: ${req.method} ${req.originalUrl}`));
}

/** Central error handler — normalizes common error types into JSON */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Server error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Duplicate key
  if (err.code === 11000) {
    status = 409;
    message = `Duplicate value for ${Object.keys(err.keyValue).join(', ')}`;
  }

  // Multer upload errors (e.g. file too large)
  if (err instanceof multer.MulterError) {
    status = 400;
    message = err.code === 'LIMIT_FILE_SIZE' ? 'Image is too large (max 5 MB)' : err.message;
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
  });
}

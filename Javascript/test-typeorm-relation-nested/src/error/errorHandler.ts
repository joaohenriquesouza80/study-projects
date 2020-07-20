import { Request, Response, NextFunction } from 'express';

import AppError from './AppError';

export default (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: 'Internal server error' });
};

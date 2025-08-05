import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Acesso negado. Faça login primeiro.' });
  }
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  // This middleware just adds auth info to the request but doesn't block
  req.isAuthenticated = req.session?.isAuthenticated || false;
  req.user = req.session?.isAuthenticated ? {
    id: req.session.userId,
    username: req.session.username
  } : null;
  next();
}

// Extend Request interface
declare global {
  namespace Express {
    interface Request {
      isAuthenticated?: boolean;
      user?: {
        id?: string;
        username?: string;
      } | null;
    }
  }
}
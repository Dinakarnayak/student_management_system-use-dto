import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Declare the user type for TypeScript
interface User {
  user_id: string; // Assuming you have a user_id field in the JWT payload
  username: string; // Assuming you have a username field in the JWT payload
}

// Extend the Express Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: User;  // Add user property to the request
    }
  }
}

// The authenticate middleware to validate JWT tokens
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header (format: "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // No token provided, return an unauthorized response
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return; // Stop further execution of the middleware
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as User;

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Invalid token, return an error response
    res.status(400).json({ message: 'Invalid token' });
    return; // Stop further execution of the middleware
  }
};

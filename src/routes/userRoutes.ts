import express, { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Register a new user
router.post('/register', UserController.register);

// Login a user and receive a JWT
router.post('/login', UserController.login);

// Access the user's profile (protected route)
router.get('/profile', authenticate, (req: Request, res: Response): void => {
  // Send the profile data in the response
  res.status(200).json({ message: 'Profile data', user: req.user });
});

export { router as userRoutes };

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserDto } from '../dtos/createUserDto';
import { LoginDto } from '../dtos/loginDto';

export class UserController {
  static async register(req: Request, res: Response) {
    const userDto: CreateUserDto = req.body;
    try {
      const result = await UserService.createUser(userDto);
      res.status(201).json(result);
    } catch (error: unknown) {  // Type the error as unknown
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred.' });
      }
    }
  }

  static async login(req: Request, res: Response) {
    const loginDto: LoginDto = req.body;
    try {
      const result = await UserService.loginUser(loginDto);
      res.status(200).json(result);
    } catch (error: unknown) {  // Type the error as unknown
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred.' });
      }
    }
  }
}

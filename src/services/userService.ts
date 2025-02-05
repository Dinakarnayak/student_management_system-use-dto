import bcrypt from 'bcryptjs';
import { UserModel } from '../models/userModel';
import { CreateUserDto } from '../dtos/createUserDto';
import { LoginDto } from '../dtos/loginDto';
import { generateToken } from '../utils/authUtils';

export class UserService {
  // Method to create a new user
  static async createUser(userDto: CreateUserDto) {
    const { name, email, password } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };

    // Call to UserModel to save the new user in the database
    await UserModel.createUser(newUser);
    
    return { message: 'User created successfully' };
  }

  // Method to login a user
  static async loginUser(userDto: LoginDto) {
    const { email, password } = userDto;
    const user = await UserModel.getUserByEmail(email);

    // If the user doesn't exist, throw an error
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Ensure user.id exists and convert to string before generating the token
    if (!user.id) {
      throw new Error('User ID is missing');
    }

    // Convert user.id to a string if it is a number
    const userIdAsString = user.id.toString();

    // Generate JWT token with user ID as a string
    const token = generateToken(userIdAsString);

    return { message: 'Login successful', token };
  }
}

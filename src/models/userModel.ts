import { promisePool } from '../config/database';
import { User } from '../interfaces/userInterface';
import { RowDataPacket } from 'mysql2';  // Importing RowDataPacket type

export class UserModel {
  // Correct typing for the return type
  static async createUser(userData: User): Promise<any> {
    const { name, email, password } = userData;
    
    // Using parameterized queries with MySQL
    const [rows] = await promisePool.query<RowDataPacket[]>(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, password]
    );
    
    // The rows object is of type RowDataPacket[], and you can return it
    return rows;
  }

  // Correct typing for the return type
  static async getUserByEmail(email: string): Promise<User | null> {
    // Fetching data and typing the query result
    const [rows] = await promisePool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    
    // If rows are empty, return null, otherwise return the first row
    return rows.length > 0 ? (rows[0] as User) : null;
  }
}

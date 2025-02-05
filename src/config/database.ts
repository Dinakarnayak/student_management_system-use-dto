import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

export const pool = mysql.createPool({
  host: process.env.DB_HOST,          // 'localhost'
  user: process.env.DB_USER,          // 'root'
  password: process.env.DB_PASSWORD,  // 'Root@123'
  database: process.env.DB_NAME,      // 'student_management_system'
});

export const promisePool = pool.promise();  // Promise-based query pool for async queries

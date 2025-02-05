import express from 'express';
import { userRoutes } from './routes/userRoutes';  // Import userRoutes

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route for the root URL (/)
app.get('/', (req, res) => {
  res.send('Hello, welcome to the Student Management System API!');
});

// Use your user routes for any `/api/users` endpoints
app.use('/api/users', userRoutes);

// Handle other routes (e.g., 404 for undefined routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server and log the message
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}`);
});

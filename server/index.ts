// src/index.ts
import express, { Request, Response } from 'express';
import api from './api';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;


app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL or use '*' for all origins
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));


// Middleware
app.use(express.json());

// API Routes
app.use('/api', api);

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express, { Request, Response } from 'express';
import api from './api';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;


app.use(cors({
  origin: 'http://localhost:5173',  
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));


app.use(express.json());

app.use('/api', api);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

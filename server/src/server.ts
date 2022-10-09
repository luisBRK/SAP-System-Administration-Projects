import http from 'http';
import { connectDB } from './config';
import app from './app';

// enviroment viarbles
import dotenv from 'dotenv';
dotenv.config();

// port
const PORT = process.env.PORT || 8000;

// server https
const server = http.createServer(app);

// start server
async function startServer() {
  // database connection
  await connectDB();

  // listening
  server.listen(PORT, () => {
    console.log(`Listening in PORT: ${PORT}`);
  });
}

startServer();

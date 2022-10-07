import https from 'https';
import app from './app';

// enviroment viarbles
import dotenv from 'dotenv';
dotenv.config();

// port
const PORT = process.env.PORT || 8000;

// server https
const server = https.createServer(app);

// listening
server.listen(PORT, () => {
  console.log(`Set connection in PORT: ${PORT}`);
});

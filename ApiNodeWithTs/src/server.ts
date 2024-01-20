import express from 'express';
import dotenv from 'dotenv';
import router from './routes/userRouters';
const SERVER_PORT: number=3030
import connectDB from './database/config';


dotenv.config();

/* Initialisation de mon serveur */
const app = express();



// API routes
app.get('/', async (req, res) => {
  res.send('supper!!!!')
}); 

// Connect database
connectDB();

// Route prefix
app.use('/Api/v1/', router);


// Start server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://localhost:${SERVER_PORT}`);
});

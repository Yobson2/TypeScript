import express from 'express';



const app = express();
const port = 3000;



// API routes
app.get('/', async (req, res) => {
  res.send('supper!!!!')
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

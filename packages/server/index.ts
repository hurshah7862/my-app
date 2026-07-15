import express from 'express';
import dotenv from 'dotenv';
import router from './route';
try {
   dotenv.config();
   const app = express();
   app.use(express.json());
   app.use(router);
   const port = process.env.PORT || 3001;
   app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
   });
} catch (error) {
   console.error('Error starting server:', error);
}

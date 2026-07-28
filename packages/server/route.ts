import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import express from 'express';
import { PrismaClient } from './generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

const adapter = new PrismaMssql({
   server: process.env.server,
   database: process.env.database,
   user: process.env.user,
   password: process.env.password,
   options: {
      trustServerCertificate: process.env.trustServerCertificate === 'true',
      encrypt: process.env.encrypt === 'true',
   },
});
const prismaClient = new PrismaClient({ adapter });

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World from the server package!');
});
router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World from the server package!' });
});
router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', async (req: Request, res: Response) => {
   try {
      const productId = Number(req.params.id);
      const reviews = await prismaClient.review.findMany({
         where: {
            productId: productId,
         },
         orderBy: {
            createdAt: 'desc',
         },
      });
      res.json(reviews);
   } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({
         error: 'Failed to fetch reviews',
         details: String(error),
      });
   }
});

export default router;

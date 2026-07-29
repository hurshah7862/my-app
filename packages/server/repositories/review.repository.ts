import { PrismaClient } from '../generated/prisma/client';
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

export const reviewRepository = {
   getReviewsByProductId: async (productId: number, take?: number) => {
      return prismaClient.review.findMany({
         where: {
            productId: productId,
         },
         orderBy: {
            createdAt: 'desc',
         },
         take: take,
      });
   },
};

import { chatService } from '../services/chat.service';
import type { Request, Response } from 'express';
import { z } from 'zod';

const chatRequestSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt cannot be longer than 1000 characters'),
   conversationId: z.string().uuid(),
   model: z.string().optional(),
});
export const chatController = {
   sendMessage: async (req: Request, res: Response) => {
      try {
         const parsedData = chatRequestSchema.safeParse(req.body);
         if (!parsedData.success) {
            return res.status(400).json(
               parsedData.error.format()
               // { error: parsedData.error.issues.map(issue => issue.message).join(', ') }
            );
         }
         const { prompt, conversationId, model } = parsedData.data;
         const response = await chatService.getChatResponse(
            prompt,
            conversationId,
            model || 'GoogleAI'
         );
         res.json({ message: response });
      } catch (error: any) {
         res.status(500).json({
            error: `Error processing request: ${error?.message ?? 'Unknown error'}`,
         });
      }
   },
};

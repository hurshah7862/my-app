import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY || '',
});

export const openAIchatService = {
   async getChatResponseFromOpenAI(
      instructions: string,
      prompt: string,
      conversationId: string
   ): Promise<string> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions: instructions,
         input: prompt,
         temperature: 0.2,
         previous_response_id:
            conversationRepository.getLastResponseIdForOpenAI(conversationId) ||
            undefined,
      });
      conversationRepository.setLastResponseIdForOpenAI(
         conversationId,
         response.id
      );
      return response.output_text;
   },
};

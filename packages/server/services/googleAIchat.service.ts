import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai';
import { conversationRepository } from '../repositories/conversation.repository';

const genAI = new GoogleGenerativeAI(
   process.env.GENAI_API_KEY?.toString() || ''
);

export const googleAIchatService = {
   async getChatResponseFromGoogleAI(
      prompt: string,
      conversationId: string
   ): Promise<string> {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      let chat = conversationRepository.getLastResponseIdForGenAI(
         conversationId
      ) as ChatSession;
      console.log('Conversation ID requested:', conversationId);
      console.log('Existing chat session:', chat);
      if (!chat) {
         conversationRepository.setLastResponseIdForGenAI(
            conversationId,
            model
         );
         chat = conversationRepository.getLastResponseIdForGenAI(
            conversationId
         ) as ChatSession;
      }
      const result = await chat.sendMessage(prompt); // 👈 prompt
      return result.response.text();
   },
};

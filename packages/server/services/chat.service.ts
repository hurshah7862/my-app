import { googleAIchatService } from './googleAIchat.service';
import { openAIchatService } from './openAIchat.service';

export const chatService = {
   async getChatResponse(
      prompt: string,
      conversationId: string,
      model: string
   ): Promise<string> {
      if (model === 'GoogleAI') {
         return await googleAIchatService.getChatResponseFromGoogleAI(
            prompt,
            conversationId
         );
      } else if (model === 'OpenAI') {
         return await openAIchatService.getChatResponseFromOpenAI(
            prompt,
            conversationId
         );
      } else {
         throw new Error(`Unsupported model: ${model}`);
      }
   },
};

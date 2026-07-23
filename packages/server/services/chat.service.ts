import fs from 'fs';
import path from 'path';
import { googleAIchatService } from './googleAIchat.service';
import { openAIchatService } from './openAIchat.service';

const template = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'chatbot.prompt.txt'),
   'utf-8'
);
const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);
export const chatService = {
   async getChatResponse(
      prompt: string,
      conversationId: string,
      model: string
   ): Promise<string> {
      if (model === 'GoogleAI') {
         return await googleAIchatService.getChatResponseFromGoogleAI(
            instructions,
            prompt,
            conversationId
         );
      } else if (model === 'OpenAI') {
         return await openAIchatService.getChatResponseFromOpenAI(
            instructions,
            prompt,
            conversationId
         );
      } else {
         throw new Error(`Unsupported model: ${model}`);
      }
   },
};

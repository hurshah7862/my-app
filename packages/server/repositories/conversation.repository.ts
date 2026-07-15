import {
   ChatSession,
   GenerativeModel,
   type StartChatParams,
} from '@google/generative-ai';

//Definition of the genAIConversations map moved to the top level of the file to ensure it is accessible throughout the module.
const genAIConversations = new Map<string, ChatSession>();
const openAIConversations = new Map<string, string>();
//export public interface

export const conversationRepository = {
   getLastResponseIdForGenAI,
   getLastResponseIdForOpenAI,
   setLastResponseIdForGenAI,
   setLastResponseIdForOpenAI,
};

function getLastResponseIdForGenAI(conversationId: string) {
   return genAIConversations.get(conversationId);
}
function getLastResponseIdForOpenAI(conversationId: string) {
   return openAIConversations.get(conversationId);
}

function setLastResponseIdForGenAI(
   conversationId: string,
   model?: GenerativeModel
) {
   const chat = model?.startChat({
      conversationId: conversationId, // 👈 your conversation ID
      generationConfig: {
         temperature: 0.7, // 👈 temperature
      },
   } as StartChatParams);
   genAIConversations.set(conversationId, chat!);
}
function setLastResponseIdForOpenAI(
   conversationId: string,
   responseId: string
) {
   openAIConversations.set(conversationId, responseId);
}

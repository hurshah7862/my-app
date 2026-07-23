import { useRef, useState } from 'react';
import TypingIndicator from './TyingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import axios from 'axios';
import incomingMessage from '@/assets/sounds/incoming_message.wav';
import outgoingMessage from '@/assets/sounds/outgoing_message.mp3';

const incomingAudio = new Audio(incomingMessage);
const outgoingAudio = new Audio(outgoingMessage);

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<Message[]>([]);
   const [errors, setErrors] = useState<string | null>('');
   const [isBotTyping, setIsBotTyping] = useState(false);

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setErrors('');
         setMessages((prevMessages) => [
            ...prevMessages,
            { content: prompt, role: 'user' },
         ]);
         outgoingAudio.play();
         setIsBotTyping(true);
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
            model: 'GoogleAI', // Change this to 'GoogleAI' if you want to use Google AI otherwise OpenAI
         });
         setMessages((prevMessages) => [
            ...prevMessages,
            { content: data.message, role: 'bot' },
         ]);
         incomingAudio.play();
      } catch (error) {
         console.error(error);
         setErrors('An error occurred while processing your request.');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypingIndicator />}
            {errors && <p className="text-red-500">{errors}</p>}
         </div>
         <ChatInput OnSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;

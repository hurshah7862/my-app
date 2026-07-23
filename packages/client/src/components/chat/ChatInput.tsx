import { type KeyboardEvent } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
   prompt: string;
};
type props = {
   OnSubmit: (data: ChatFormData) => void;
};
const ChatInput = ({ OnSubmit }: props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();
   const handleFormSubmit = (data: ChatFormData) => {
      reset({ prompt: '' });
      OnSubmit(data);
   };
   const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(handleFormSubmit)();
      }
   };
   return (
      <form
         onSubmit={handleSubmit(handleFormSubmit)}
         onKeyDown={handleKeyDown}
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            {...register('prompt', {
               required: true,
               maxLength: 1000,
               validate: (data) => data.trim().length > 0,
            })}
            autoFocus={true}
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask Anything..."
            maxLength={1000}
         />
         <Button
            disabled={
               formState.isValid === false || formState.isSubmitting === true
            }
            className="rounded-full w-9 h-9"
         >
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;

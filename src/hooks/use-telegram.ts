/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback } from 'react';

interface UseTelegramOptions {
   messageFormatter?: (data: any) => string;
}

interface UseTelegramReturn {
   isLoading: boolean;
   error: string | null;
   success: boolean;
   sendMessage: (data: any) => Promise<boolean>;
   resetState: () => void;
}

const TG_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export const useTelegram = ({
   messageFormatter: mf,
}: UseTelegramOptions): UseTelegramReturn => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState<boolean>(false);

   const messageFormatter = mf || defaultMessageFormatter;

   function defaultMessageFormatter(data: any): string {
      return Object.entries(data)
         .map(([key, value]) => `${key}: <b>${value}</b>`)
         .join('\n');
   }

   const resetState = useCallback(() => {
      setIsLoading(false);
      setError(null);
      setSuccess(false);
   }, []);

   const sendMessage = useCallback(
      async (data: any): Promise<boolean> => {
         if (!TG_TOKEN || !CHAT_ID) {
            setError('Telegram token or chat ID not provided');
            return false;
         }

         setIsLoading(true);
         setError(null);
         setSuccess(false);

         try {
            const response = await fetch(
               `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
               {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     chat_id: CHAT_ID,
                     parse_mode: 'HTML',
                     text: messageFormatter(data),
                  }),
               },
            );

            if (!response.ok) {
               const errorData = await response.json();
               throw new Error(
                  errorData.description || 'Failed to send message',
               );
            }

            setSuccess(true);
            return true;
         } catch (err) {
            const errorMessage =
               err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            return false;
         } finally {
            setIsLoading(false);
         }
      },
      [messageFormatter],
   );

   return {
      isLoading,
      error,
      success,
      sendMessage,
      resetState,
   };
};

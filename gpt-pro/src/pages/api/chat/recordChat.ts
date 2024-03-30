// pages/api/record-chat.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { recordChat } from '@/utilities/db/dbHelpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract data from the request body
      const { data, id, chatId } = req.body; // Assuming chatData contains the chat record and userId identifies the user

      // Call the recordChat function to save the chat data
      await recordChat(data, id, chatId);

      // Send a success response
      res.status(200).json({ message: 'Chat recorded successfully' });
    } catch (error) {
      // Handle errors and send an error response
      console.error('Error recording chat:', error);
      res.status(500).json({ error: 'Failed to record chat' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

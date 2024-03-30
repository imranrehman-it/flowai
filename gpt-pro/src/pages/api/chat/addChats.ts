import { NextApiRequest, NextApiResponse } from "next/types";
import { addChat } from "../../../utilities/db/dbHelpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const {title, id} = req.body
  try{
    const newChat = await addChat(title, id)
    return res.status(200).json({newChat})
  }
  catch(error){
    return res.status(500).json({message: 'Error adding chat'})
  }
}


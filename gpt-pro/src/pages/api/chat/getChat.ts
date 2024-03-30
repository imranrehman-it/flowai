import { NextApiRequest, NextApiResponse } from "next";
import { getChat } from "../../../utilities/db/dbHelpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.body 
    
    try{
        const chat = await getChat(id)
        console.log('chat', chat)
        res.status(200).json(chat)
    }catch(error){
        res.status(500).json({error: error})
    }
}


import { NextApiRequest, NextApiResponse } from "next";
import { renameChat } from "../../../utilities/db/dbHelpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id, title, user_id} = req.body
    console.log('req.body renameChat', req.body)
    try{
        const chat = await renameChat(id, title, user_id)
        console.log('chat', chat)
        res.status(200).json(chat)
    }
    catch(error){
        res.status(500).json({error: error})
    }
}

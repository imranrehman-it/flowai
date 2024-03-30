import { NextApiRequest, NextApiResponse } from "next";
import { getChats } from "../../../utilities/db/dbHelpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.body
    try{
        const chat = await getChats(id)
        console.log('chat man', chat)
        return res.status(200).json(chat)
    }catch(error){
        return res.status(500).json({error: error})
    }
}


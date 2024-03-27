import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

let conversationContext: any[] = []

const textPromp = async (req: NextApiRequest, res: NextApiResponse) =>{

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const {prompt} = req.body
   try {
        conversationContext.push({role: "user", content: prompt})
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125", // Specify the model you want to use
            messages: conversationContext
        });

        const textResponse = response.choices[0].message

        return res.status(200).json({ textResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

export default textPromp
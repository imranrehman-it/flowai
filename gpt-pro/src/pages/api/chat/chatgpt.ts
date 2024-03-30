import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";


let conversationContext: any[] = [];

const textPrompt: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        const openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY
    });

    const {prompt, messages} = req.body;
     const messageHistory = messages.map(message => ({role: 'user', content: message.role}))
     console.log(messageHistory)
     messageHistory.push({role: 'user', content: prompt})

    try {
        console.log('conversationContext', conversationContext, req.body)
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messageHistory,
            stream: true,
        });

        for await (const part of stream){
            res.write(part.choices[0]?.delta.content || "");
        }

        res.end()
    }

    catch(error){
        console.log(error)
    }
}
export default textPrompt;

import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req : NextApiRequest, res: NextApiResponse) => {
    const uri = process.env.MONGODB_URI as string;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        // Perform database operations here

        res.status(200).json({ message: 'Connected to MongoDB' });
    } catch (error) {
        console.error('Error connecting to MongoDB:');
        res.status(500).json({ message: 'Error connecting to MongoDB' });
    } finally {
        await client.close();
    }
}
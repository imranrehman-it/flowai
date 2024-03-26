// pages/api/testMongoDB.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGODB_URI as string;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('flow-ai');

        res.status(200).json({ message: 'Successfully connected to MongoDB'});
    } catch (error) {
        console.error('Error connecting to MongoDB:');
        res.status(500).json({ message: 'Error connecting to MongoDB' });
    } finally {
        await client.close();
    }
}

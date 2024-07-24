import { MongoClient, ObjectId } from 'mongodb'



interface User {
    id: string;
    name: string;
    email: string;
}

const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;

const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
    }
    return client;
};

export const addUser = async (user: User) =>{
    try{
        console.log('user', user)
        const client = await connectToDatabase();
        const db = client.db('flow-ai');
        const users = db.collection('users')

        const preCheck = await getUser(user.id)
        if(preCheck != null){
            return preCheck //user already exist
        }

        const result = await users.insertOne(user)
        return result

    }catch(error){
        throw error
    }
}

export const getUser = async(id: string) =>  {
    try{
        const client = await connectToDatabase();
        const db = client.db('flow-ai')
        const users = db.collection('users')

        const result = await users.findOne({id: id})
        return result
    }catch(error){
        throw error
    }
}

interface ChatRecord {
  user: string;
  content: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    chat: ChatRecord[]; // Add this line
}

export const recordChat = async (data: ChatRecord, id: string, chatId: string) => {
  try {
    const client = await connectToDatabase();
    const db = client.db('flow-ai');
    const chats = db.collection('chats');

    // Convert chatId to ObjectId
    const objectIdChatId = new ObjectId(chatId);

    await chats.updateOne(
      { _id: objectIdChatId }, // Use objectIdChatId instead of chatId
      { $push: { messages: data as any } }
    );
  } catch (error) {
    throw error;
  }
};

export const getChats = async (id: string) => {
    try {
        const client = await connectToDatabase();
        const db = client.db('flow-ai');
        const chats = db.collection('chats');

        // Find all chats where the user is the user id
        const result = await chats.find({ user: id }).toArray(); // Use toArray() to convert the cursor to an array
        return result;
    } catch (error) {
        throw error;
    }
};

export const getChat = async (id: string) => {
    try {
        const client = await connectToDatabase();
        const db = client.db('flow-ai');
        const chats = db.collection('chats');

        const result = await chats.findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw error;
    }
};




export const addChat = async (title: string, id: string) => {
    if(!id){
        throw new Error('User not found')
    }

  try{
    const client = await connectToDatabase();
    const db = client.db('flow-ai')
    const chats = db.collection('chats')
    const users = db.collection('users')

    if(!users){
      throw new Error('User not found')
    }

    const newChat = {
      title: title,
      user: id,
      messages: []
    }

    const chatObject = await chats.insertOne(newChat)
    await users.updateOne({id: id}, {$push: {chat: chatObject.insertedId as any }})

    return newChat
  }
   
  catch(error){
    throw error
  }
}

export const renameChat = async (id: string, title: string, user_id: User) => {
  try{
    const client = await connectToDatabase();
    const db = client.db('flow-ai');
    const chats = db.collection('chats');
    const users = db.collection('users');

    await chats.updateOne({user: user_id, _id: new ObjectId(id)}, {$set: {title: title}})
    const updatedChat = await chats.findOne({user: user_id, _id: new ObjectId(id)})
    return updatedChat
  }
  catch(error){
    throw error
  }
}


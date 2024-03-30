import { MongoClient, ObjectId } from 'mongodb'


interface User {
    id: string;
    name: string;
    email: string;
}

const uri = process.env.MONGODB_URI as string;

export const connectToDatabase = async () =>{
    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log('Connected to MongoDV')
        return client;
    }
    catch(error){
        console.log('Error connecting to mongoDB', error)
        throw error
    }
}

export const addUser = async (user: User) =>{
    try{
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

export const recordChat = async (data: ChatRecord, id: string) => {
  try{
    const client = await connectToDatabase();
    const db = client.db('flow-ai')
    const users = db.collection('users')

    await users.updateOne(
      { id: id },
      { $push : {chat: data}}
    );


  }
  catch(error){
    throw error
  }
}

export const getChat = async(id: string) => {
    try{
        const client = await connectToDatabase();
        const db = client.db('flow-ai')
        const users = db.collection('users')

        const result = await users.findOne({id: id})
        return result?.chat
    }catch(error){
        throw error
    }
}


export const addChat = async (title: string, id: string) => {
    if(!id){
        throw new Error('User not found')
    }
    

    if(!title){
        throw new Error('Title is required')
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
    await users.updateOne({id: id}, {$push: {chat: chatObject.insertedId}})

    return chatObject 
  }
   
  catch(error){
    throw error
  }
}


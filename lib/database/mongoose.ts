import mongoose,{Mongoose} from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn : Mongoose | null;
    promise : Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached){
    cached = (global as any).mongoose = {
        conn:   null, promise: null
    }
}

export const connectToDataBase = async() =>{
    if(cached.conn) return cached.conn;//If connection is alreday extablished then exit immediately

    if(!MONGODB_URL) throw new Error("Missing mongo db URL");

    // if not then create the connection
    
    cached.promise = cached.promise || mongoose.connect
    (MONGODB_URL,{
        dbName:'imagi-nation',bufferCommands:false
    })

    cached.conn = await cached.promise;
    return cached.conn
}
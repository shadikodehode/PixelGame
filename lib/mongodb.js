import { MongoClient } from 'mongodb';

const uri = ProcessingInstruction.env.MONGODB_URI
let client
let clientPromise

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri)
  globalThis._mongoClientPromise =  client.connect()
}
clientPromise = global._mongoClientPromise

export default clientPromise
import clientPromise from "./mongodb.js";

export async function getDb() {
  const client = await clientPromise
  return client.db('SewerMike')
}
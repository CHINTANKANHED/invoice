import {MongoClient, ServerApiVersion, Db} from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI || "mongodb+srv://chintankanhed:Chintan123@cluster0.rl0ec1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = process.env.DB_NAME || "invoice-app";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function getDbClient(): Promise<Db> {
  try {
    await client.connect();
    const dbConn = client.db(dbName);
    return dbConn;
  } catch (e) {
    console.error("unable to connect", e);
    throw new Error("Database connection failed"); // 🚀 throw instead of returning null
  }
}

// export async function connectDB() {
//   run().catch(console.dir);
// }

//   if (!conn) {
//     conn = await mongoose.connect(MONGO_URI);
//     console.log("MongoDB Connected");
//   }
//   return conn;
// }

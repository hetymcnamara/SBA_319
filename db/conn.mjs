
import  {MongoClient} from "mongodb";
const connectionString = process.env.ATLAS_URI || "mongodb+srv://hmc:<jgFCCYqoxCFK81fJ>@mongopractice.jobnlcm.mongodb.net/";

const client = new MongoClient(connectionString);
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db("sample_mflix");

export default db;
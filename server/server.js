import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const film_collectionName = process.env.MONGO_DB_COLLECTION_F;
const char_collectionName = process.env.MONGO_DB_COLLECTION_C;
const pla_collectionName = process.env.MONGO_DB_COLLECTION_P;
const fc_collectionName = process.env.MONGO_DB_COLLECTION_FC;
const fp_collectionName = process.env.MONGO_DB_COLLECTION_FP;


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


app.get('/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(film_collectionName);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

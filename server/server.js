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
app.use(express.static('./public'))


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

app.get('/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(pla_collectionName);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(char_collectionName);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/characters/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(char_collectionName);
        
        const characters = await collection.findOne({ id: +id });
        

        if (!characters) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/films/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(film_collectionName);
        
        const films = await collection.findOne({ id: +id });
        

        if (!films) {
            return res.status(404).json({ error: 'Film not found' });
        }
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/planets/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(pla_collectionName);
        
        const planets = await collection.findOne({ id: +id });
        

        if (!planets) {
            return res.status(404).json({ error: 'PLanet not found' });
        }
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/films/:id/characters', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection_one = db.collection(fc_collectionName);
        const collection_two = db.collection(char_collectionName);
        
        const filmChars = await collection_one.find({ film_id: +id }).toArray();

        if (!filmChars) {
            return res.status(404).json({ error: 'Film not found' });
        }

        const charIDs = filmChars.map(fc => fc.character_id);
        const characters = await collection_two.find({id: {$in: charIDs}}).toArray();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/films/:id/planets', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection_one = db.collection(fp_collectionName);
        const collection_two = db.collection(pla_collectionName);
        
        const filmPlanets = await collection_one.find({ film_id: +id }).toArray();

        if (!filmPlanets) {
            return res.status(404).json({ error: ' Film not found' });
        }

        const planetIDs = filmPlanets.map(fp => fp.planet_id);
        const planets = await collection_two.find({id: {$in: planetIDs}}).toArray();
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/characters/:id/films', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection_one = db.collection(fc_collectionName);
        const collection_two = db.collection(film_collectionName);
        
        const filmChars = await collection_one.find({ character_id: +id }).toArray();

        if (!filmChars) {
            return res.status(404).json({ error: 'Character not found' });
        }

        const filmIDs = filmChars.map(fc => fc.film_id);
        const films = await collection_two.find({id: {$in: filmIDs}}).toArray();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/characters/:id/planet', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection_one = db.collection(char_collectionName);
        const collection_two = db.collection(pla_collectionName);
        
        const char = await collection_one.find({ id: +id }).toArray();

        if (!char) {
            return res.status(404).json({ error: 'Character not found' });
        }

        const homeworld = char.map(char => char.homeworld);
        const planet = await collection_two.find({id: {$in: homeworld}}).toArray();
        res.json(planet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/planets/:id/films', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection_one = db.collection(fp_collectionName);
        const collection_two = db.collection(film_collectionName);
        
        const filmPlanets = await collection_one.find({ planet_id: +id }).toArray();

        if (!filmPlanets) {
            return res.status(404).json({ error: ' Planet not found' });
        }

        const filmIDs = filmPlanets.map(fp => fp.film_id);
        const films = await collection_two.find({id: {$in: filmIDs}}).toArray();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/planets/:id/characters', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection_one = db.collection(char_collectionName);
        
        const charPlanets = await collection_one.find({ homeworld: +id }).toArray();

        if (!charPlanets) {
            return res.status(404).json({ error: ' No inhabitants for this planet or Planet not found' });
        }

        res.json(charPlanets);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
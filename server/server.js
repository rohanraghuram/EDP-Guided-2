import express from 'express';

const app = express();
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get('/planets', async (_req, res) => {
    try {
        const data = {"name" : "Vincent"};
        //const jsonObj = JSON.parse(data);
        console.log("Test");
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you!");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
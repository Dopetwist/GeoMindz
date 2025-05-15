import express from "express";
import cors from "cors";
import env from "dotenv";
import pg from "pg";


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

env.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect();



app.get("/api/countries", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM capitals");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
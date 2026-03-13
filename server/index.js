import express from "express";
import cors from "cors";
import env from "dotenv";
/* import pg from "pg"; */
import pkg from "pg";


const app = express();
const port = process.env.PORT || 5000;

const { Pool } = pkg;

app.use(cors());
app.use(express.json());

env.config();

// Database Connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:J20161978583A...@localhost:5432/paperback",
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false
});

/* const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect(); */



app.get("/api/countries", async (req, res) => {
  try {
    const result = await db.query("SELECT country, capital FROM public.capitals ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
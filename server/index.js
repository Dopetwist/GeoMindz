import express from "express";
import cors from "cors";
import env from "dotenv";
/* import pg from "pg"; */
import pkg from "pg";
import path from "path";


const app = express();
const port = process.env.PORT || 5000;

const { Pool } = pkg;

app.use(cors());
app.use(express.json());
app.use(express.static("client/dist")); // server serves react for deployment

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

// Catch-all route so React routing works
app.get("(.*)", (req, res) => {
  res.sendFile(path.resolve("client/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
import express from "express";
import cors from "cors";
import env from "dotenv";
import pkg from "pg";
import path from "path";

env.config();

const app = express();
const port = process.env.PORT || 5000;

const { Pool } = pkg;

app.use(cors());
app.use(express.json());
app.use(express.static("client/dist")); // server serves react for deployment


// Database Connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


app.get("/api/countries", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM world_app.capitals");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Catch-all route so React routing works
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve("client/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
import express from "express";
import cors from "cors";
import pg from "pg";


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "j20161978583A..",
  port: 5432
});

db.connect();



app.get("/api/countries", async (err, res) => {
  try {
    const result = await db.query("SELECT * FROM capitals");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
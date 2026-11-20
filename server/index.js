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

// Get countries data from database
app.get("/api/countries", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM capitals");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching countries data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Health Check Endpoints
app.get("/api/health", (req, res) => {
    try {
        res.status(200).json({ 
                success: true, 
                message: "Server is running." 
            });
    } catch (error) {
        console.error("Server health check failed:", error.message);
        res.status(500).json({ success: false, message: "Server health check failed." });
    }
});

app.get("/api/health/db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() AS server_time");

    res.status(200).json({
      success: true,
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    console.error("Database health check failed:", {
      message: error.message,
      code: error.code,
      detail: error.detail,
    });

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Catch-all route so React routing works
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve("client/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
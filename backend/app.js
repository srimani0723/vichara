const express = require("express");
const path = require("path");
const fs = require("fs");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const notesRouter = require("./routes/notesRouter");
const PORT = require("./config/port");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "notes.db");
let db = null;

const initializeDBAndServer = async () => {
  // connect with db sqlite3
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const schemaPath = path.join(__dirname, "schemas", "notes.sql");
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, "utf-8");
      await db.exec(schema);
      console.log("Database schema applied successfully!");
    } else {
      console.error("Error: Schema file missing");
    }

    app.get("/", (request, response) => {
      response.send(
        "Welcome to Vichara - Vichara (विचार) – Thoughts & Reflection"
      );
    });

    app.use("/notes", notesRouter(db));

    app.listen(PORT, () => {
      console.log(`server running at ${PORT}`);
    });
  } catch (error) {
    console.log("Database Initialization Error:", error);
    process.exit();
  }
};

initializeDBAndServer();

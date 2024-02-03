const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(
  `${process.env.dua}`,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Error opening the database:", err.message);
    } else {
      console.log("Connected to the database");
    }
  }
);

app.get("/all-dua", (req, res) => {
  db.all("SELECT * FROM dua", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.json(rows);
  });
});

app.get("/", (req, res) => {
  res.send("Dua server is running");
});

app.listen(port, () => {
  console.log(`dua server is running on port: ${port}`);
});

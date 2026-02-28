const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "expresik",
});

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/o-nas", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "o-nas.html"));
});

app.get("/oferta", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "oferta.html"));
});

app.get("/kontakt", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "kontakt.html"));
});

app.post("/kontakt", (req, res) => {
  console.log("Dane z formularza:", req.body);

  const { imie, nazwisko, email, tresc } = req.body;

  const sql = `
        INSERT INTO messages (imie, nazwisko, email, tresc)
        VALUES (?, ?, ?, ?)`;

  db.query(sql, [imie, nazwisko, email, tresc], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Błąd zapisu do bazy");
    }

    res.redirect("/");
  });
});

app.get("/api/contact-messages", (req, res) => {
  const sql = `SELECT * FROM messages ORDER BY id DESC`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Błąd zapytania SQL" });
    }

    res.json(rows);
  });
});

app.get("/api/contact-messages/:id", (req, res) => {
  const sql = `SELECT * FROM messages WHERE id = ?`;

  db.query(sql, [req.params.id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Błąd zapytania SQL" });
    }

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Nie znaleziono wiadomości o podanym ID" });
    }

    res.json(rows[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));

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
  console.log("Dane z formularza:");
  console.log(req.body);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

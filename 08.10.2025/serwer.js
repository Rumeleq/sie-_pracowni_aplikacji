const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 3000;

const routes = {
  "/": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Strona główna");
  },
  "/json": (req, res) => {
    const data = { imie: "Jan", nazwisko: "Kowalski", wiek: 30 };
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(data));
  },
  "/html": (req, res) => {
    const html = `
            <!DOCTYPE html>
            <html lang="pl">
            <head><meta charset="UTF-8"><title>HTML z kodu</title></head>
            <body>
                <h1>Witaj na stronie generowanej w Node.js!</h1>
                <p>To treść wygenerowana w kodzie.</p>
            </body>
            </html>
        `;
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  },
  "/plik": (req, res) => {
    fs.readFile("strona.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Błąd serwera – nie udało się wczytać pliku");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      }
    });
  },
  "/get_params": (req, res) => {
    const params = url.parse(req.url, true).query;
    console.log("Otrzymane parametry:", params);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(JSON.stringify({ ok: "ok" }));
    fs.writeFile(`params_${Date.now()}.json`, JSON.stringify(params), (err) => {
      if (err) console.error("Błąd zapisu pliku:", err);
      else console.log("Parametry zapisane do pliku");
    });
  },
};

const server = http.createServer((req, res) => {
  const parsed_url = url.parse(req.url, true);
  const handler = routes[parsed_url.pathname];

  console.log("Serwer: %s", req.url, handler);
  if (handler) handler(req, res);
  else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Nie znaleziono strony");
  }
});

server.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});

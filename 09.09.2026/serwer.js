const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

function return_error(req, res, status_code) {
    res.writeHead(status_code, {"Content-Type": "text/plain; charset: utf8"});
    res.end(`Error ${status_code}`);
}

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, "http://localhost:" + PORT)
    const pathname = parsedUrl.pathname

    if (pathname === "/" && req.method === "GET") {
        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
            if (err) return_error(req, res, 500);
            res.writeHead(200, {"Content-Type": "text/html; charset: utf8"});
            res.end(data);
        })
    }

    else if (pathname === "/kontakt" && req.method === "GET") {
        fs.readFile(path.join(__dirname, "kontakt.html"), (err, data) => {
            if (err) return_error(req, res, 500);
            res.writeHead(200, {"Content-Type": "text/html; charset: utf8"});
            res.end(data);
        })
    }

    else if (pathname === "/css/style.css" && req.method === "GET") {
        fs.readFile(path.join(__dirname, "css/style.css"), (err, data) => {
            if (err) return_error(req, res, 500);
            res.writeHead(200, {"Content-Type": "text/css; charset: utf8"});
            res.end(data);
        })
    }

    else {
        res.writeHead(404, {"Content-Type": "text/plain; charset: utf8"});
        res.end("404 Nie znaleziono")
    }
})

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
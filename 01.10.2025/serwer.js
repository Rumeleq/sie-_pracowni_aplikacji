const http = require("http")
const fs = require("fs")
const port = 3000

const server = http.createServer((req, res) =>
{
    if (req.url === "/")
    {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
        res.end("Strona główna")
    }
    else if (req.url === "/json")
    {
        const data = {
            imie: "Jan",
            nazwisko: "Kowalski",
            wiek: 30
        }
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
        res.end(JSON.stringify(data))
    }
    else if (req.url === "/html")
    {
        const html = `
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <title>HTML z kodu</title>
            </head>
            <body>
                <h1>Witaj na stronie generowanej w Node.js!</h1>
                <p>To treść wygenerowana w kodzie.</p>
            </body>
            </html>
        `
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        res.end(html)
    }
    else if (req.url === "/plik")
    {
        fs.readFile("strona.html", (err, data) =>
        {
            if (err)
            {
                res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
                res.end("Błąd serwera – nie udało się wczytać pliku")
            } else
            {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.end(data)
            }
        })
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
        res.end("404 - Nie znaleziono strony")
    }
})

server.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`)
})

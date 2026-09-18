const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 3000

function return_error(req, res, status_code) {
  res.writeHead(status_code, { "Content-Type": "text/plain; charset: utf8" })
  res.end(`Error ${status_code}`)
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://localhost:" + PORT)
  const pathname = parsedUrl.pathname

  if (req.method === "GET") {
    switch (pathname) {
      case "/":
        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
          if (err) return_error(req, res, 500)
          res.writeHead(200, {
            "Content-Type": "text/html; charset: utf8",
          })
          res.end(data)
        })
        break

      case "/kontakt":

        fs.readFile(path.join(__dirname, "kontakt.html"), (err, data) => {
          if (err) return_error(req, res, 500)
          res.writeHead(200, {
            "Content-Type": "text/html; charset: utf8",
          })
          res.end(data)
        })

        const params = parsedUrl.searchParams
        if (params.size === 0) return

        fs.writeFile(path.join(__dirname, `message_${Date.now()}.json`), JSON.stringify(Object.fromEntries(params)), (err) => {
          if (err) console.error(`Błąd zapisu do pliku parametrów ${JSON.stringify(Object.fromEntries(params))}`)
        })
        break

      case "/css/style.css":
        fs.readFile(path.join(__dirname, "css/style.css"), (err, data) => {
          if (err) return_error(req, res, 500)
          res.writeHead(200, {
            "Content-Type": "text/css; charset: utf8",
          })
          res.end(data)
        })
        break

      default:
        res.writeHead(404, {
          "Content-Type": "text/plain; charset: utf8",
        })
        res.end("404 Nie znaleziono")
        break
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})

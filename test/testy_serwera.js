const http = require("http")
const fs = require("fs")
//const url = require("url")
const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer(async (req, res) => {
    //const parsed_url = url.parse(req.url, true)
    const url = req.url
    console.log(`Otrzymano żądanie: ${url}`)

    if (url === "/")
    {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.end("Hewwo")
    }
    else if (url === "/html")
    {
        const html = await fs.promises.readFile("plik.html")
        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.end(html)
    }
})

server.listen(port, () => {
    console.log(`Listening on http://${hostname}:${port}`)
})
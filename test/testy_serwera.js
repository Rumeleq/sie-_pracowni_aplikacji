const http = require("http");
const fs = require("fs");
const url = require("url");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  //const parsed_url = url.parse(req.url, true)
  const req_url = req.url;
  const method = req.method;
  console.log(`Otrzymano żądanie: ${req_url}`);
  const query = url.parse(
    "http://localhost:8080/default.html?year=2023&month=september",
    true,
  );
  console.log(query.port);
  console.log(query.host); // logs 'localhost:8080'
  console.log(query.pathname); // logs '/default.html'
  console.log(query.search);

  if (req_url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    const html = await fs.promises.readFile("form.html");
    return res.end(html);
  } else if (req_url === "/html") {
    const html = await fs.promises.readFile("plik.html");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } else if (req_url === "/json") {
    const json = {
      niga: "niga",
    };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(json));
  }
  if (req_url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk.toString());
      body.push(chunk);
    });
    req.on("end", async () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      await fs.promises.writeFile(
        `message-${Date.now().toString()}.txt`,
        message,
      );
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { connectMongo, getDb, closeMongo } = require("./mongo");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3306;
const MONGODB_URI = process.env.MONGODB_URI || "";
const MONGODB_DB = process.env.MONGODB_DB || "";

app.use(express.json());

app.use(async (req, res, next) => {
  const startedAt = Date.now();
  const requestData = {
    method: req.method,
    path: req.originalUrl || req.url,
    ip: req.ip,
    userAgent: req.get("user-agent") || "",
    query: req.query || {},
    body: req.body || {},
  };
  res.on("finish", async () => {
    const db = getDb();
    if (!db) {
      return;
    }
    const durationMs = Date.now() - startedAt;
    const log = {
      ...requestData,
      status: res.statusCode,
      durationMs,
      time: new Date(),
    };
    try {
      await db.collection("accessLogs").insertOne(log);
    } catch (e) {}
  });
  next();
});

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok" });
  } catch (e) {
    res.status(500).json({ status: "error", error: String(e) });
  }
});

app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });
  res.json(categories);
});

app.post("/categories", async (req, res) => {
  const { name, slug } = req.body || {};
  if (!name || !slug)
    return res.status(400).json({ error: "name and slug are required" });
  try {
    const created = await prisma.category.create({ data: { name, slug } });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.get("/categories/:id", async (req, res) => {
  const id = Number(req.params.id);
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json(category);
});

app.put("/categories/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, slug } = req.body || {};
  try {
    const updated = await prisma.category.update({
      where: { id },
      data: { name, slug },
    });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.delete("/categories/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { category: true, comments: true },
    orderBy: { id: "desc" },
  });
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { title, content, categoryId } = req.body || {};
  if (!title || !content)
    return res.status(400).json({ error: "title and content are required" });
  try {
    const created = await prisma.post.create({
      data: {
        title,
        content,
        category: categoryId
          ? { connect: { id: Number(categoryId) } }
          : undefined,
      },
      include: { category: true },
    });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.get("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: { category: true, comments: true },
  });
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

app.put("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, content, categoryId } = req.body || {};
  try {
    const updated = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        category:
          categoryId === null
            ? { disconnect: true }
            : categoryId
              ? { connect: { id: Number(categoryId) } }
              : undefined,
      },
      include: { category: true },
    });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.post.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.get("/posts/:postId/comments", async (req, res) => {
  const postId = Number(req.params.postId);
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { id: "desc" },
  });
  res.json(comments);
});

app.post("/posts/:postId/comments", async (req, res) => {
  const postId = Number(req.params.postId);
  const { body, author } = req.body || {};
  if (!body) return res.status(400).json({ error: "body is required" });
  try {
    const created = await prisma.comment.create({
      data: { body, author, post: { connect: { id: postId } } },
    });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.delete("/comments/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.comment.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: String(e) });
  }
});

app.use(async (err, req, res, next) => {
  const db = getDb();
  const status = err && err.statusCode ? Number(err.statusCode) : 500;
  const errorDoc = {
    message: err && err.message ? String(err.message) : "Error",
    stack: err && err.stack ? String(err.stack) : undefined,
    status,
    time: new Date(),
    method: req.method,
    path: req.originalUrl || req.url,
    ip: req.ip,
    userAgent: req.get("user-agent") || "",
    query: req.query || {},
    body: req.body || {},
  };
  if (db) {
    try {
      await db.collection("errorLogs").insertOne(errorDoc);
    } catch (e) {}
  }
  res.status(status).json({ error: errorDoc.message });
});

async function start() {
  if (MONGODB_URI && MONGODB_DB) {
    try {
      await connectMongo(MONGODB_URI, MONGODB_DB);
    } catch (e) {}
  }
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  return server;
}

let server = null;
start().then((s) => {
  server = s;
});

async function shutdown() {
  await prisma.$disconnect();
  await closeMongo();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = app;

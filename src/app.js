const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const carRoutes = require("./routes/carRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

// ===== CORS =====
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ===== HEADERS DE SEGURANÇA (resolve o "Erro" do DevTools) =====
app.use(
  helmet({
    contentSecurityPolicy: false, // evita quebrar coisas no dev
  })
);

// ===== CACHE CONTROL (evita warnings de cache) =====
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// ===== JSON =====
app.use(express.json());

// ===== ROTA RAIZ =====
app.get("/", (req, res) => {
  res.type("application/json; charset=utf-8");
  res.json({
    status: "ok",
    name: "Tudocarro API",
    version: "1.0.0",
  });
});

// ===== ROTAS =====
app.use("/api/news", newsRoutes);
app.use("/api/cars", carRoutes);

module.exports = app;

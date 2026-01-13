// src/routes/newsRoutes.js
const express = require("express");
const { fetchG1Carros, fetchGNews } = require("../services/newsService");

const router = express.Router();

// /api/news/g1?limit=12
router.get("/g1", async (req, res) => {
  try {
    const limit = Number(req.query.limit || 12);
    const data = await fetchG1Carros(limit);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(502).json({ ok: false, message: "Falha ao buscar RSS do G1", error: e.message });
  }
});

// /api/news/gnews?q=leilao%20carros&limit=12
router.get("/gnews", async (req, res) => {
  try {
    const q = String(req.query.q || "leilão carros");
    const limit = Number(req.query.limit || 12);
    const data = await fetchGNews(q, limit);

    if (data?.error) return res.status(500).json({ ok: false, message: data.error });

    res.json({ ok: true, data });
  } catch (e) {
    res.status(502).json({ ok: false, message: "Falha ao buscar notícias (GNews)", error: e.message });
  }
});

module.exports = router;

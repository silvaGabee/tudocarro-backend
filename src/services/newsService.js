// src/services/newsService.js
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// RSS do G1 Carros (Globo)
const G1_CARROS_RSS = "https://g1.globo.com/rss/g1/carros"; // :contentReference[oaicite:2]{index=2}

async function fetchG1Carros(limit = 12) {
  const { data: xml } = await axios.get(G1_CARROS_RSS, { timeout: 8000 });

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);

  const items = parsed?.rss?.channel?.item || [];
  const list = (Array.isArray(items) ? items : [items]).slice(0, limit);

  return list.map((it) => ({
    source: "g1_carros",
    title: it.title,
    url: it.link,
    publishedAt: it.pubDate,
    description: it.description,
    image:
      it["media:content"]?.["@_url"] ||
      it["media:thumbnail"]?.["@_url"] ||
      null,
  }));
}

// API Genérica: GNews
// Docs: https://docs.gnews.io/ :contentReference[oaicite:3]{index=3}
async function fetchGNews(query, limit = 12) {
  if (!GNEWS_API_KEY) {
    return { error: "GNEWS_API_KEY não configurada" };
  }

  const url = "https://gnews.io/api/v4/search";
  const params = {
    q: query,
    lang: "pt",
    country: "br",
    max: limit,
    apikey: GNEWS_API_KEY,
  };

  const { data } = await axios.get(url, { params, timeout: 8000 });

  return (data.articles || []).map((a) => ({
    source: "gnews",
    title: a.title,
    url: a.url,
    publishedAt: a.publishedAt,
    description: a.description,
    image: a.image || null,
  }));
}

module.exports = { fetchG1Carros, fetchGNews };

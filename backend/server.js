const express = require("express");
const cors = require("cors");
const axios = require("axios");
const getEmbedding = require("./embeddingsService");
const generateExplanation = require("./llmService");
const app = express();
app.use(cors());
app.use(express.json());

const WEAVIATE_URL = "http://localhost:8080/v1";


// 🔍 Semantic search endpoint
app.post("/search", async (req, res) => {
  try {
    const { 
      query, 
      limit = 10, 
      category = "", 
      sortBy = "similarity" 
    } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query required" });
    }

    // 1️⃣ Embed query
    const queryVector = await getEmbedding(query);

    // 2️⃣ Vector search from Weaviate
    const response = await axios.post(
      `${WEAVIATE_URL}/graphql`,
      {
        query: `
        {
          Get {
            Product(
              nearVector: { vector: [${queryVector.join(",")}] }
              limit: ${limit * 3} 
            ) {
              name
              brand
              category
              rating
              price
              _additional { distance }
            }
          }
        }
        `
      }
    );

    let results = response.data.data.Get.Product;

    // 3️⃣ Convert distance → similarity
    let formatted = results.map(p => ({
      name: p.name,
      brand: p.brand,
      category: p.category,
      rating: p.rating || 0,
      price: p.price,
      similarity: Number((1 - p._additional.distance).toFixed(3))
    }));

    // 🔍 CATEGORY FILTER (optional)
    if (category) {
      formatted = formatted.filter(p =>
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    // 📊 SORTING LOGIC
    if (sortBy === "similarity") {
      formatted.sort((a, b) => b.similarity - a.similarity);
    }

    if (sortBy === "rating") {
      formatted.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "smart") {
      // weighted ranking (best practice)
      formatted = formatted.map(p => ({
        ...p,
        finalScore: (p.similarity * 0.7) + (p.rating * 0.3)
      }));

      formatted.sort((a, b) => b.finalScore - a.finalScore);
    }

    // ✂️ Limit final output
    const topResults = formatted.slice(0, limit);

    // 🤖 Add LLM explanations
    for (let product of topResults) {
      product.explanation = await generateExplanation(query, product);
    }

    res.json(topResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});


// 🚀 Start server
app.listen(3000, () => {
  console.log("Search API running on http://localhost:3000");
});
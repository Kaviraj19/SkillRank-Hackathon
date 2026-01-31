const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const _ = require("lodash");
const getEmbedding = require("./embeddingsService");
require("dotenv").config();

const rows = [];

fs.createReadStream("./data/products.csv")
  .pipe(csv())
  .on("data", (data) => rows.push(data))
  .on("end", async () => {

    const grouped = _.groupBy(rows, "id");
    const productIds = Object.keys(grouped);

    console.log("Total products:", productIds.length);

    let indexedCount = 0;

    for (let productId of productIds) {

      const group = grouped[productId];
      const base = group[0];

      // 🧹 Skip bad entries
      if (!base.name || base.name.trim() === "") continue;

      // 🧽 Clean text
      const cleanName = base.name.replace(/,+/g, ",").trim();
      const cleanCategory = (base.categories || "")
        .replace(/\s+/g, " ")
        .trim();

      const reviews = group
        .map(r => r["reviews.text"])
        .filter(Boolean)
        .slice(0, 5)
        .join(" ");

      // 🧠 Better embedding text
      const embeddingText = `
Product: ${cleanName}
Brand: ${base.brand || "Unknown"}
Category: ${cleanCategory}
Customer Reviews: ${reviews}
      `;

      // ⚡ Local embedding
      const vector = await getEmbedding(embeddingText);

      // ⭐ Average rating
      const ratings = group
        .map(r => Number(r["reviews.rating"]))
        .filter(r => !isNaN(r));

      const avgRating = ratings.length
        ? ratings.reduce((a,b)=>a+b,0)/ratings.length
        : 0;

      // 📦 Store in Weaviate
      await axios.post("http://localhost:8080/v1/objects", {
        class: "Product",
        properties: {
          name: cleanName,
          description: embeddingText,
          price: 0, // placeholder
          brand: base.brand || "Unknown",
          rating: avgRating,
          category: cleanCategory
        },
        vector
      });

      indexedCount++;
      console.log(`Indexed (${indexedCount}):`, cleanName);
    }

    console.log(`✅ Clean indexing done. Total indexed: ${indexedCount}`);
  });
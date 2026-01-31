const { pipeline } = require("@xenova/transformers");

let embedder = null;

// Lazy load model (loads only once)
async function loadModel() {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embedder;
}

async function getEmbedding(text) {
  const model = await loadModel();

  const output = await model(text, {
    pooling: "mean",
    normalize: true
  });

  // Convert tensor to normal array
  return Array.from(output.data);
}

module.exports = getEmbedding;
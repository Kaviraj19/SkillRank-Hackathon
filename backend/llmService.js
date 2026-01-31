const callLLM = require("./callLLM");

async function generateExplanation(query, product) {

  const prompt = `
User search query:
"${query}"

Product info:
Name: ${product.name}
Brand: ${product.brand}
Category: ${product.category}
Rating: ${product.rating}

Task:
Explain in 1-2 short sentences why this product is a good match for the user's intent.
Focus on usefulness and relevance.
`;

  const explanation = await callLLM(prompt);

  return explanation.trim();
}

module.exports = generateExplanation;
const callLLM = require("./llmService");

async function extractIntent(query) {
  const prompt = `
Extract structured info from this query:

"${query}"

Return JSON with:
budget (number or null)
category
use_case

Example:
{
 "budget":60000,
 "category":"laptop",
 "use_case":"video editing"
}
`;

  const result = await callLLM(prompt);

  return JSON.parse(result);
}

module.exports = extractIntent;
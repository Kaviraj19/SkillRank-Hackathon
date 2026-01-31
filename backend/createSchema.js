const axios = require("axios");

async function createSchema() {
  const schema = {
  "class": "Product",
  "vectorizer": "none",
  "vectorIndexConfig": {
    "dimensions": 384
  },
  "properties": [
    { "name": "name", "dataType": ["text"] },
    { "name": "description", "dataType": ["text"] },
    { "name": "brand", "dataType": ["text"] },
    { "name": "category", "dataType": ["text"] },
    { "name": "rating", "dataType": ["number"] },
    { "name": "price", "dataType": ["number"] }
  ]
};

  await axios.post("http://localhost:8080/v1/schema", schema);

  console.log("✅ Product schema created in Weaviate");
}

createSchema().catch(console.error);
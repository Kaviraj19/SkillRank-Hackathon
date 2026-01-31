# 🚀 SemanticSearchPro – Full Stack AI Semantic Search Application

SemanticSearchPro is a full-stack AI-powered product search system that uses vector embeddings, semantic similarity, and large language models (LLMs) to deliver intelligent product recommendations with natural language understanding.

Users can search using queries like:

"tablet for kids under 15000"  
"best kindle for reading at night"

and get relevant results along with AI-generated explanations.

---

## 📌 Features

- 🔍 Semantic product search using vector embeddings  
- 🧠 Intelligent ranking based on similarity + ratings  
- 🤖 LLM-generated explanations for search results  
- ⚡ Fast local embedding generation  
- 🌐 Full-stack implementation with frontend UI  
- 📊 Supports large datasets (30k+ products)

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Axios
- Inline CSS styling

### Backend
- Node.js
- Express.js
- Axios

### AI & Data Layer
- Local Embedding Model (@xenova/transformers)
- Weaviate Vector Database
- OpenRouter LLM API (Mistral-7B-Instruct)

---

## 🧠 Where LLM is Used

The LLM is used to generate natural language explanations for each search result.

File responsible:

llmService.js

It explains why a product matches the user's query based on:

- Product name  
- Category  
- Brand  
- Rating  

This improves user understanding and trust.

---

## 🔄 End-to-End Data Flow

### 1️⃣ Dataset Ingestion

- CSV product data is loaded  
- Reviews are combined  
- Each product is converted into embeddings  
- Stored inside Weaviate vector database  

---

### 2️⃣ User Query (Frontend)

User enters a natural language query in UI.

Example:

tablet for kids under 15000

---

### 3️⃣ Query Embedding

Backend converts query into vector embedding.

---

### 4️⃣ Vector Similarity Search

Weaviate finds nearest products using semantic similarity.

---

### 5️⃣ Smart Ranking

Results ranked using:

final score = (semantic similarity × 0.7) + (rating × 0.3)

---

### 6️⃣ LLM Explanation Layer

Top results are sent to OpenRouter LLM to generate short explanations.

---

### 7️⃣ Frontend Display

Frontend shows:

- Product name  
- Rating  
- Similarity score  
- AI explanation  

---

## ▶️ How to Run the Project

### ✅ Prerequisites

- Node.js  
- Docker  

---

## 📦 Backend Setup

### 1. Go to backend folder

cd backend

### 2. Install dependencies

npm install

### 3. Start Weaviate

docker compose up -d

---

### 4. Load dataset

node loadDataset.js

---

### 5. Start backend server

node server.js

Backend runs at:

http://localhost:3000

---

## 🌐 Frontend Setup

### 1. Go to frontend

cd frontend/SemanticSearchPro

### 2. Install dependencies

npm install

### 3. Start frontend

npm run dev

Open browser:

http://localhost:5173

---

## 🔐 Environment Variables

Create `.env` in backend folder:

OPENROUTER_API_KEY=your_api_key_here

---

## 📂 Project Structure

backend/
 ├─ server.js  
 ├─ loadDataset.js  
 ├─ embeddingsService.js  
 ├─ llmService.js  
 └─ data/products.csv  

frontend/
 └─ SemanticSearchPro/
     ├─ src/
     │   ├─ App.jsx  
     │   └─ Components/HomePage.jsx  

---

## 📈 Example API Request

{
  "query": "tablet for kids under 15000",
  "limit": 5
}

---

## 📊 Example Response

{
  "name": "Fire Kids Edition Tablet",
  "similarity": 0.58,
  "rating": 4.5,
  "explanation": "This tablet is suitable for children because it includes a durable kid-proof case, strong customer ratings, and is designed for everyday family use."
}

---

## 🎯 Why This Project is Intelligent

✔ Uses semantic meaning instead of keyword matching  
✔ Handles large datasets efficiently  
✔ Uses AI embeddings for relevance  
✔ Uses LLM for reasoning and explanations  

---

## 🚀 Future Enhancements

- Price filtering  
- Category filters  
- Review summarization  
- UI improvements  
- Autocomplete suggestions  

---

## 📜 License

MIT License

---

## 🙌 Author

Built as a Full Stack AI Semantic Search Project using modern AI technologies.
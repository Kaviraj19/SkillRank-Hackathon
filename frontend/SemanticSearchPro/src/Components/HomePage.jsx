import { useState } from "react";
import axios from "axios";

export default function HomePage() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.post("http://localhost:3000/search", {
        query,
        limit: 5
      });

      setResults(res.data);
    } catch (err) {
      setError("Search failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>🔍 AI Semantic Product Search</h1>

      {/* Search Bar */}
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Search products like: tablet for kids under 15000"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />

        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p>⏳ Searching intelligently...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Results */}
      <div style={styles.results}>

        {results.map((item, index) => (
          <div key={index} style={styles.card}>

            <h3>{item.name}</h3>

            <p><b>Brand:</b> {item.brand}</p>
            <p><b>Rating:</b> ⭐ {item.rating?.toFixed(1)}</p>
            <p><b>Similarity:</b> {(item.similarity * 100).toFixed(1)}%</p>

            <p style={styles.explanation}>
              🤖 {item.explanation}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial"
  },

  title: {
    marginBottom: "20px"
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "30px"
  },

  input: {
    width: "60%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "12px 20px",
    fontSize: "16px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  results: {
    display: "grid",
    gap: "20px"
  },

  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

 explanation: {
  marginTop: "12px",
  fontStyle: "italic",
  color: "#7bf3fb",        // nice AI purple-blue
  textAlign: "center",    // center aligned
  fontWeight: "500"
}
};
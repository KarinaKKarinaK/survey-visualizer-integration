import { useState, useEffect } from "react";

const API_URL = "https://opentdb.com/api.php?amount=50";

export function useTriviaData() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [difficultyCounts, setDifficultyCounts] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setQuestions(data.results);
        // Transform for teh category and difficulty counts
        const catCounts = {};
        const diffCounts = { easy: 0, medium: 0, hard: 0 };
        data.results.forEach(q => {
          catCounts[q.category] = (catCounts[q.category] || 0) + 1;
          diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
        });
        setCategoryCounts(catCounts);
        setDifficultyCounts(diffCounts);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  return { questions, loading, error, categoryCounts, difficultyCounts };
}

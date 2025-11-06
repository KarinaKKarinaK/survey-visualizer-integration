// src/App.js
import React, { useState, useMemo } from "react";
import { useTriviaData } from "./hooks/useTriviaData";
import { CategorySelector } from "./components/CategorySelector";
import { CategoryPieChart } from "./components/CategoryPieChart";
import { DifficultyBarChart } from "./components/DifficultyBarChart";

function App() {
  const { questions, loading, error, categoryCounts } = useTriviaData();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter questions by selected category
  const filteredQuestions = useMemo(
    () => selectedCategory ? questions.filter(q => q.category === selectedCategory) : questions,
    [questions, selectedCategory]
  );

  // Transform: Difficulty counts for filtered questions
  const difficultyChartData = useMemo(() => {
    const diffObj = { easy: 0, medium: 0, hard: 0 };
    filteredQuestions.forEach(q => { diffObj[q.difficulty]++; });
    return Object.keys(diffObj).map(difficulty => ({ difficulty, count: diffObj[difficulty] }));
  }, [filteredQuestions]);

  // Transform: Category counts for PieChart (all questions)
  const categoryChartData = useMemo(() => {
    return Object.keys(categoryCounts).map(key => ({ category: key, count: categoryCounts[key] }));
  }, [categoryCounts]);

  return (
    <div style={ { maxWidth: 700, margin: "0 auto" } }>
      <h2>Trivia Dashboard</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && (
        <>
          <CategorySelector
            categories={Object.keys(categoryCounts)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <h3>Category Distribution</h3>
          <CategoryPieChart data={categoryChartData} />
          <h3>Difficulty Distribution {selectedCategory ? `for '${selectedCategory}'` : "(All)"}</h3>
          <DifficultyBarChart data={difficultyChartData} />
        </>
      )}
    </div>
  );
}
export default App;

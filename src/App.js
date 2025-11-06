import React from "react";
import { useTriviaData } from "./hooks/useTriviaData";
import { DifficultyBarChart } from "./components/DifficultyBarChart";

function App() {
  const { questions, loading, error, categoryCounts, difficultyCounts } = useTriviaData();

  const difficultyChartData = [
  { difficulty: "easy", count: difficultyCounts.easy || 0 },
  { difficulty: "medium", count: difficultyCounts.medium || 0 },
  { difficulty: "hard", count: difficultyCounts.hard || 0 }
];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h2>Questions Fetched: {questions.length}</h2>
      <h3>Categories Distribution:</h3>
      <pre>{JSON.stringify(categoryCounts, null, 2)}</pre>
      <h3>Difficulty Distribution:</h3>
      <DifficultyBarChart data={difficultyChartData} />
    </div>
  );
}
export default App;

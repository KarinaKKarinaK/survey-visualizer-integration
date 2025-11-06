import React from "react";
import { useTriviaData } from "./hooks/useTriviaData";

function App() {
  const { questions, loading, error, categoryCounts, difficultyCounts } = useTriviaData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h2>Questions Fetched: {questions.length}</h2>
      <h3>Categories Distribution:</h3>
      <pre>{JSON.stringify(categoryCounts, null, 2)}</pre>
      <h3>Difficulty Distribution:</h3>
      <pre>{JSON.stringify(difficultyCounts, null, 2)}</pre>
    </div>
  );
}
export default App;

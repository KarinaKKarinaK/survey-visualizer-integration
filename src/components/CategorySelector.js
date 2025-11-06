import React from "react";

export function CategorySelector({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div>

      <label htmlFor="category-selector">Category:</label>
      
      <select
        id="category-selector"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

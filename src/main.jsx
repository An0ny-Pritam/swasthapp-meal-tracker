
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import foodData from './foods.json';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [savedMeals, setSavedMeals] = useState(() =>
    JSON.parse(localStorage.getItem('meals')) || []
  );

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(savedMeals));
  }, [savedMeals]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (value.length > 1) {
      const matches = foodData.filter(food => food.name.toLowerCase().includes(value));
      setResults(matches.slice(0, 10));
    } else {
      setResults([]);
    }
  };

  const addMeal = (meal) => {
    setSavedMeals([...savedMeals, meal]);
    setQuery('');
    setResults([]);
  };

  return (
    <div>
      <h1>SwasthApp 🍲 (Dark Mode)</h1>
      <input
        type="text"
        value={query}
        placeholder="Search Indian food..."
        onChange={handleSearch}
      />
      {results.map((food, i) => (
        <div key={i} className="result" onClick={() => addMeal(food)}>
          <strong>{food.name}</strong><br />
          Calories: {food.calories}, Protein: {food.protein}g, Carbs: {food.carbs}g, Fat: {food.fat}g
        </div>
      ))}

      <h2>Saved Meals</h2>
      {savedMeals.map((meal, i) => (
        <div key={i} className="result">
          <strong>{meal.name}</strong><br />
          Calories: {meal.calories}, Protein: {meal.protein}g, Carbs: {meal.carbs}g, Fat: {meal.fat}g
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

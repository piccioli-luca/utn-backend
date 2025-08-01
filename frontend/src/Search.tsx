import { useState } from "react";
import "./Search.css";
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface Cat {
    _id: string;
    name: string;
    color: string;
    age: number | null;
    breed: string | null;
    owner: string | null;
    weight_kg: number | null;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Cat[]>([]);
  const [initialState, setInitialState] = useState(1);

  const handleSearch = async () => {
    const res = await fetch(`${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setInitialState(0);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escriba el nombre del gato"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>

      {initialState === 0 && results.length === 0 && <p>Ningun gato encontrado</p>}
      <ul>
        {results.map((cat: Cat) => (
            <li key={cat._id} className="cat_result">
              {cat.name && <span>Nombre: {cat.name}<br /></span>}
              {cat.age !== null && <span>Edad: {cat.age} años<br /></span>}
              {cat.weight_kg !== null && <span>Peso: {cat.weight_kg} kg<br /></span>}
              {cat.breed !== null && <span>Raza: {cat.breed}<br /></span>}
              {cat.owner !== null && <span>Dueño/a: {cat.owner}<br /></span>}
              {cat.color !== null && <span>Color: {cat.color}<br /></span>}
            </li>
        ))}
      </ul>
    </div>
  );
}

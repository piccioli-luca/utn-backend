import { useState } from "react";

interface Cat {
  _id: string;
  name: string;
  age: number;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Cat[]>([]);

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cats by name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length === 0 && <p>No results found</p>}
      <ul>
        {results.map((cat: Cat) => (
          <li key={cat._id}>{cat.name} ({cat.age} years)</li>
        ))}
      </ul>
    </div>
  );
}

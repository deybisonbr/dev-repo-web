import React, { useState } from 'react';

const Search = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
    onSearch('')
  }


  return (
    <div className="search">
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Faça sua busca aqui"
      />
      <button onClick={() => onSearch(query)}>Procurar</button>
      <button onClick={handleClear}>Limpar</button>
    </div>

  )
}

export default Search;
import React, { useState, useEffect } from 'react';

interface SearchProps {
  onSearchChange: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Adjust debounce delay (in ms)

    // Clean up the timer on component unmount or when searchQuery changes
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Call the parent function only when the debounced query has updated
  useEffect(() => {
    if (debouncedQuery !== '') {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, onSearchChange]);

  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks"
        className="p-2 border rounded"
      />
    </div>
  );
};

export default Search;

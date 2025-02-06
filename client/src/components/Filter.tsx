import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filter: { status: string; description: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ status, description });
  };

  return (
    <div className="p-4 border rounded shadow-md flex gap-4">

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="in-progress">In Progress</option>
      </select>


      <button
        onClick={handleFilterChange}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;

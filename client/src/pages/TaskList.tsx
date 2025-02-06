import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import Search from '../components/Search';

interface Task {
  id: number;
  title: string;
  status: string;
  description: string; // description should be a string
}

interface TaskListProps {
  tasks: Task[]; // Define tasks as a prop passed to TaskList
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<{ status: string }>({
    status: '',
  });

  const handleFilterChange = (newFilter: { status: string }) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Apply filters and search query to tasks
  const applyFiltersAndSearch = () => {
    let filtered = tasks;

    // Apply status filter
    if (filter.status) {
      filtered = filtered.filter((task) => task.status === filter.status);
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    applyFiltersAndSearch();
  }, [filter, searchQuery, tasks]); 

  return (
    <div className="p-4">
      <h2 className='text-xl font-semibold mb-4'>Filter and search task</h2>
      <Filter onFilterChange={handleFilterChange} />
      <Search onSearchChange={handleSearchChange} />

      <div className="task-list mt-4">
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task p-4 border rounded mb-2">
              <h3 className="font-bold">{task.title}</h3>
              <p>Status: {task.status}</p>
              <p>Description: {task.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

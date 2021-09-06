import React from 'react';

import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';

import './app.css';


const App = () => {

  const todoDate = [
    {label: 'Drinck Coffe!', important: false, id: 1},
    {label: 'Make Awesome App', important: true, id: 2},
    {label: 'Learn React from DEV!', important: false, id: 3},
  ];

  return (
    <div className="todo-app">
      <AppHeader />
    
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={ todoDate } />
    </div>
  );
};

export default App;
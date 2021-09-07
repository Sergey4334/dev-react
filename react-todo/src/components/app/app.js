import React, {Component} from 'react';

import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


export default class App extends Component {

  maxId = 100;

  state = {
    todoDate: [
      {label: 'Drinck Coffe!', important: false, id: 1},
      {label: 'Make Awesome App', important: true, id: 2},
      {label: 'Learn React from DEV!', important: false, id: 3},
    ],
  };

  deleteItem = (id) => {
    this.setState(({todoDate}) => {
      const idx = todoDate.findIndex((el) => el.id === id);

      const before = todoDate.slice(0, idx);
      const after = todoDate.slice(idx +1);
      const newArr = [...before, ...after];

      return {
        todoDate: newArr,
      };

    });
  };

  addItem = (text) => {

    const newItem = {
      label: text,
      important: false,
      id: this.maxId++
    };
    this.setState(({todoDate}) => {
      const newArray = [
        newItem,
        ...todoDate
      ];

      return {
        todoDate: newArray
      };

    });
  };

  render() {
    return (
      <div className="todo-app">
        <AppHeader />
      
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={ this.state.todoDate } 
          onDeleted={ this.deleteItem }/>
        <ItemAddForm onItemAdded={ this.addItem }/>
      </div>
    );
  }
};
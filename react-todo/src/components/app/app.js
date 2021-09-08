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
    todoData: [
      this.createItem('Drink Coffe'),
      this.createItem('Create Awesome App'),
      this.createItem('Have a lunch'),
    ],
  };

  createItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx +1);
      const newArr = [...before, ...after];

      return {
        todoData: newArr,
      };

    });
  };

  addItem = (text) => {

    const newItem = this.createItem(text);

    this.setState(({todoData}) => {
      const newArray = [
        newItem,
        ...todoData
      ];

      return {
        todoData: newArray
      };

    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
  };

  onToggleDone  = (id) => {
    this.setState(({ todoData }) => {

      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };

    });
  };

  onToggleImportant  = (id) => {
    this.setState(({ todoData }) => {

      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };

    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={ doneCount } />
      
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={ todoData } 
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          />
        <ItemAddForm onItemAdded={ this.addItem }/>
      </div>
    );
  }
};
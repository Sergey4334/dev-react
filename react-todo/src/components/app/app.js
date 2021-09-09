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
    term: '',
    filter: 'all',
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

  search(items, term) {

    if(term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  filter(items, filter) {
    switch(filter) {
      case 'all' :
        return items;
      case 'active' :
        return items.filter((item) => !item.done);
      case 'done' :
        return items.filter((item) => item.done);
      default: 
      return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    const visiblItem = this.filter(this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={ doneCount } />
      
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={ this.onSearchChange }/>
          <ItemStatusFilter 
            filter={filter} 
            onFilterChange={this.onFilterChange}/>
        </div>
  
        <TodoList 
          todos={ visiblItem } 
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          />
        <ItemAddForm onItemAdded={ this.addItem }/>
      </div>
    );
  }
};
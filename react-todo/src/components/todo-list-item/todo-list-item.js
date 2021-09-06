import React, { Component } from "react";
import './todo-list-item.css';

//* Для передачи используется обьект props - props.label в class это this.props

export default class TodoListItem extends Component {

  onLabelClick = () => {
    console.log(`Done: ${ this.props.label }`);
  }

  render() {

    const { label, important = false } = this.props;

    const liStyle = {
      color: important ? 'steelblue' : 'black',
      fontWeight: important ? 'bold' : 'normal'
    };

    return ( 
      <span className="todo-list-item">
        <span
          className="todo-list-item-label"
          style={ liStyle } onClick={ this.onLabelClick }>
          { label }
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right">
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  };
};
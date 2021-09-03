import React from "react";

//* Для передачи используется обьект props - props.label

const TodoListItem = ({ label, important = false }) => {
  const liStyle = {
    color: important ? 'tomato' : 'black'
  };
  return <span style={liStyle}>{ label }</span>;
}

export default TodoListItem;
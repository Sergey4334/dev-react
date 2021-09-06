import React from "react";
import './search-panel.css';

const SearchPanel = () => {
  const searchStyle = {
    fontSize: '20px'
  }
  const searchText = 'Type text to here';
  return (
    <input type="text" placeholder={searchText} style={searchStyle} />
  );
};

export default SearchPanel;
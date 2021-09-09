import React, {Component} from "react";
import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onSearchChenge = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }
  
  render() {
    return (
      <input 
        type="text" 
        placeholder="Type text here" 
        className="form-control mr-2" 
        value={this.state.term}
        onChange={this.onSearchChenge}/>
    );
  }
};

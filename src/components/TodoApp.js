import React, {Component} from 'react';

export default class TodoApp extends Component {
  render() {
    const { item, onClick, index } = this.props;
    return(
        <div className="TodoApp">
          <p onClick={onClick}>
            <span>{index+1}. </span>
            <span>{item.title}</span>
          </p>
        </div>
    );
  }
}
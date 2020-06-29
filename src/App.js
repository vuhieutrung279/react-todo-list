import React, { Component } from 'react';
import './App.css';
import TodoApp from './components/TodoApp';
import NoImg from './images/no-task.png';
class App extends Component {
  constructor() {
    super();
    this.state = {
      toDoItems: [
       
      ],
      inputValue: "",
      showModal: false
    }

    this.onItemClicked = this.onItemClicked.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
  }

  onItemClicked(item) {
    return () => {
      const { toDoItems } = this.state;
      this.setState({
        toDoItems: toDoItems.map(i => 
            i !== item ? {...i} : {...i, isDone: !item.isDone})
        }
      )
    }
  }
  onChange(event) {
    let text = event.target.value;
    text = text.trim();
    if (!text) return;
    this.setState({ inputValue: text });
  }
  onAddItem(event) {
    event.preventDefault();
    this.setState({
      toDoItems: [
        { title: this.state.inputValue, isDone: false },
        ...this.state.toDoItems
      ],
      inputValue: "",
      showModal: false
    })
  }
  onAddTask() {
    this.setState({
      showModal: true
    })
  }
  render() {
    const { toDoItems } = this.state;
    return (
      <div className="App">
          <h1>DAILIST</h1>
          <div className="main-content">
            {
              toDoItems.length === 0 && <div className="no-img">
                <img src={NoImg} alt="no-img" />
              </div>
            }
            
            {
              toDoItems.find(item => !item.isDone) &&
                <div className="upcoming">
                  <h5 className="title-task">UPCOMING</h5>
                  {
                    toDoItems.filter(item => !item.isDone) 
                    .map((item, index) => 
                      <TodoApp index={index} item={item} key={index} onClick={this.onItemClicked(item)} />
                    )
                  }
                </div>
            }
            {
              toDoItems.find(item => item.isDone) && 
                <div className="finished">
                  <h5 className="title-task">FINISHED</h5>
                  {
                    toDoItems.filter(item => item.isDone) 
                    .map((item, index) => 
                      <TodoApp index={index} item={item} key={index} onClick={this.onItemClicked(item)} />
                    )
                  }
                </div>
            }
          </div>
          <div className="footer">
            <span className="add-task" onClick={this.onAddTask}>+</span>
          </div>

          {
            this.state.showModal && <div className="modal">
            <form onSubmit={this.onAddItem}>
              <label>
                New Task
                <input type="text" value={this.state.inputValue} onChange={this.onChange} />
              </label>
              <input className="btn-submit" type="submit" value="Submit" />
            </form>
          </div>
        }
        </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import _ from 'lodash';
import logo from '../logo.svg';
import '../stylesheet/App.css';

import CreateTodo from '../components/create-todo';
import TodosList from '../components/todos-list';

const todos = [
    {
        task: 'make React tutorial',
        isCompleted: false
    },
    {
        task: 'eat dinner',
        isCompleted: true
    }
]

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          todos
      }
  }

  toggleTask(task) {
      const foundTodo = _.find(this.state.todos, todo => todo.task === task);
      foundTodo.isCompleted = !foundTodo.isCompleted;
      this.setState({ todos: this.state.todos });
  }

  createTask(task) {
      this.state.todos.push({
          task,
          isCompleted: false
      });
      this.setState({ todos: this.state.todos });
  }

  saveTask(oldTask, newTask) {
      const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
      foundTodo.task = newTask;
      this.setState({ todos: this.state.todos });
  }

  deleteTask(taskToDelete) {
      _.remove(this.state.todos, todo => todo.task === taskToDelete);
      this.setState({ todos: this.state.todos });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React To Do App</h1>
        </header>
        <div className="App-intro">
          <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
          <TodosList
              todos={this.state.todos}
              toggleTask={this.toggleTask.bind(this)}
              saveTask={this.saveTask.bind(this)}
              deleteTask={this.deleteTask.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default App;

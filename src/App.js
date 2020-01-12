import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserOutput from './User/UserOutput';
import UserInput from './User/UserInput';

// container / stateful / smart component (they use state)
class App extends Component {
  state = {
    persons: [
      { name: 'Sam', age: 35 },
      { name: 'Toto', age: 43 }
    ],
    otherState: 'other value',
    userName: 'Bob'
  }

  switchNameHandler = (newName) => {
    // console.log('was clicked');
    // DONT : this.state.persons[0].name = 'Bob';
    this.setState({
      persons: [
        { name: newName, age: 35 },
        { name: 'Toto', age: 43 }
      ],
    });
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        { name: event.target.value, age: 35 },
        { name: 'Toto', age: 43 }
      ],
    });
  }

  userNameChangeHandler = (event) => {
    this.setState({
      userName: event.target.value
    });
  }

  render() {
    // inline style
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid seagreen',
      padding: '0.3rem',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hello world</h1>
        <p>This is working</p>
        <button
          style={style}
          onClick={() => this.switchNameHandler('John')}>Switch name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, 'Jack')}
        changed={this.nameChangeHandler}>
          My hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age} />

          <UserInput name={this.state.userName}
          changed={this.userNameChangeHandler} />
          <UserOutput userName={this.state.userName} />
          <UserOutput userName="Paul" />
      </div>
    );
    // we have 2 ways to bind argument to switchNameHandler
    // - with anonymous function call
    // - with bind (said to be more optimized)

    // equivalent to :
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'yo world'))
  }
}

export default App;

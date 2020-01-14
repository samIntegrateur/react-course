import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Validation from './Validation/Validation';
import Char from './Char/Char';

// container / stateful / smart component (they use state)
class App extends Component {
  state = {
    persons: [
      { id: "0001", name: 'Sam', age: 35 },
      { id: "0002", name: 'Toto', age: 43 },
      { id: "0003", name: 'Sarah', age: 22 },
    ],
    otherState: 'other value',
    userName: 'Bob',
    showPersons: false,
    inputText: ''
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons.join('')})
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  inputChangeHandler = (event) => {
    const inputText = event.target.value;
    this.setState({inputText: inputText});
  }

  deleteCharHandler = (charIndex) => {
    const chars = [...this.state.inputText];
    chars.splice(charIndex, 1);
    this.setState({inputText: chars.join('')});
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

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangeHandler(event, person.id)}
              name={person.name}
              age={person.age}
              key={person.id} />
          })}
        </div>
      );
    }

    const chars = this.state.inputText.split('').map((char, index) => {
      return <Char
        char={char}
        key={index}
        click={() => this.deleteCharHandler(index)}
      />
    });

    return (
      <div className="App">
        <h1>Hello world</h1>
        <p>This is working</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle persons</button>

          {persons}


        <p>length of following input : {this.state.inputText.length}</p>
        <input type="text" onChange={this.inputChangeHandler} value={this.state.inputText} />
        <Validation inputLength={this.state.inputText.length} />

        {chars}

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

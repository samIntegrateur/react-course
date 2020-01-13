import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  nameChangeHandler = (event, id) => {
    console.log('event', event);
    console.log('id',id);
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    console.log('person', person);

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
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

    return (
      <div className="App">
        <h1>Hello world</h1>
        <p>This is working</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle persons</button>

          {persons}

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

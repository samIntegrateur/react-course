import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {

  const [personsState, setPersonsState] = useState({
    persons: [
      {name: 'Sam', age: 35},
      {name: 'Toto', age: 43}
    ]
  });

  const [otherState, setOtherState] = useState('some other value');

  // nb: unlike class component's state, that use an only state object and automatically merge it when setState
  // useState hook setter (here setPersonsState) doesn't merge what's not specified,
  // but instead we can use as many useState we want (as above)

  const switchNameHandler = () => {
    // console.log('was clicked');
    // DONT : personsState.persons[0].name = 'Bob';
    setPersonsState({
      persons: [
        {name: 'Samuel', age: 35},
        {name: 'Toto', age: 43}
      ],
    });
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <p>This is working</p>
      <button onClick={switchNameHandler}>Switch name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>
        My hobbies: Racing
      </Person>
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
    </div>
  );
  // equivalent to :
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'yo world'))
}

export default app;



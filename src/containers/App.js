import React, { Component } from 'react';

import styled from 'styled-components';
// using css modules (https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/16851076#overview)
// we need to specify in className which class we need from this file
// a unique class will be generated (see modules in webpack config)
import classes from './App.css';
import Person from '../components/Persons/Person/Person';
import Validation from '../components/Validation/Validation';
import Char from '../components/Char/Char';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

// container / stateful / smart component (they use state)
class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  // We could init state in constructor with this.state, but React will do it for us
  state = {
    persons: [
      { id: "0001", name: 'Sam', age: 35 },
      { id: "0002", name: 'Toto', age: 43 },
      { id: "0003", name: 'Sarah', age: 22 },
    ],
    otherState: 'other value',
    userName: 'Bob',
    showPersons: false,
    showCockpit:  true,
    inputText: '',
    changeCounter: 0,
    authentificated: false
  }

  static getDerivedStateFromProps(props, state) {
    // rare: for updating state when props change
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
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

    // Use this function form to be sure that prevState is the actual previous state
    // Use it when you depend on old state
    // cf https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556334#overview
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    });
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

  // Useful scheme about lifecycle creation
  // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556264#overview

  // componentWillMount() {
  //   // old lifcycle hook, deprecated
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    // after this component and his children render
    // we can call http request here,
    // avoid updating state here (triggers rerender, except if it's a then for http request
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate');
  }

  loginHandler = () => {
    this.setState({authentificated: true});
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
        />
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
      // We use the High order component that return a wrapper div with our class
      // <WithClass classes={classes.App}>
      <Aux>

        <button
          onClick={() => {
            this.setState({showCockpit: !this.state.showCockpit});
          }}>Toggle cockpit</button>

        {/*We use a context provider to avoid prop chain, we use it in person without passing through persons */}
        <AuthContext.Provider
          value={{
            authentificated: this.state.authentificated,
            login: this.loginHandler}}>
          {
            this.state.showCockpit ?
              <Cockpit
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
              />
              : null
          }

          {persons}

          <p>length of following input : {this.state.inputText.length}</p>
          <input type="text" onChange={this.inputChangeHandler} value={this.state.inputText} />
          <Validation inputLength={this.state.inputText.length} />

          {chars}
        </AuthContext.Provider>
      </Aux>
      // </WithClass>
    );
  }
}

export default withClass(App, classes.App);

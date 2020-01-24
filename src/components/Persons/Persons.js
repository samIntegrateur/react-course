import React, {PureComponent} from 'react';
import Person from './Person/Person';

// We converted into a state component in order to use lifecycle update hooks
// PureComponent is a component that already implements shouldComponentUpdate with a complete props check
class Persons extends PureComponent {

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // deprecated
    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log('[Persons.js] componentWillReceiveProps', props);
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //
    //     // important to filter changes for performance purpose
    //     // nb: below we compare 2 references (that's not a deep compare),
    //     // it works only because we used immutability (creating a new object on change) in App.js
    //     if (
    //       // If we want to check all properties like this, we can remove shouldComponentUpdate and use a PureComponent
    //       nextProps.persons !== this.props.persons ||
    //       nextProps.changed !== this.props.changed ||
    //       nextProps.clicked !== this.props.clicked
    //     ) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(nextProps, nextState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'snapshot'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate', prevState);
        console.log('snapshot', snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((person, index) => {
            return <Person
              click={() => this.props.clicked(index)}
              changed={(event) => this.props.changed(event, person.id)}
              name={person.name}
              age={person.age}
              key={person.id}
            />
        });
    }
}

export default Persons;

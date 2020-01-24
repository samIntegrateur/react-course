import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context'

const cockpit = (props) => {


  const toggleButtonRef = useRef(null);

  // useContext hook
  const authContext = useContext(AuthContext);

  console.log('authContext', authContext);
  // by default, it executes for every render cycle,
  // so we can use it instead of both componentDidMount and componentDidUpdate (that need to turn into a class)
  // in order to avoid unnecessary updates, we use the second argument to specify dependencies
  // use an empty array to execute an effect only when component is mounted (componentDidMount equivalent)
  useEffect(() => {
    console.log('[Cockpit] useEffect');
    // http request..
    const timer = setTimeout(() => {
      console.log('---------------- saved data to cloud -------------');
    }, 1000);

    // click the button on mount
    toggleButtonRef.current.click();

    // componentWillUnmount equivalent
    return () => {
      // ex of cleanup : we don't want the log if we unmount the component before 1sec
      clearTimeout(timer);
      console.log('[Cockpit] cleanup work in useEffect');
    };
  // }, [props.persons]);
  }, []);

  useEffect(() => {
    console.log('[Cockpit] 2nd useEffect');
    return () => {
      console.log('[Cockpit] cleanup work in 2nd useEffect');
    };
  });

  const assignedClasses = [];
  let btnClass = [];

  if (props.showPersons) {
    btnClass.push(classes.red);
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is working</p>
        <button
          ref={toggleButtonRef}
          className={btnClass.join(' ')}
          onClick={props.clicked}>Toggle persons
        </button>
      {/*<AuthContext.Consumer>*/}
      {/*  {(context =>*/}
      {/*    <button onClick={context.login}>*/}
      {/*      log in*/}
      {/*    </button>*/}
      {/*  )}*/}
      {/*</AuthContext.Consumer>*/}

      {/*simplier context hook way*/}
      <button onClick={authContext.login}>
        login
      </button>
    </div>
  );
};

// optimization for functional component
// it is equivalent for the check we have done in shouldComponentUpdate of Persons.js class
// create snapshot and will only re-render if input change
export default React.memo(cockpit);

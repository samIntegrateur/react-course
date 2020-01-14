import React from 'react';
// import Radium from 'radium';
// import styled from 'styled-components';
import classes from './Person.css';

// a style component, we can use the html tag we want
// at rendering, it creates a regular div and attaches classes
// const StyledDiv = styled.div`
//   width: 60%;
//   margin: 1rem auto;
//   border: 1px solid #eee;
//   box-shadow: 0 2px 3px #ccc;
//   padding: 1rem;
//   text-align: center;
//
//   @media (min-width: 600px) {
//      width: 450px;
//   }
// `;

// Stateless / dumb / presentational component
const person = (props) => {
  // for mq, we need to wrap the app in StyleRoot tag (cf App.js)
  // it creates a class and an important
  // const style = {
  //   '@media (min-width: 600px)': {
  //     width: '450px'
  //   }
  // };

  return (
    // <div className="Person" style={style}>
    // <StyledDiv>
    <div className={classes.Person}>
      <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </div>
    // </StyledDiv>
  )
};

export default person;
// export default Radium(person);

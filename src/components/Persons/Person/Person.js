import React, {Component} from 'react';
// import Radium from 'radium';
// import styled from 'styled-components';
import classes from './Person.css';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

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
class Person extends Component {

  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  // make context accessible
  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log('authentificated ?', this.context.authentificated);
  }

  render() {
    console.log('[Person.js] rendering...');

    // for mq, we need to wrap the app in StyleRoot tag (cf App.js)
    // it creates a class and an important
    // const style = {
    //   '@media (min-width: 600px)': {
    //     width: '450px'
    //   }
    // };

    // testing Error Boundaries: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8094610#overview
    // const rnd = Math.random();
    // if (rnd > 0.7) {
    //   throw new Error('Something wrong')
    // }

    // return (
    //
    //   // <div className="Person" style={style}>
    //   // <StyledDiv>
    //   <div className={classes.Person}>
    //     <p onClick={this.props.click}>this.I'm {this.props.name} and I am {this.props.age} years old!</p>
    //     <p>{this.props.children}</p>
    //     <input type="text" onChange={this.props.changed} value={this.props.name}/>
    //   </div>
    //   // </StyledDiv>
    // )

    // "trick" to render adjacent elements (without a wrapper), using an array
    // return [
    //   <p key="i1" onClick={this.props.click}>this.I'm {this.props.name} and I am {this.props.age} years old!</p>,
    //   <p key="i2">{this.props.children}</p>,
    //   <input key="i3" type="text" onChange={this.props.changed} value={this.props.name}/>
    // ];

    // other "trick" We use adjacent elements with High order component Aux, an empty wrapper which only render children
    return (
      <Aux>
        {/*context usage*/}
        {/*<AuthContext.Consumer>*/}
        {/*  {(context) =>*/}
        {/*   context.authentificated ? <p>Authentificated!</p> : <p>please log in</p>*/}
        {/*  }*/}
        {/*</AuthContext.Consumer>*/}

        {/* In React >=16.8 a simplier way to use context in class components,
         for functional component, see useContext hook in cockpit
        */}
        {this.context.authentificated ? <p>Authentificated!</p> : <p>please log in</p>}

        <p onClick={this.props.click}>this.I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input type="text"
               // 2 ways of creating/using ref in class components, see Cockpit for functional way with useRef hook
              // https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556338#overview
               // ref={(inputEl) => {this.inputElement = inputEl}}
                ref={this.inputElementRef}
               onChange={this.props.changed}
               value={this.props.name}/>
      </Aux>

      // In React >=16.8, this fragment does the same than our Oux
      // <React.Fragment>
      //   <p onClick={this.props.click}>this.I'm {this.props.name} and I am {this.props.age} years old!</p>
      //   <p>{this.props.children}</p>
      //   <input type="text" onChange={this.props.changed} value={this.props.name}/>
      // </React.Fragment>
    )
  }
};

// Use PropTypes package, trigger errors if parent passes the wrong type
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);
// export default Radium(person);

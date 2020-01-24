import React from 'react';

// High order component that return a wrapper div with a class
// const withClass = props => (
//   <div className={props.classes}>
//     {props.children}
//   </div>
// );

// Another form using Aux and wrapping the export (in App.js)
// see https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/13556330#overview
const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      {/*spread the props from the original component*/}
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass;

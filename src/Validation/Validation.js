import React from 'react';

const validation = (props) => {

  let outputValidation = 'Text too short';
  let style = {
    color: 'red'
  };

  if (props.inputLength && props.inputLength > 4) {
    outputValidation = 'Text long enough';
    style = {
      color: 'green'
    };
  }

  return (
    <p style={style}>
      {outputValidation}
    </p>
  )
}

export default validation;

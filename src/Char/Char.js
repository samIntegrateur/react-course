import React from 'react';

const char = (props) => {

  const style = {
    display: 'inline-block',
    padding: '1rem',
    textAlign: 'center',
    margin: '1rem',
    border: '1px solid black'
  };

  return (
    <span style={style} onClick={props.click}>
      {props.char}
    </span>
  )
}

export default char;

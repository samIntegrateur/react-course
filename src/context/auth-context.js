import React from 'react';

const authContext = React.createContext({
  authentificated: false,
  login: () => {}
});

export default authContext;

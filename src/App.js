import React from 'react';
import AppEmpleador from './AppEmpleador';
import AppEmpleado from './AppEmpleado';

function App(props) {
  if (props.userType === 'empleador') {
    return <AppEmpleador />;
  } else {
    return <AppEmpleado />;
  }
}

export default App;

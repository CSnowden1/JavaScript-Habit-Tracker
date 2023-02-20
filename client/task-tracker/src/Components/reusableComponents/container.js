import React from 'react';
import { Container } from 'semantic-ui-react';

function CustomContainer(props) {
  const containerStyles = {
    width: '100%',
    height: '90%',
    backgroundColor: 'rgba(49, 21, 219, .03)',
    borderRadius: '1.2rem',
    marginBottom: '1rem',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column'

  };

  return (
    <div style={containerStyles}>
        {props.title}
    </div>
  );
}

export default CustomContainer;
import React from 'react';
import { Container } from 'semantic-ui-react';

function CustomContainer({ children }) {
  const containerStyles = {
    width: 'auto',
    height: '40rem',
    backgroundColor: 'rgba(49, 21, 219, .03)',
    borderRadius: '1.2rem',
    marginBottom: '1rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column'

  };

  return (
    <Container style={containerStyles}>
      {children}
    </Container>
  );
}

export default CustomContainer;
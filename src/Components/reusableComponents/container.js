import React from 'react';
import { Container } from 'semantic-ui-react';

function CustomContainer({ children, theme }) {
  const containerStyles = {
    width: '100%',
    height: '24rem',
    backgroundColor: theme !== 'light' ? '#101010' : 'rgba(49, 21, 219, .03)',
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
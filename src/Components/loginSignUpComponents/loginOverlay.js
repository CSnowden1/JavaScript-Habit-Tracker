import React, { useState } from 'react';
import { Button, Form, Header, Segment, Modal } from 'semantic-ui-react';

const LoginOverlay = ({ open, close }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = isLogin
      ? { username, password }
      : { firstName, lastName, username, password };
  
    try {
      const response = await fetch(`http://localhost:5000/users/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log('Response data:', data); // Log the response data
    } catch (error) {
      console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
    }
  };

  return (
    <Modal open={open} close style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
      <div onClick={close}>X</div>
      <Segment raised padded textAlign="center">
        <Header as="h2">{isLogin ? 'Login' : 'Sign Up'}</Header>
        <Form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
          {!isLogin && (
            <>
              <Form.Field>
                <label>First Name</label>
                <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
              </Form.Field>
            </>
          )}
          <Form.Field>
            <label>Username</label>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Field>

          <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
        </Form>

        <Button basic compact onClick={toggleMode} style={{ marginTop: '10px' }}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </Button>
      </Segment>
    </Modal>
  );
};

export default LoginOverlay;

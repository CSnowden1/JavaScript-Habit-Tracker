import React, { useState } from 'react';
import { Button, Form, Header, Segment, Modal } from 'semantic-ui-react';
import { useAuth } from '../../Context/authContext';

const LoginOverlay = ({ open, close }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { user, login, logout } = useAuth();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = isLogin
      ? { username, password }
      : { firstName, lastName, username, password };

    try {
      const response = await fetch(`http://localhost:5000/users/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`${isLogin ? 'Login' : 'Registration'} successful`);
        login(data); // Update the global authentication state

        // Close the modal after successful login
        close();
      } else {
        console.error('Authentication failed:', data.message || 'Unknown error');
        // Handle authentication failure, e.g., show an error message
      }
    } catch (error) {
      console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
    }
  };

  if (!open || user) {
    // If the modal is closed or the user is logged in, don't render anything
    return null;
  }

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

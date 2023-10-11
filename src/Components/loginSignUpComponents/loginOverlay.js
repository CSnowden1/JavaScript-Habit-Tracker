import React, { useState } from 'react';
import { Button, Form, Header, Segment, Modal } from 'semantic-ui-react';

const LoginOverlay = ({open, close}) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };


  //const handleOverlayClick = (e) => {
    // Check if the click occurred outside the modal
  //  if (e.target.classList.contains('ui dimmer')) {
      // Call the onClose function to close the modal
  //    close()
  //  }
  //};


  return (
    <Modal open={open} close style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <div  onClick={close}>
            X
        </div>
      <Segment raised padded textAlign="center">
        <Header as="h2">{isLogin ? 'Login' : 'Sign Up'}</Header>
        <Form style={{ width: '100%', height: '100%'}}>
          <Form.Field>
            <label>Username</label>
            <input type="text" placeholder="Username" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </Form.Field>

          {/* Additional fields for sign-up */}
          {!isLogin && (
            <Form.Field>
              <label>Email</label>
              <input type="email" placeholder="Email" />
            </Form.Field>
          )}

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

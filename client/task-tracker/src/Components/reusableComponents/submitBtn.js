import { Button } from 'semantic-ui-react';

function CustomButton(props) {
  const buttonStyles = {
    borderRadius: '1.2rem',
    backgroundColor: 'rgba(49, 21, 219, 0.72)',
    color: "white",
    width: '70%',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  return (
    <Button style={buttonStyles} onClick={props.onClick}>
      {props.title}
    </Button>
  );
}

export default CustomButton;
import { Button } from 'semantic-ui-react';

function CustomButton({title}) {
  const buttonStyles = {
    borderRadius: '1.2rem',
    backgroundColor: 'rgba(49, 21, 219, 0.72)',
    color: "white",
    width: '100%',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    justifySelf: 'center'
  };

  return (
    <Button style={buttonStyles} onClick={props.onClick}>
      {title}
    </Button>
  );
}

export default CustomButton;
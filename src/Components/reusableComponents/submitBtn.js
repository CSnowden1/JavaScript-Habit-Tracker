import { Button } from 'semantic-ui-react';

function CustomButton({title}) {
  const buttonStyles = {
    borderRadius: '1.2rem',
    backgroundColor: 'rgba(49, 21, 219, 0.72)',
    color: "white",
    width: '50%',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    justifySelf: 'center',
    alignSelf: "center"
  };

  return (
    <Button style={buttonStyles}>
      {title}
    </Button>
  );
}

export default CustomButton;
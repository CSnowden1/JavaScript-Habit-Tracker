import { Image, Header } from 'semantic-ui-react';

function calenderBar({ habit}) {

  const flexRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: habit.count >= habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count >= habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count >= habit.goal ? '0.5s' : 'none',
    marginBottom: '.5rem',
    borderRadius: '.3rem',
    borderBottom: 'solid white 2px',
    height: '7rem',
  };

  const dividerStyle = {
    fontSize: '3rem',
    marginBottom: '.5rem'
  };


  const imgStyle = {
    marginRight: '1rem'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  };

  const frequency = habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1);



  return (
    <>
      <div key={habit.id} habit={habit} style={flexRow}>
        <div style={imgStyle}>
          <Image src={habit.image}  />
        </div>
        <div>
          <Header as='h2'>{habit.name}</Header>
        </div>
        <div style={dividerStyle}>|</div>
        <div>
          <Header as='h2' style={headerStyle}>{frequency}</Header>
        </div>
      </div>
    </>
  );
}

export default calenderBar;
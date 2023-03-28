import { Image, Header} from 'semantic-ui-react';

function calenderBar({ habit}) {

  const flexRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    backgroundColor: habit.count === habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count === habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count === habit.goal ? '0.5s' : 'none',
    marginBottom: '.5rem'
  };



  return (
    <>
      <div key={habit.id} habit={habit} style={flexRow}>
          <Image src={habit.image}/>
          <Header as='h2'>{habit.name}</Header>
          <Header as='h2'>{habit.time}</Header>
      </div>
    </>
  );
}

export default calenderBar;
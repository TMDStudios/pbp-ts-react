import NumbersGame from './components/NumbersGame';
import Calculator from './components/Calculator';
import GuessThePhrase from './components/GuessThePhrase';
import UsernameAndPassword from './components/UsernameAndPassword';
import {useState} from 'react';
import Nav from './components/Nav';

function App() {
  const[currentApp, setCurrentApp] = useState<number>(0);

  const renderApp = () => {
    switch (currentApp) {
      case 1:
        return <NumbersGame />;
      case 2:
        return <Calculator />;
      case 3:
        return <GuessThePhrase />;
      case 4:
        return <UsernameAndPassword />;
      default:
        return <p>Select an app to start</p>;
    }
  };

  return (
    <>
      <Nav currentApp={currentApp} setCurrentApp={setCurrentApp} />
      <div className='app'>
        {renderApp()}
      </div>
    </>
  )
}

export default App
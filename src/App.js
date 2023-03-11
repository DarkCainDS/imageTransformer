import './App.css';
import React, {  useState } from 'react'
import { GiSecretDoor } from 'react-icons/gi';
import { IconContext } from "react-icons";
import { SecondLayer } from './components/SecondLayer';



function App() {

  const [userInput, setUserInput] = useState('');
  const [clanName, setClanName] = useState('');
  const [firstLayer, setFirstLayer] = useState(true);
  const [secondLayer, setSecondLayer] = useState(false);


  

  const handleButtonClick = () => {
    const name = window.prompt('What is your name???:');
    setUserInput(name);
    const clan = window.prompt('what is your clan??:');
    setClanName(clan);

};


  return (
    <div className="App">
      {firstLayer && (
        <div>
        <div className='icon-firstLayer'>
            <IconContext.Provider value={{ color: '#FBD26E', className: "global-class-name", size: '100px' }}>
                <button className='login-button' onClick={handleButtonClick}><GiSecretDoor /></button>
            </IconContext.Provider>
        </div>


        <p>Nombre del usuario: {userInput}</p>
        <p>Clan del usuario: {clanName}</p>
        
       <button onClick={() => (setFirstLayer(false), setSecondLayer(true))} className='redirection-button'></button>
      

    </div>
      )}
      {secondLayer && (
        <SecondLayer name1 = {userInput}  clan1 = {clanName}></SecondLayer>
      )}

        

    </div>
  );
}

export default App;


import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [containNumber, setContainNumbers] = useState(false);
  const [containCharacter, setContainCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const PasswordGenerator = useCallback(() => {
    let CharactersToAdd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(containCharacter)CharactersToAdd += "!@#$%^&*()_+-=~`";
    if(containNumber)CharactersToAdd += "1234567890";

    let generatedPassword = ""
    for(let i = 0; i < length; i++)
    {
      let index = Math.floor(Math.random() * CharactersToAdd.length + 1);
      generatedPassword += CharactersToAdd[index];
    }
    setPassword(generatedPassword);
    // return generatedPassword
  }, [length, containCharacter, containNumber, setPassword])
  useEffect(() => {
    PasswordGenerator()
  },[length, containCharacter, containNumber])
  function CopyToClipBoard()
  {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password);
  }
  return (
    <>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div>
        <div>
          <input 
          type='text'
          placeholder='password'
          value={password}  
          ref = {passwordRef}
          readOnly          
          />
          <button 
          onClick={CopyToClipBoard}
          className='bg-white text-black-400 rounded-md px-2 m-2'>Copy</button>
          <label className='text-white m-2'>length : {length}</label>
          <input
          type='range'
          min={5}
          max={20}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          />
          
          <label className='text-white m-2'>add special characters</label>
          <input 
          type='checkbox'
          className='m-2'
          defaultChecked = {containCharacter}
          onChange={() => {setContainCharacter((f) => !f)}}
          />
          <label className='text-white m-2'>add numbers</label>
          <input 
          type='checkbox'
          className='m-2'
          defaultChecked = {containNumber}
          onChange={() => {setContainNumbers((f) => !f)}}
          />
          
        </div>
      </div>
    </>
  );
}

export default App;

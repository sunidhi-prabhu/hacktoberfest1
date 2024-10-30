import { useState, useCallback, useEffect, useRef } from 'react';
import './index.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    if (str.length > 0) {
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-gray-900 text-orange-400 rounded-lg shadow-lg">
      <h1 className="text-center text-white text-2xl font-semibold mb-6">Password Generator</h1>
      
      
      <div className="flex shadow-md mb-4 rounded overflow-hidden">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="flex-grow outline-none p-2 bg-gray-800 text-white text-lg"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 text-white px-4 py-2 transition hover:bg-blue-700 focus:outline-none"
        >
          Copy
        </button>
      </div>

    
      <div className="mb-6">
        <label className="text-sm font-medium text-white block mb-2">
          Length: <span className="font-bold text-lg">{length}</span>
        </label>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="w-full accent-blue-600 cursor-pointer"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

   
      <div className="flex gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="cursor-pointer accent-blue-600"
          />
          <label htmlFor="numberInput" className="ml-2 text-white">Include Numbers</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
            className="cursor-pointer accent-blue-600"
          />
          <label htmlFor="characterInput" className="ml-2 text-white">Include Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect,useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null);

  const generatePassword = (len, hasNumber, hasSymbol) => {
    let newPass = "";

    const num = hasNumber ? "0123456789" : "";
    const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbol = hasSymbol ? "!@#$%^&*()_+" : "";

    const passArray = num + char + symbol;
    for (let i = 0; i < len; i++) {
      newPass += passArray.charAt(Math.floor(Math.random() * passArray.length));
    }

    setPassword(newPass);
  };
  useEffect(() => {
    generatePassword(length, hasNumber, hasSymbol);
  }, [length, hasNumber, hasSymbol]);

  const handleCopy = () => {
      passwordRef.current.select();
      navigator.clipboard.writeText(passwordRef.current.value);
    
  };

  return (
    <div className="container w-2/4 m-auto mt-10">
      <h1 className="text-center text-2xl font-bold mb-5">Password Generator</h1>
      <div className="flex flex-col">
        <input className="border-2 border-gray-400 px-4 py-2 mb-3 overflow-hidden rounded"
        ref={passwordRef} 
        type="text"
        value={password}
        readOnly
        />
        <button
          onClick={handleCopy}
          className="bg-blue-500 hover:bg
          -blue-700 text-white font-bold py-2 px-4 rounded self-start"
        >
          Copy Password
        </button>
      </div>
      <div className="flex flex-col ">
        <div className="flex items-center justify-start my-3">
          <label className="text-gray-800 mr-3">Length</label>
          <input
            type="range"
            value={length}
            min="8"
            max="20"
            onChange={(e) => setLength(e.target.value)}
            className="border border-gray-300 rounded-md px-1 py-1  outline-none"
          />
          <span className="text-gray-800 ml-3">{length}</span>


          


        </div>
        <div className="flex items-center  my-3">
          <label className="text-gray-800 mr-3">Number</label>
          <input
            type="checkbox"
            checked={hasNumber}
            onChange={(e) => setHasNumber(e.target.checked)}
            className="form-checkbox ml-2"
          />
        </div>

        <div className="my-3 flex items-center">
          <label className="text-gray-800 mr-3">Symbol</label>
          <input
            type="checkbox"
            checked={hasSymbol}
            onChange={(e) => setHasSymbol(e.target.checked)}
            className="form-checkbox ml-2 "
          />
        </div>
      </div>
      <div className="text-center mt-5">
        <button
          onClick={() => generatePassword(length, hasNumber, hasSymbol)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

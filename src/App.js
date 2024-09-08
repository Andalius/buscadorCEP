import React from 'react';
import { FiSearch } from "react-icons/fi";
import './styles.css';
import {   useState } from 'react';
import api from './services/api';

function App() {

  

  const [Input, setInput] = useState('')
  const [cep, setCep] = useState({});

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  async function handleSearch(){
    if(Input === ''){
      alert("Preencha o campo CEP")
      return;
    }

    try{
      const response = await api.get(`${Input}/json`)
      console.log(response)
      setCep(response.data)
      setInput("");
    }catch{ 
      setInput("");

     
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      
      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={Input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={50} color="white"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2> CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {Object.keys(cep).complemento === "" &&
            <span>Complemento: {cep.complemento}</span>
          }
          
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          
        </main>
      )}


    </div>
  );
}

export default App;

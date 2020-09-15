//just run the backend with yarn dev
//run the front-end (these) yarn start or yarn test

import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    // Adicionar um repositório a sua API: Deve ser capaz de adicionar um novo item na sua API através de 
    //um botão com o texto Adicionar e, após a criação, deve ser capaz de exibir o nome dele após o 
    //cadastro.
    
    const today = new Date();
    const response = await api.post('repositories', {
      "title": 'Repository ' + today.toLocaleString() +'.' + today.getMilliseconds(),
      "techs": ["Front-end with ReactJS", "back-end with Node.JS"],
      "url": "https://github.com.br"
    });

    const repository = response.data;
    console.log(repository);
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    // SPecs: Remover um repositório da sua API: Para cada item da sua lista, deve possuir um botão com o 
    //texto Remover que, ao clicar, irá chamar uma função para remover esse item da lista do seu frontend 
    //e da sua API.

    console.log(id);
    api.delete('repositories/'+id);
    //OBS.: It is not possible to use repository.splice because it returns a new vector, which invalidates 
    //the immutability, but filter will work properly.
    const newRepositories = repositories.filter(repository => repository.id!== id);
    setRepositories(newRepositories); 
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
           </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

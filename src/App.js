import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
      console.log(response.data)
    })


  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/Alquipo/GoStack12-desafio-01',
      techs: ['nodejs', 'react']
    })

    const repository = response.data


    //atualiza o estado da aplicação
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(updatedRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => {
          return (

            <li key={repository.id}>

              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>

            </li>

          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

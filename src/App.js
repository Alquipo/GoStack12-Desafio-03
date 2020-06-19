import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })


  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: 'https://github.com/Alquipo/GoStack12-desafio-03',
      techs: ['Node JS', 'React JS', 'React Native']
    })

    const repository = response.data

    //atualiza o estado da aplicação
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(updatedRepositories)
  }

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`)
    const repositoryLike = response.data

    const repositoriesUpdate = repositories.map(repository => {
      if (repository.id === id) {
        return repositoryLike;
      } else {
        return repository;
      }
    });

    setRepositories(repositoriesUpdate)
  }

  return (
    <div className='container'>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (

            <li className='repositoryContainer' key={repository.id}>

              <div className='test'>
                <h2>{repository.title}</h2>

                <ul>
                  {repository.techs.map(tech => <li key={tech}>{tech}</li>)}
                </ul>

              </div>

              <div>

                <a target="__blank" href={repository.url}>{repository.url}</a>

                <p><span role="img" aria-label="like" >👍</span> {repository.likes}</p>

              </div>

              <div>
                <button style={{ background: '#17a2b8' }} className='buttonLike' onClick={() => handleLikeRepository(repository.id)}>
                  Curtir
                </button>

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>


              </div>

            </li>


          )
        })}
      </ul>


      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

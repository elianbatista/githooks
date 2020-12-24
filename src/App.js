import React, { useState, useEffect } from 'react'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/elianbatista/repos')
    const data = await response.json()

    setRepositories(data)
  }, [])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: true } : repo
    })

    setRepositories(newRepositories)
  }

  return (
    <>
      <ul>
        {
          repositories.map(repo => (
            <li key="{repo.id}">
              {repo.name}
              {repo.favorite && <span>(Favorito)</span>}
              <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
            </li>
          )
        )}
      </ul>
    </>
  );
}

export default App;

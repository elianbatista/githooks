import React, { useState, useEffect } from 'react'

function App() {
  const [repositories, setRepositories] = useState([])
  const [location, setLocation] = useState({})

  useEffect(() => {
    navigator.geolocation.watchPosition(handlePositionReceived)
  }, [])

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords

    setLocation({  
      latitude,
      longitude
    })
  }

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/elianbatista/repos')
    const data = await response.json()

    setRepositories(data)
  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritos` 
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositories)
  }

  return (
    <>
      Latitude: { location.latitude } <br />
      Longitude: { location.longitude }
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

import React, { useEffect, useState } from 'react'
import Search from './components/search'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");


  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS)


      if (!response.ok) {
        throw new Error('failed to get movies');
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`)
      setErrorMessage('Error fetching movies. Please Try Again.');
    }
  }

  useEffect( () => {
    fetchMovies();
  }, [])

  return (
    <main className="bg-[url('./background.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="pattern"/>
      
      <div className='wrapper'>
        <header>
          
          <img src="./recommendations.png" alt="Hero Banner"/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll enjoy Without The Hastle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='all-movies'>
            <h2>All Movies</h2>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </section>
      </div>
    </main>
  )
}

export default App
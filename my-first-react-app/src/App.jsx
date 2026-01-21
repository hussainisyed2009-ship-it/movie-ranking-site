import React, { useState } from 'react'
import Search from './components/search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="bg-[url('./background.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="pattern"/>

      <div className='wrapper'>
        <header>
          
          <img src="./recommendations.png" alt="Hero Banner"/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll enjoy Without The Hastle</h1>
          </header>

          <p>Search</p>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  )
}

export default App
import { useState } from 'react'
import './App.css'
// use... means hook
const Card = ({ title }) => {
    const [hasLiked, setHasLiked] = useState(false);
// variable name, then set variable name
 return (
  <div className='card'>
    <h2>{title}</h2>


    <button onClick={()=>setHasLiked(!hasLiked)}>
      { hasLiked ? '❤️' : '🤍' }
    </button>
  </div>
  )
}

const App = () => {

  return (
    <div className="card-container">
      <Card title="Star Wars" />
      <Card title="Avatar" />
      <Card title="Home" />
    </div>
  )
}

export default App

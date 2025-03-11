import { useEffect, useState } from 'react'
import CharacterList from './components/CharacterList'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/characters')
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  return (
    <>
     <Router>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <section id="charactersList">
          <CharacterList characters={characters} />
        </section>
      </div>
    </Router>
    </>
  )
}

export default App

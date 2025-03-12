import { useState } from 'react'
import CharacterList from './components/CharacterList'
import CharacterDetails from './components/CharacterDetails'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([])


  return (
    <>
     <Router>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <section id="charactersList">
        
        </section>
        <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App

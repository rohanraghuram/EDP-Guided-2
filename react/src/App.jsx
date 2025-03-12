import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import Home from "./components/Home";
import CharacterDetails from "./components/CharacterDetails";


function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SW_API_URL}/characters`);
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response);
        } catch (error) {
            console.error('Error fetching chars:', error);
        }
    };

    fetchData();
}, []);


  return (
    <Router>
      <div>
        <h1>Star Wars Universe Lookup</h1>
      </div>
      < section id="charactersList">
        <Routes>
          <Route exact path="/" element={<Home data={data} />} />
          <Route path="/characters/:id" element ={<CharacterDetails />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App

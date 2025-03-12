import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

const CharacterDetails = () => {
    const [character, setCharacter] = useState({});
    const [planet, setPlanet] = useState([]);
    const [films, setFilms] = useState([]);
    let params = useParams();

    useEffect(() => {
      const fetchChar = async () => {
        const charData = await fetch(`${import.meta.env.VITE_SW_API_URL}/characters/${params.id}`);
        const jsonChar = await charData.json();
        setCharacter(jsonChar);
      };
      fetchChar();
      }, []);

      useEffect(() => {
        const fetchFilms = async () => {
          const filmData = await fetch(`${import.meta.env.VITE_SW_API_URL}/characters/${params.id}/films`);
          const jsonFilms = await filmData.json();
          setFilms(jsonFilms);
        };
        fetchFilms();
        }, []);

        useEffect(() => {
          const fetchPlanet = async () => {
            const planetData = await fetch(`${import.meta.env.VITE_SW_API_URL}/characters/${params.id}/planet`);
            const jsonPlanet = await planetData.json();
            setPlanet(jsonPlanet);
          };
          fetchPlanet();
          }, []);

    return (
      <>
        <main>
          <h1 id="name"> {character.name}</h1>
          <section id="generalInfo">
            <p>Height: <span id="height"></span> {character.height} cm</p>
            <p>Mass: <span id="mass"></span> {character.mass}</p>
            <p>Born: <span id="birth_year"></span> {character.birth_year} </p>
          </section>
          <section id="planets">
            {console.log(planet)}
            <h2>Homeworld</h2>
            <ul>
              {planet.map((planet) => (<li key = {planet.id}><Link to = {`/planet/${planet.id}`}>{planet.name}</Link></li>))}
            </ul>
          </section>
          <section id="films">
            <h2>Films appeared in</h2>
            <ul>
              {films.map((film) => (<li key = {film.id}><Link to = {`/film/${film.id}`}>{film.title}</Link></li>))}
            </ul>
          </section>
        </main>
      </>

    );
};

export default CharacterDetails;

/* 
useEffect(() => {
        fetch(`http://localhost:3000/characters/${charID}`)
            .then(response => response.json())
            .then(data => setCharacters(data))
            .catch(error => console.error('Error fetching characters:', error));
    }, [charID]);

useEffect(() => {
      const fetchData = async () => {
        try {
          const [response1, response2] = await Promise.all([
            fetch(`http://localhost:3000/characters/${charID}`),
            fetch(`http://localhost:3000/characters/${charID}/planet`)
          ]);
  
          if (!response1.ok || !response2.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const json1 = await response1.json();
          const json2 = await response2.json();
  
          setCharacter(json1);
          setPlanet(json2);
          
        } catch (err) {
        }
      };
  
      fetchData();
    }, []);
*/
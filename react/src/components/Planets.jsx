import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';


const Planets = () => {
    const [planet, setPlanet] = useState({});
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    let params = useParams();

    useEffect(() => {
        const fetchPlanet = async () => {
          const planetData = await fetch(`${import.meta.env.VITE_SW_API_URL}/planets/${params.id}`);
          const jsonPlanet = await planetData.json();
          setPlanet(jsonPlanet);
        };
        fetchPlanet();
        }, []);


    useEffect(() => {
        const fetchChars = async () => {
            const charsData = await fetch(`${import.meta.env.VITE_SW_API_URL}/planets/${params.id}/characters`);
            const jsonChars = await charsData.json();
            setCharacters(jsonChars);
        };
        fetchChars();
        }, []);

    useEffect(() => {
        const fetchFilms = async () => {
            const filmData = await fetch(`${import.meta.env.VITE_SW_API_URL}/planets/${params.id}/films`);
            const jsonFilms = await filmData.json();
            setFilms(jsonFilms);
        };
        fetchFilms();
        }, []);
    

    return (
        <>
        <main>
          <h1 id="name"> {planet.name} </h1>
          <section id="generalInfo">
            <p><span id ="climate">Climate: </span> {planet.climate} </p>
            <p><span id = "terrain">Terrain: </span> {planet.terrain} </p>
            <p><span id = "population">Population: </span> {planet.population} </p>
          </section>
          <section id="characters">
            <h2>Characters Born Here </h2>
            <ul>
              {characters.map((char) => (<li key = {char.id}><Link to = {`/characters/${char.id}`}>{char.name}</Link></li>))}
            </ul>
          </section>
          <section id="films">
            <h2>Films Appeared in </h2>
            <ul>
              {films.map((film) => (<li key = {film.id}><Link to = {`/films/${film.id}`}>{film.title}</Link></li>))}
            </ul>
          </section>
        </main>
      </>
    );
};

export default Planets;

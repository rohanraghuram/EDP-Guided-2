import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

const Films = () => {
    const [film, setFilm] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    let params = useParams();

    useEffect(() => {
        const fetchFilm = async () => {
          const filmData = await fetch(`${import.meta.env.VITE_SW_API_URL}/films/${params.id}`);
          const jsonFilm = await filmData.json();
          setFilm(jsonFilm);
        };
        fetchFilm();
        }, []);
  

    useEffect(() => {
        const fetchChars = async () => {
            const charsData = await fetch(`${import.meta.env.VITE_SW_API_URL}/films/${params.id}/characters`);
            const jsonChars = await charsData.json();
            setCharacters(jsonChars);
        };
        fetchChars();
        }, []);

    useEffect(() => {
        const fetchPlanets = async () => {
            const planetsData = await fetch(`${import.meta.env.VITE_SW_API_URL}/films/${params.id}/planets`);
            const jsonPla= await planetsData.json();
            setPlanets(jsonPla);
        };
        fetchPlanets();
        }, []);
    
    
    return (
        <>
        <main>
          <h1 id="name"> {film.title}</h1>
          <section id="generalInfo">
            <p><span id="opening"></span> {film.opening_crawl} </p>
            <p>Director: <span id="director"></span> {film.director} </p>
            <p>Release Date: <span id="release"></span> {film.release_date} </p>
          </section>
          <section id="characters">
            <h2>Appearing Characters </h2>
            <ul>
              {characters.map((char) => (<li key = {char.id}><Link to = {`/characters/${char.id}`}>{char.name}</Link></li>))}
            </ul>
          </section>
          <section id="planets">
            <h2>Appearing Planets </h2>
            <ul>
              {planets.map((planet) => (<li key = {planet.id}><Link to = {`/planets/${planet.id}`}>{planet.name}</Link></li>))}
            </ul>
          </section>
        </main>
      </>
    );
};

export default Films;
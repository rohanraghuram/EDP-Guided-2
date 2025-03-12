import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Planets = () => {
    const [planet, setPlanet] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/planets/${id}`)
            .then(response => response.json())
            .then(data => {
                setPlanet(data);
                fetchCharacters(data.characters);
                fetchFilms(data.films);
            })
            .catch(error => console.error('Error fetching planets:', error));
    }, [id]);

    const fetchCharacters = async (characterIds) => {
        try {
            const characterPromises = characterIds.map(async (characterId) => {
                const response = await fetch(`http://localhost:3000/characters/${characterId}`);
                return response.json();
            });
            
            const characterData = await Promise.all(characterPromises);
            setCharacters(characterData);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const fetchFilms = async (filmIds) => {
        try {
            const filmPromises = filmIds.map(async (filmId) => {
                const response = await fetch(`http://localhost:3000/films/${filmId}`);
                return response.json();
            });
            
            const filmData = await Promise.all(filmPromises);
            setFilms(filmData);
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    };

    return (
        <div id="name">
            <h1>{planet.name}</h1>
            <div id="generalInfo">
                <p><span>Climate:</span> {planet.climate} cm</p>
                <p><span>Diameter:</span> {planet.diameter} kg</p>
                <p><span>Population:</span> {planet.population}</p>
            </div>
            <div id="characters">
                <p><span>Characters Born Here:</span></p>
                <ul>
                    {characters.map(character => (
                        <li key={character.id}>{character.name}</li>
                    ))}
                </ul>
            </div>
            <div id="films">
                <p><span>Films Apperared In:</span></p>
                <ul>
                    {films.map(film => (
                        <li key={film.id}>{film.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Planets;
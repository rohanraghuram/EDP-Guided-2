import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Films = () => {
    const [film, setFilm] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Fetch film details
        fetch(`http://localhost:3000/films/${id}`)
            .then(response => response.json())
            .then(data => {
                setFilm(data);
                fetchCharacters(data.characters);
                fetchPlanets(data.planets);
            })
            .catch(error => console.error('Error fetching films:', error));
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
    
    const fetchPlanets = async (planetIds) => {
        try {
            const planetPromises = planetIds.map(async (planetId) => {
                const response = await fetch(`http://localhost:3000/planets/${planetId}`);
                return response.json();
            });
            
            const planetData = await Promise.all(planetPromises);
            setPlanets(planetData);
        } catch (error) {
            console.error('Error fetching planets:', error);
        }
    };
    return (
        <div id="filmName">
            <h1>{film.name}</h1>
            <div id="generalInfo">
                <p><span>Released:</span> {film.releaseDate}</p>
                <p><span>Director:</span> {film.director}</p>
                <p><span>Episode:</span> {film.episode}</p>
            </div>
            <div id="characters">
                <p><span>Characters:</span></p>
                <ul>
                    {characters.map(character => (
                        <li key={character.id}>{character.name}</li>
                    ))}
                </ul>
            </div>
            <div id="planets">
                <p><span>Planets:</span></p>
                <ul>
                    {planets.map(planet => (
                        <li key={planet.id}>{planet.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Films;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetails = () => {
    const [character, setCharacters] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/characters/${id}`)
            .then(response => response.json())
            .then(data => setCharacters(data))
            .catch(error => console.error('Error fetching characters:', error));
    }, [id]);

    return (
        <div id="characterDetails">
        <h1>{character.name}</h1>
        <div id="generalInfo">
          <p><span>Height:</span> {character.height}</p>
          <p><span>Mass:</span> {character.mass}</p>
          <p><span>Born:</span> {character.birth_year}</p>
        </div>
        <div id="planets">
          <p><span>Homeworld:</span> {character.homeworld}</p>
        </div>
        <div id="films">
          <p><span>Height:</span> {character.films}</p>
        </div>
        <div id="vehicleSection">
          <p><span>Vehicle:</span> {character.vehicle_class}</p>
          
        </div>
      </div>

    );
};

export default CharacterDetails;
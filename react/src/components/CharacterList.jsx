import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/characters')
            .then((response) => response.json())
            .then((data) => setCharacters(data))
            .catch((error) => console.error('Error fetching characters:', error));
    }, []);

    return (
        <div id="charactersList">
        <h1>Characters</h1>
        {characters.length > 0 ? (
            characters.map(character => (
                <div key={character.id} 
                    onClick={() => navigate(`/characters/${character.id}`)}
                    style={{ cursor: 'pointer' }}
                     >
                    <h3>{character.name}</h3>
                </div>
            ))
        ) : null}
    </div>

    );
};

export default CharacterList;
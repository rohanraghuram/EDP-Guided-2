import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterList = (props) => {
    let navigate = useNavigate();
    return (
        <div>
            <h3>{props.data.name}</h3>
        </div>
    );
};

export default CharacterList;
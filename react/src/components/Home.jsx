import { useNavigate } from "react-router";


const Home = (props) => {
    const navigate = useNavigate();
   
    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <h1>Characters</h1>
            {
                props.data.map((character) => (
                    <div key={character.id} 
                        onClick={() => navigate(`/characters/${character.id}`)}
                        style={{ cursor: 'pointer' }}>
                    <h3>{character.name}</h3>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;
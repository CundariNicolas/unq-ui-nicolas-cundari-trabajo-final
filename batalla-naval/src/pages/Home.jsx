import '../css/Home.css'
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../components/UserContext.jsx";
const Home = () => {
    const navigate = useNavigate()
    const {setUsername} = useContext(UserContext)
    const handleNuevaPartida = () =>{
        navigate('/preparacion')
    }
    return (
        <>
            <div className="container contenedor-home">
            <input className="form-control form-control-lg" type="text" placeholder="Nombre de jugador"
                   aria-label=".form-control-lg example" onChange={text => setUsername(text.target.value)}/>
            <button type="button" className="btn btn-primary btn-lg" onClick={handleNuevaPartida}>Nueva partida</button>
            </div>
        </>
    )
}

export default Home
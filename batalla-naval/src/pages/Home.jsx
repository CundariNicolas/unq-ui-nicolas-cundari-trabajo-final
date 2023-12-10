import '../css/Home.css'
import {useNavigate} from "react-router-dom";
const Home = () => {
    const navigate = useNavigate()
    const handleNuevaPartida = () =>{
        navigate('/preparacion')
    }
    return (
        <>
            <div className="container contenedor-home">
            <input className="form-control form-control-lg" type="text" placeholder="Nombre de jugador"
                   aria-label=".form-control-lg example"/>
            <button type="button" className="btn btn-primary btn-lg" onClick={handleNuevaPartida}>Nueva partida</button>
            </div>
        </>
    )
}

export default Home
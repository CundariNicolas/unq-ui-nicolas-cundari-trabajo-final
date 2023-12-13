import TableroFinal from "../components/TableroFinal.jsx";
import TableroCPU from "../components/TableroCPU.jsx";
import {useContext} from "react";
import UserContext from "../components/UserContext.jsx";
import {useNavigate} from "react-router-dom";

const Partida = () => {
    const {username, ganaste, terminoPartida, setGanaste, setTerminoPartida, mensaje} = useContext(UserContext)
    const navigate = useNavigate()
    const handleVolverAJugar = () => {

        setTerminoPartida(false)
        setGanaste(false)
        navigate('/preparacion')

    }


    return(
        <>
            {ganaste ? <h1> ¡Ganaste!</h1> : <h1>Partida en curso</h1>}
            {!ganaste && terminoPartida ? <h1>¡Perdiste!</h1> : <></>}
            <div style={terminoPartida ? {display: 'flex', pointerEvents: 'none'} : {display: 'flex'} }>
                <TableroFinal username={username}/>
                <TableroCPU />
            </div>
            <div className="mensajes-conteiner container">
            <div style={{display : 'flex'}}>
            <div style={{width: '50px', height: '50px', backgroundColor : 'lightblue', color: 'black'}}> Agua </div>
            <div style={{width: '50px', height: '50px', backgroundColor : 'red', color: 'black'}}> Golpe </div>
            </div>
            {mensaje ? <p style={{color: 'red', fontWeight: 'bold'}}>Ya elegiste esa casilla para atacar anteriormente</p> : <></>}
            {terminoPartida ? <button type="button" className="btn btn-primary btn-lg" onClick={handleVolverAJugar}>Volver a jugar</button> : <></>}
            </div>
        </>
    )

}

export default Partida
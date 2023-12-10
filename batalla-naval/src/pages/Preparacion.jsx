import Tablero from "../components/Tablero.jsx";
import {useState} from "react";

const Preparacion = () => {
    const [dosPiezas, setDosPiezas] = useState([])

    return(
        <>
            <Tablero dosPiezas={dosPiezas} setDosPiezas={setDosPiezas} />
        </>
    )

}

export default Preparacion
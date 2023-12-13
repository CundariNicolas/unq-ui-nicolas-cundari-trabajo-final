import {createContext, useMemo, useState} from "react";

const UserContext = createContext()

const  UserProvider = ({children}) => {
    const [username, setUsername] = useState('')
    const [terminoPartida, setTerminoPartida] = useState(false)
    const [ganaste, setGanaste] = useState(false)
    const [posicionBarcos, setPosicionBarcos] = useState([])
    const [celdasColoreadas, setCeldasColoreadas] = useState([])
    const [mensaje, setMensaje] = useState(false)
    const [puntaje, setPuntaje] = useState(0)
    const [puntajeCpu, setPuntajeCpu] = useState(0)


    const realizarTiroContraUsuario = (col, row, nuevaColor)  =>{
        if (posicionBarcos.some(barco => barco.col === col && barco.row === row)) {

            nuevaColor[row][col] = 'red'
            setPosicionBarcos(current => current.filter(barco => {
                return barco.col !== col || barco.row !== row
            }))
            verificarEstadoJuego()
        } else {
            nuevaColor[row][col] = 'lightblue'
            setPosicionBarcos(current => current.filter(barco => {
                return barco.col !== col || barco.row !== row
            }))
        }
    }

    const disparoDeCpu = (row, col) => {
        const nuevaColor = celdasColoreadas
        realizarTiroContraUsuario(col, row, nuevaColor);
        setCeldasColoreadas(nuevaColor)
    }

    function verificarEstadoJuego() {
        if(posicionBarcos.length === 1){
            setGanaste(false)
            setTerminoPartida(true)
            setPuntajeCpu(puntajeCpu + 1)
        }
    }

    const contextValue = useMemo(() =>({
            username,
            setUsername,
            terminoPartida,
            ganaste,
            setTerminoPartida,
            setGanaste,
            posicionBarcos,
            setPosicionBarcos,
            disparoDeCpu,
            celdasColoreadas,
            setCeldasColoreadas,
            mensaje,
            setMensaje,
            puntaje,
            setPuntaje,
            puntajeCpu,
            setPuntajeCpu
        }),
        [username, setUsername,terminoPartida, ganaste, posicionBarcos, celdasColoreadas, disparoDeCpu, mensaje, puntaje, setPuntaje, puntajeCpu, setPuntajeCpu])



    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext
export { UserProvider }
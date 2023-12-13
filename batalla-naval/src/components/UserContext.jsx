import {createContext, useMemo, useState} from "react";

const UserContext = createContext()

const  UserProvider = ({children}) => {
    const [username, setUsername] = useState('')
    const [terminoPartida, setTerminoPartida] = useState(false)
    const [ganaste, setGanaste] = useState(false)
    const [posicionBarcos, setPosicionBarcos] = useState([])
    const [celdasColoreadas, setCeldasColoreadas] = useState([])
    const [mensaje, setMensaje] = useState(false)


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
        console.log(celdasColoreadas)
    }

    function verificarEstadoJuego() {
        if(posicionBarcos.length === 1){
            setGanaste(false)
            setTerminoPartida(true)
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
            setMensaje
        }),
        [username, setUsername,terminoPartida, ganaste, posicionBarcos, celdasColoreadas, disparoDeCpu, mensaje])



    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext
export { UserProvider }
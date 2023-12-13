import {useContext, useEffect, useState} from 'react';
import UserContext from "./UserContext.jsx";
const TableroCPU = () => {
    const filas = 10;
    const columnas = 10;
    const [longitudBarco, setLongitudBarco] = useState(2);
    const initialCeldas = Array(filas).fill(null).map(() => Array(columnas).fill(''));
    const [celdas, setCeldas] = useState(initialCeldas);
    const [celdasOcupadas, setCeldasOcupadas] = useState([]);
    const [disparosHechos, setDisparosHechos] = useState([])
    const [tiroHechoContraUsuario, setTiroHechoContraUsuario] = useState([])
    const {setGanaste, setTerminoPartida, disparoDeCpu, setMensaje, puntajeCpu, setPuntaje, puntaje} = useContext(UserContext)

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    function existePosicionOcupada(barcos, rowRandom, colRandom, longitud, direction) {
        let resultado = false
        if(direction === 0) {
            for (let i = 0; i < longitud; i++) {
                resultado = resultado || barcos.some(barco => barco.row === rowRandom && barco.col === colRandom + i)
            }
        }
        else{
            for (let i = 0; i < longitud; i++) {
                resultado = resultado || barcos.some(barco => barco.row === rowRandom + i && barco.col === colRandom)
            }
        }
        return resultado;
    }

    function getBarcosRandom(nuevasCeldas, celdasOcupadasTemp) {
        const barcos = [];

        for (let longitud = 2; longitud <= 5; longitud++) {
            let rowRandom = getRandomInt(9)
            let colRandom = getRandomInt(9)
            let direction = getRandomInt(2)
            console.log(barcos)
            console.log(barcos.some(barco => barco.row === rowRandom && barco.col === colRandom))
            while(rowRandom + longitud > 9 || colRandom + longitud > 9 || existePosicionOcupada(barcos, rowRandom, colRandom, longitud, direction)){
                rowRandom = getRandomInt(9)
                colRandom = getRandomInt(9)
            }

            if (direction === 0) {
                for (let i = 0; i < longitud; i++) {
                    nuevasCeldas[rowRandom][colRandom + i] = '';
                    barcos.push({row: rowRandom, col: colRandom + i})
                    celdasOcupadasTemp.push({row: rowRandom, col: colRandom + i})
                }
            } else {
                for (let i = 0; i < longitud; i++) {
                    nuevasCeldas[rowRandom + i][colRandom] = '';
                    barcos.push({row: rowRandom + i, col: colRandom})
                    celdasOcupadasTemp.push({row: rowRandom + i, col: colRandom})
                }
            }
        }
    }

    const handleDropCelda = () => {
        const celdasOcupadasTemp = []
        const nuevasCeldas = [...celdas.map((row) => [...row])];
        getBarcosRandom(nuevasCeldas, celdasOcupadasTemp);
        setCeldas(nuevasCeldas);
        setCeldasOcupadas(celdasOcupadasTemp);
        setLongitudBarco(longitudBarco + 1)
    };

    useEffect(() => {
        handleDropCelda()

    }, []);

    function verificarEstadoJuego() {
        if(celdasOcupadas.length === 1){
            setGanaste(true)
            setTerminoPartida(true)
            setPuntaje(puntaje + 1)
        }
    }

    const turnoCpu = () => {
        let tiroRow = getRandomInt(10)
        let tiroCol = getRandomInt(10)
        let intentos = 0
        while(tiroHechoContraUsuario.some(tiro => tiro.row === tiroRow && tiro.col === tiroCol)){
            tiroRow = getRandomInt(10)
            tiroCol = getRandomInt(10)
            if(intentos === 300){
                break
            }
            intentos++
        }
        setTiroHechoContraUsuario(prev =>[ ...prev, {row : tiroRow, col: tiroCol}])
        disparoDeCpu(tiroRow, tiroCol)

    }

    const realizarDisparo = (col, row, nuevasCeldas) => {
        if (celdasOcupadas.some(barco => barco.col === col && barco.row === row)) {
            setDisparosHechos(disparos => [...disparos, {row: row, col: col}])
            nuevasCeldas[row][col] = 'red';
            setCeldas(nuevasCeldas);
            setCeldasOcupadas(current => current.filter(barco => {
                return barco.col !== col || barco.row !== row
            }))
            verificarEstadoJuego();
        } else {
            setDisparosHechos(disparos => [...disparos, {row: row, col: col}])
            nuevasCeldas[row][col] = 'lightblue';
            setCeldas(nuevasCeldas);
        }
        turnoCpu
    }

    function esDisparoNoHecho(row, col) {
        return !disparosHechos.some(disparo => disparo.row === row && disparo.col === col);
    }

    const handleDisparo = (row, col) => {
        const nuevasCeldas = [...celdas.map(row => [...row])];
        if(esDisparoNoHecho(row, col)) {
            console.log(celdasOcupadas)
            realizarDisparo(col, row, nuevasCeldas);
            turnoCpu()
            setMensaje(false)
        }
        else{
            setMensaje(true)
        }

    }
    return (

        <div className="conteiner-tablero">

            <h2>Puntaje de CPU: {puntajeCpu}</h2>
            <table
                style={{
                    borderSpacing: 0,
                    border: '1px solid black',
                    width: '70%',
                    height: '70%',
                    backgroundColor: 'white'
                }}
            >
                <tbody>
                {celdas.map((fila, rowIndex) => (
                    <tr key={rowIndex}>
                        {fila.map((colorDeFondo, colIndex) => (
                            <td
                                key={colIndex}
                                style={{
                                    border: '1px solid black',
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: colorDeFondo
                                }}
                                onClick={() => handleDisparo(rowIndex, colIndex)}
                            >
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>



        </div>

    );
};

export default TableroCPU;
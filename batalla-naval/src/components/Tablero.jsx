import  { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate} from "react-router-dom";
import "../css/tablero.css"
import {TbHandClick} from "react-icons/tb";

const Barco2Celdas = ({direction}) => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 2 },
    });

    const largo = () => {
        return direction ? '100px' : ' 50px'
    }
    const ancho = () => {
        return direction ? '50px' : '100px'
    }

    return (
        <div
            ref={(node) => drag(node)}
            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: largo(),
                height: ancho(),
                backgroundColor: 'grey',
                cursor: 'move',
            }}
        ></div>
    );
};

const Barco3Celdas = ({direction}) => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 3 },
    });

    const largo = () => {
        return direction ? '150px' : ' 50px'
    }
    const ancho = () => {
        return direction ? '50px' : '150px'
    }

    return (
        <div
            ref={(node) => drag(node)}
            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: largo(),
                height: ancho(),
                backgroundColor: 'grey',
                cursor: 'move',
            }}
        ></div>
    );
};

const Barco4Celdas = ({direction}) => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 4 },
    });

    const largo = () => {
        return direction ? '200px' : ' 50px'
    }
    const ancho = () => {
        return direction ? '50px' : '200px'
    }

    return (
        <div
            ref={(node) => drag(node)}
            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: largo(),
                height: ancho(),
                backgroundColor: 'grey',
                cursor: 'move',
            }}
        ></div>
    );
};

const Barco5Celdas = ({direction}) => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 5 },
    });

    const largo = () => {
        return direction ? '250px' : ' 50px'
    }
    const ancho = () => {
        return direction ? '50px' : '250px'
    }

    return (
        <div
            ref={(node) => drag(node)}

            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: largo(),
                height: ancho(),
                backgroundColor: 'grey',
                cursor: 'move',
            }}
        ></div>
    );
};

const Celda = ({ rowIndex, colIndex, colorDeFondo, onDropCelda }) => {
    const [, drop] = useDrop({
        accept: 'BARCO',
        drop: (item) => onDropCelda(rowIndex, colIndex, item.longitud),
    });

    return (
        <td
            ref={(node) => drop(node)}
            style={{
                border: '1px solid black',
                width: '50px',
                height: '50px',
                backgroundColor: colorDeFondo,
            }}
        ></td>
    );
};

const Tablero = () => {
    const navigate = useNavigate()
    const [longitudBarco, setLongitudBarco] = useState(2);
    const filas = 10;
    const columnas = 10;
    const initialCeldas = Array(filas).fill(null).map(() => Array(columnas).fill(''));
    const [celdas, setCeldas] = useState(initialCeldas);
    const [celdasOcupadas, setCeldasOcupadas] = useState([]);
    const [direction, setDirection] = useState(false)
    const [mensaje, setMensaje] = useState(false)
    const noTraspasaBordeEnDireccion = (dropRow, dropCol, longitud, direction) =>{
        return direction ?  dropCol + longitud < 11 : dropRow + longitud < 11
    }
    const noChocaConBarco = (dropRow, dropCol, longitud) => {
        const celdasQueVaOcupar = []
        for (let i = 0; i < longitud; i++) {
           direction ? celdasQueVaOcupar.push({row: dropRow, col: dropCol + i}) : celdasQueVaOcupar.push({row: dropRow  + i, col: dropCol})
        }
        return !celdasOcupadas.some(celda => celdasQueVaOcupar.some(ocup => ocup.row === celda.row && ocup.col === celda.col))
    }
    const handleDropCelda = (dropRow, dropCol, longitud) => {
        if(noTraspasaBordeEnDireccion(dropRow, dropCol, longitud, direction) && noChocaConBarco(dropRow, dropCol, longitud)) {
            const nuevasCeldas = [...celdas.map((row) => [...row])]
            for (let i = 0; i < longitud; i++) {
                pintarCeldas(nuevasCeldas, dropRow, dropCol, i)
            }
            const nuevasCeldasOcupadas = [...celdasOcupadas]
            for (let i = 0; i < longitud; i++) {
                agregarALasCeldasOcupadas(nuevasCeldasOcupadas, i, dropRow, dropCol)
            }
            setCeldas(nuevasCeldas);
            setCeldasOcupadas(nuevasCeldasOcupadas);
            setLongitudBarco(longitudBarco + 1)
            setMensaje(false)
        }
    };
    const pintarCeldas = (nuevasCeldas, dropRow, dropCol, i) => {
        let color = '#000020'
        direction ? nuevasCeldas[dropRow][dropCol + i] = color : nuevasCeldas[dropRow + i][dropCol] = color
    }
    const agregarALasCeldasOcupadas = (celdasOcupadas, i, dropRow, dropCol) => {
        direction ? celdasOcupadas.push({row: dropRow, col: dropCol + i}) : celdasOcupadas.push({row: dropRow  + i, col: dropCol})
    }
    const renderBarquito = () => {
        switch (longitudBarco) {
            case 2:
                return <Barco2Celdas direction={direction}/>;
            case 3:
                return <Barco3Celdas direction={direction}/>;
            case 4:
                return <Barco4Celdas direction={direction}/>;
            case 5:
                return <Barco5Celdas direction={direction}/>;
            default:
                return <></>;
        }
    };
    const handleAJugar = () => {
        if(longitudBarco > 5) {
            navigate('/partida', {state: {celdas: celdas, celdasOcupadas: celdasOcupadas}})
            setMensaje(false)
        }
        else{
            setMensaje(true)
        }
    }
    const handleRotar = () =>{
        let dir = !direction
        setDirection(dir)
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="conteiner-tablero">
                    <div>
                        {longitudBarco < 6 ? <h3>Barco de {longitudBarco} casillas.</h3> : <></>}
                        {longitudBarco < 6 ? <p>Arrastra <TbHandClick /></p> : <></>}
                        <div className="container-barcos">
                        {renderBarquito()}
                        </div>
                        <div className="boton-rotar">
                        {longitudBarco < 6 ? <button type="button" className="btn btn-primary btn-lg button-style" onClick={handleRotar}>Rotar barco</button> :
                        <p>Acomodados todos los barcos.</p>
                        }
                        </div>
                    </div>

                <table
                    style={{
                        marginBottom: '25px',
                        borderSpacing: 0,
                        border: '1px solid black',
                        width: '80%',
                        height: '80%',
                    }}
                >
                    <tbody>
                    {celdas.map((fila, rowIndex) => (
                        <tr key={rowIndex}>
                            {fila.map((colorDeFondo, colIndex) => (
                                <Celda
                                    key={colIndex}
                                    colorDeFondo={colorDeFondo}
                                    onDropCelda={(dropRow, dropCol) =>
                                        handleDropCelda(dropRow, dropCol, longitudBarco)
                                    }
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                />
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </DndProvider>
            <div className="mensajes-conteiner">
            {mensaje ? <p style={{color: 'red'}}>Te falta acomodar algunos barcos</p> : <></>}
            <button type="button" className="btn btn-primary btn-lg button-style" onClick={handleAJugar}>A jugar</button>
            </div>
        </>
    );
};

export default Tablero;

import { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Barco2Celdas = () => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 2 },
    });

    return (
        <div
            ref={(node) => drag(node)}
            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: '100px',
                height: '50px',
                backgroundColor: 'grey',
                cursor: 'move',
            }}
        ></div>
    );
};

const Barco3Celdas = () => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 3 },
    });

    return (
        <div
            ref={(node) => drag(node)}
            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: '150px',
                height: '50px',
                backgroundColor: 'grey',
                cursor: 'move',
            }}
        ></div>
    );
};

const Barco4Celdas = () => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 4 },
    });

    return (
        <div
            ref={(node) => drag(node)}
            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: '200px',
                height: '50px',
                backgroundColor: 'grey',
                cursor: 'move',
            }}
        ></div>
    );
};

const Barco5Celdas = () => {
    const [, drag] = useDrag({
        type: 'BARCO',
        item: { longitud: 5 },
    });

    return (
        <div
            ref={(node) => drag(node)}
            style={{
                marginBottom: '25px',
                border: '1px solid black',
                width: '250px',
                height: '50px',
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
    const [longitudBarco, setLongitudBarco] = useState(2);
    const filas = 10;
    const columnas = 10;

    const initialCeldas = Array(filas).fill(null).map(() => Array(columnas).fill(''));
    const [celdas, setCeldas] = useState(initialCeldas);
    const [celdasOcupadas, setCeldasOcupadas] = useState([]);

    const handleDropCelda = (dropRow, dropCol, longitud) => {
        const nuevasCeldas = [...celdas.map((row) => [...row])];

        for (let i = 0; i < longitud; i++) {
            nuevasCeldas[dropRow][dropCol + i] = 'lightblue';
        }

        setCeldas(nuevasCeldas);

        const nuevasCeldasOcupadas = [...celdasOcupadas];
        for (let i = 0; i < longitud; i++) {
            nuevasCeldasOcupadas.push({ row: dropRow, col: dropCol + i });
        }
        setCeldasOcupadas(nuevasCeldasOcupadas);
        setLongitudBarco(longitudBarco+1)
    };

    const renderBarquito = () => {
        switch (longitudBarco) {
            case 2:
                return <Barco2Celdas/>;
            case 3:
                return <Barco3Celdas/>;
            case 4:
                return <Barco4Celdas/>;
            case 5:
                return <Barco5Celdas/>;
            default:
                return <></>;
        }
    };



    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {renderBarquito()}
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

            <div>
                <h2>Celdas Ocupadas</h2>
                <ul>
                    {celdasOcupadas.map((celda, index) => (
                        <li key={index}>{`(${celda.row}, ${celda.col})`}</li>
                    ))}
                </ul>
            </div>
        </DndProvider>
    );
};

export default Tablero;

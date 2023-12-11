import React from 'react';
import {useLocation} from "react-router-dom";

const TableroFinal = ({username}) => {
    const location = useLocation();

    return (
        <div>
            <h2>Tablero de {username}</h2>
            <table
                style={{
                    borderSpacing: 0,
                    border: '1px solid black',
                    width: '70%',
                    height: '70%',
                    backgroundColor: 'grey'
                }}
            >
                <tbody>
                {location.state.celdas.map((fila, rowIndex) => (
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
                            >
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <h3>Celdas Ocupadas</h3>
                <ul>
                    {location.state.celdasOcupadas.map((celda, index) => (
                        <li key={index}>{(`${celda.row}, ${celda.col}`)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TableroFinal;
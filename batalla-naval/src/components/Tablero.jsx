import { useState } from 'react';

const Tablero = () => {
    const [celdas, setCeldas] = useState(Array(10).fill(Array(10).fill('')));
    const [barquitoAzul, setBarquitoAzul] = useState([])

    const handleClick = (row, col) => {
        const nuevasCeldas = [...celdas.map(row => [...row])];
        nuevasCeldas[row][col] = 'lightblue';
        setCeldas(nuevasCeldas);
        setBarquitoAzul([row ,col])
        console.log(barquitoAzul)
    };

    return (
        <table style={{ marginBottom: '25px', borderSpacing: 0, border: '1px solid black', width: '100%' }}>
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
                                backgroundColor: colorDeFondo,
                            }}
                            onClick={() => handleClick(rowIndex, colIndex)}
                        ></td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Tablero;

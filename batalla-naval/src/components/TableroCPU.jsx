import {useEffect, useState} from 'react';
const TableroCPU = () => {

    const filas = 10;
    const columnas = 10;

    const [longitudBarco, setLongitudBarco] = useState(2);
    const initialCeldas = Array(filas).fill(null).map(() => Array(columnas).fill(''));
    const [celdas, setCeldas] = useState(initialCeldas);
    const [celdasOcupadas, setCeldasOcupadas] = useState([]);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    function getBarcosRandom() {
        const lista = [];

        for (let longitud = 2; longitud <= 5; longitud++) {
            let rowRandom = getRandomInt(9)
            let colRandom = getRandomInt(9)
            let direction = getRandomInt(2)
            console.log(direction)
            while(rowRandom + longitud > 9 || colRandom + longitud > 9){
                rowRandom = getRandomInt(9)
                colRandom = getRandomInt(9)
            }
            lista.push({row: rowRandom, col: colRandom, longitud: longitud, direction: direction})
        }
        return lista;
    }

    const handleDropCelda = () => {
        const celdasOcupadasTemp = []
        const nuevasCeldas = [...celdas.map((row) => [...row])];
        const listaBarcos = getBarcosRandom();
        listaBarcos.forEach(barco => {
            if(barco.direction === 0 ){
                for (let i =0; i < barco.longitud; i++) {

                    nuevasCeldas[barco.row][barco.col + i] = 'lightblue';
                    celdasOcupadasTemp.push({row: barco.row, col: barco.col+i})
                }}
            else{
                for (let i =0; i < barco.longitud; i++) {

                    nuevasCeldas[barco.row + i][barco.col] = 'lightblue';
                    celdasOcupadasTemp.push({row: barco.row + i, col: barco.col})
                }
            }


        })

        setCeldas(nuevasCeldas);
        setCeldasOcupadas(celdasOcupadasTemp);
        setLongitudBarco(longitudBarco + 1)
    };

    useEffect(() => {
        handleDropCelda(getRandomInt(9), getRandomInt(9), 5)

    }, []);
    return (
        <div className="container">
            <h2>Tablero CPU</h2>
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
                            >
                                {/* Puedes personalizar el contenido de las celdas */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <h2>Celdas Ocupadas</h2>
                <ul>
                    {celdasOcupadas.map((celda, index) => (
                        <li key={index}>{(`${celda.row}, ${celda.col}`)}</li>
                    ))}
                </ul>
            </div>

        </div>

    );
};

export default TableroCPU;
import {useContext, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import UserContext from "./UserContext.jsx";

const TableroFinal = ({username}) => {
    const location = useLocation();
    const {setPosicionBarcos,  celdasColoreadas, setCeldasColoreadas, puntaje} = useContext(UserContext)

    useEffect(() => {
        setPosicionBarcos(location.state.celdasOcupadas)
        setCeldasColoreadas(location.state.celdas)
    }, []);
    return (

        <div className="conteiner-tablero">
            <h2>Puntaje de {username}: {puntaje}</h2>


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
                {celdasColoreadas.map((fila, rowIndex) => (
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
        </div>
    );
};

export default TableroFinal;
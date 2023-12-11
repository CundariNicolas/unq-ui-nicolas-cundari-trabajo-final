import TableroFinal from "../components/TableroFinal.jsx";
import TableroCPU from "../components/TableroCPU.jsx";
import {useContext} from "react";
import UserContext from "../components/UserContext.jsx";

const Partida = () => {
    const {username} = useContext(UserContext)

    return(
        <>
            <div style={{display: 'flex'}}>
                <TableroFinal username={username}/>
                <TableroCPU />
            </div>
        </>
    )

}

export default Partida
import {createContext, useCallback, useMemo, useState} from "react";

const UserContext = createContext()

const  UserProvider = ({children}) => {
    const [username, setUsername] = useState('')
    const [puntos, setPuntos] = useState(0)

    const contextValue = useMemo(() =>({
            username,
            setUsername,
            puntos,
            setPuntos
        }),
        [username, setUsername, puntos, setPuntos])



    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext
export { UserProvider }
import { createContext, useState } from "react"


export const mainContext = createContext()

function Context({children}){
    const [user,setUser] = useState()
    const [isLoggedIn,setLoggedIn] = useState(false)
    const [token,setToken] = useState()

    const globalVariables = {
        user:user,
        setUser:setUser,
        isLoggedIn:isLoggedIn,
        setLoggedIn:setLoggedIn,
        token:token,
        setToken:setToken
    }

    return (
        <mainContext.Provider value={globalVariables}>
          {children}
        </mainContext.Provider>
    )

}

export default Context
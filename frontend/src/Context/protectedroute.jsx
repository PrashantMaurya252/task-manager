import { createContext, useContext } from "react"
import { mainContext } from "./context"


export const routeContext = createContext()

function ProtectedRoutes({children}){
    const {token} = useContext(mainContext)


    return (
        <routeContext.Provider>
            {children}
        </routeContext.Provider>
    )
}

export default ProtectedRoutes
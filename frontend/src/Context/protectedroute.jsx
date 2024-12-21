import { createContext, useContext, useEffect } from "react"
import { mainContext } from "./context"
import { useLocation, useNavigation } from "react-router-dom"


export const routeContext = createContext()

function ProtectedRoutes({children}){
    // const {token} = useContext(mainContext)
    const token = localStorage.getItem('token')
    // const navigate = useNavigation()
    
    let location = useLocation()
    let pathname = location.pathname
    useEffect(()=>{
        if(token){
            if(pathname === '/'){
                navigate('/task-list')
            }
        }else{
            if(pathname === '/*'){
                navigate('/')
            }
        }
    },[pathname])


    return (
        <routeContext.Provider value={token}>
            {children}
        </routeContext.Provider>
    )
}

export default ProtectedRoutes
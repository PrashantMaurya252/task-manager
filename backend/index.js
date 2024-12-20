import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectToDB from './utils/connectToDB.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

const port = 5000 

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))

const corsoptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsoptions))
app.use("/users",userRoutes)

app.listen(port,()=>{
    connectToDB()
    console.log(`server is running at port ${port}`)
})
import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectToDB from './utils/connectToDB.js'
import userRoutes from './routes/userRoutes.js'
import path from 'path'



dotenv.config()

const app = express()

const port = process.env.PORT || 4000
const __dirname = path.resolve()
console.log(__dirname)

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))

const corsoptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsoptions))
app.use("/users",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})

app.listen(port,()=>{
    connectToDB()
    console.log(`server is running at port ${port}`)
})
import mongoose from "mongoose"

 const connectToDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected successfully')
    } catch (error) {
        console.log(error,"mongoDB connection error")
    }
}

export default connectToDB
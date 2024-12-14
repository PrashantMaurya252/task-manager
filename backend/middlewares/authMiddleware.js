import jwt from 'jsonwebtoken'

export const authMiddleware = async(req,resizeBy,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success:false
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({
                message:'Invalid Token',
                success:false
            })
        }

        req.id=decode.userId
        next()
    } catch (error) {
        console.log(error,"middleware error")
    }
}
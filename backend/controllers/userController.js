import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { Task } from "../models/taskModel.js";

export const register=async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:'Something is missing',
                status:false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:'User already exist with this email',
                status:false
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        await User.create({
            username,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            message:'User created successfully',
            status:true
        })
    } catch (error) {
        console.log(error,'register api error')
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!(email || password)){
            return res.status(401).json({
                message:'Something is missing',
                status:false
            })
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message:'User credentials are wrong',
                status:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch){
            return res.status(401).json({
                message:'User credentials are wrong',
                status:false
            })
        }

        user = {
            _id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:'20d'
        });

        return res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge:10*24*60*60*1000,
        }).json({
            message:'User Logged in',
            user,
            success:true
        });

    } catch (error) {
        console.log(error,'login error')
    }
}

export const logout = async(_,res)=>{
    try {
        return res.cookie('token',"",{maxAge:0}).json({
            message:'Logged out successfully',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUserTasks = async (req,res)=>{
    try {
        const userId = req.id
        const user = await User.findById(userId).populate({path:'tasks',createdAt:-1})
        return res.status(200).json({userTasks:user.tasks,success:true})
    } catch (error) {
        console.log(error,"getUserTasks error")
    }
}

export const addTask = async(req,res)=>{
    try {
        const userId = req.id
        const {title,startTime,endTime,status,priority} = req.body

        if(!(title || startTime || endTime || status || priority)){
            return res.status(401).json({
                message:'Please fills all the fields',
                status:false
            })
        }

        const task = await Task.create({
            title,
            starttime:startTime.starttime,startdate:startTime.startdate,
            endtime:endTime.endtime,enddate:endTime.enddate,
            status,
            priority
        })

        const user = await User.findById(userId);
        if(user){
            user.tasks.push(task._id);
            await user.save();
        }

        return res.status(201).json({message:"New Task Added",task,success:true})
    } catch (error) {
        console.log(error)
    }
}

export const editTask = async(req,res)=>{
    try {
        
        const taskId = req.params.id
        const {title,startTime,endTime,status,priority} = req.body

        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({
                message:'Task not found ',
                status:false
            })
        }

        if (title) task.title = title
        if (startTime) {
            if (startTime.startdate) task.startTime.startdate = startTime.startdate;
            if (startTime.starttime) task.startTime.starttime = startTime.starttime;
          }
      
          if (endTime) {
            if (endTime.enddate) task.endTime.enddate = endTime.enddate;
            if (endTime.endtime) task.endTime.endtime = endTime.endtime;
          }
        if (status) task.status = status
        if (priority) task.priority = priority

        await task.save()

        return res.status(200).json({
            message:'Task Updated Successfully',
            status:true,
            task
        })
    } catch (error) {
        console.log(error, "Edit Task Api Error")
    }
}

export const deleteTask = async(req,res)=>{
    try {
        const taskId=req.params.id
        const userId = req.id

        const task = await Task.findById(taskId)
        if(!task){
            return res.status(400).json({
                message:'Task not found',
                status:false
            })
        }
        if(task.author.toString() !== userId){
            return res.status(401).json({
                message:'Unauthorized',
                status:false
            })
        }

        await Task.findByIdAndDelete(taskId)
      const user = await User.findById(userId)
      user.tasks = user.tasks.filter((id)=>id.toString() !== postId);
      await user.save();

      return res.status(200).json({
        message:'Post Deleted Successfully',
        status:true
      })
    } catch (error) {
        console.log(error,'delete task api error')
    }
}

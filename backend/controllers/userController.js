import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { Task } from "../models/taskModel.js";
import mongoose from "mongoose";

export const register=async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:'Something is missing',
                success:false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:'User already exist with this email',
                success:false
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
            success:true
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
                success:false
            })
        }
        let user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message:'User credentials are wrong',
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch){
            return res.status(401).json({
                message:'User credentials are wrong',
                success:false
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
            data:{user,token},
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
        const {priority,status,sortBy} = req.query
        const filter = {author:userId}
        if(priority) filter.priority = priority;
        if(status) filter.status = status;
        

        const sortOptions = {}
        if(sortBy === 'startTime') sortOptions.startTime = 1
        if(sortBy === 'endTime') sortOptions.endTime = 1

        const tasks = await Task.find(filter).sort(sortOptions)
        // const user = await User.findById(userId).populate({path:'tasks',createdAt:-1})
        // if(!user){
        //     return res.status(404).json({message:"User Not found",status:false})
        // }
        return res.status(200).json({
            success:true,
            message:"All Task are available",
            tasks
        })
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
                success:false
            })
        }

        if(priority < 1 || priority > 5){
            return res.status(401).json({
                message:'Priority must be between 1 and 5',
                success:fasle
            })
        }

        if(startTime > endTime){
            return res.status(401).json({
                success:false,
                mesasge:'Start Time must be greater then End Time'
            })
        }

        const task = await Task.create({
            author:userId,
            title,
            startTime,
            endTime,
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
                success:false
            })
        }

        if (title) task.title = title
        if (startTime) {
           task.startTime = startTime
          }
      
          if (endTime) {
            task.endTime = endTime
          }
        if (status) task.status = status
        if (priority) task.priority = priority

        await task.save()

        return res.status(200).json({
            message:'Task Updated Successfully',
            success:true,
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
                success:false
            })
        }
        if(task.author.toString() !== userId){
            return res.status(401).json({
                message:'Unauthorized',
                success:false
            })
        }

        await Task.findByIdAndDelete(taskId)
      const user = await User.findById(userId)
      user.tasks = user.tasks.filter((id)=>id.toString() !== taskId);
      await user.save();

      return res.status(200).json({
        message:'Task Deleted Successfully',
        success:true
      })
    } catch (error) {
        console.log(error,'delete task api error')
    }
}

export const getTaskStatistics = async(req,res)=>{
    try {
        const userId = req.id
        
        const tasks = await Task.find({author:userId})
        

        const totalCount = tasks.length
        const pendingTaskCount=tasks?.filter((item)=>item.status === 'Pending').length
        const completedTasks = tasks.filter((task)=>task.status === 'Finished')
        const pendingTasks = tasks.filter((task)=>task.status === 'Pending')

        

        const completedPercentage = ((completedTasks.length/totalCount)*100).toFixed(2)
        const pendingPercentage = ((pendingTasks.length/totalCount)*100).toFixed(2)
        

        const timeStats = pendingTasks.reduce((acc,task)=>{
            const lapsed = task.getTimeLapsed()
            
            const balance = task.getBalanceEstimateTime();
            
            if(task.priority){
                acc.lapsed[task.priority] = (acc.lapsed[task.priority] || 0) + (lapsed || 0)
                acc.estimated[task.priority] = (acc.estimated[task.priority] || 0) + (balance || 0)
            }
            return acc;
        },{lapsed:{},estimated:{}})

        const totalCompletionTime = completedTasks.reduce(
            (acc,task)=>acc+(task.getCompletionTime() || 0),0
        )

        const averageCompletionTime = (totalCompletionTime/completedTasks.length).toFixed(2)
        res.status(200).json({
            success:true,
            data:[
                {Total_Task:totalCount},
                {Completed_Percentage:`${completedPercentage}%`},
                {Pending_Percentage:`${pendingPercentage}%`},
                // {timeStats},
                {Average_Completion_Time:`${averageCompletionTime} hours`},
                {Total_Pending_Task:pendingTaskCount}
            ]
           
        })
    } catch (error) {
        console.log(error,"error")
        res.status(401).json({
            success:false,
            message:"something wrong with dashboard api"
        })
    }
}

export const dashboardTable =async(req,res)=>{
    try {
        const userId = new mongoose.Types.ObjectId(req.id)
        console.log(typeof(userId))
        const task1 = await Task.aggregate([
            {
                $match:{"author":userId}
            }
        ])
        console.log(task1)
        const task = await Task.aggregate([
            {
                $match:{
                    "author":userId
                }
            },
            {
                $group:{
                    _id:"$priority",
                    totalPendingTasks:{
                        $sum:{$cond:[{$eq:["$status","Pending"]},1,0]}
                    },
                    totalTimeLapsed:{
                        $sum:{
                            $cond:[
                                {$eq:["$status","Pending"]},{$divide:[{$subtract:[new Date(),{$toDate:"$startTime"}]},3600000]},0
                            ]
                        }
                    },
                    totalBalanceEstimateTime:{
                        $sum:{
                            $cond:[
                                {$and:[
                                    {$eq:["$status","Pending"]},
                                    {$gt:["endTime",new Date()]}
                                ]},
                                {$divide:[{$subtract:[{$toDate:"$endTime"},new Date()]},3600000]},0
                            ],
                        }
                    }
                }
            },
            {$sort:{_id:1},},
        ])

        if(!task){
            return res.status(404).json({success:false,message:"No Task Found"})
        }

        console.log(task,"task")

        const taskTable = task.map((item)=>({
            priority: item._id,
        totalPendingTasks: item.totalPendingTasks,
        totalTimeLapsed: item.totalTimeLapsed.toFixed(2),
        totalBalanceEstimateTime: item.totalBalanceEstimateTime.toFixed(2),
        }))


        return res.status(200).json({success:true,message:"dashboard table",data:taskTable})
    } catch (error) {
        console.log(error,"dashboard table error")
        return res.status(500).json({success:false,message:"could not get dashboard table"})
    }
}

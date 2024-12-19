import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      enum:[1,2,3,4,5],
      required: true,
    },
    startTime: {
      type:Date,
      required:true   
    },
    endTime: {
      type:Date,
      required:true
    },
    status: {
      type: String,
      enum: ["Pending", "Finished"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

taskSchema.methods.getCompletionTime=function(){
  if(this.status === 'Finished' && this.endTime){
    return (this.endTime - this.startTime)/3600000
  }
  return null
}

taskSchema.methods.getTimeLapsed = function(){
  if(this.status === 'Pending'){
    const now = new Date();
    return (now - this.startTime)/3600000
  }
  return null
}

taskSchema.methods.getBalanceEstimateTime = function(){
  if(this.status === 'Pending' && this.endTime){
    const now = new Date();
    const remainingTime = (this.endTime - now)/3600000
    return remainingTime > 0 ? remainingTime : 0
  }
  return null
}

export const Task = mongoose.model("Task", taskSchema);

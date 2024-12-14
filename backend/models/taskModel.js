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
      startdate:{
        type: String,
        required: true,
      },
      starttime:{
        type:String,
        required:true
      }
     
    },
    endTime: {
      enddate:{
        type: String,
        required: true,
      },
      endtime:{
        type:String,
        required:true
      }
    },
    status: {
      type: String,
      enum: ["Pending", "Finished"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);

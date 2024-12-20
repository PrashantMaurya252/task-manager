import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import axios from "axios";

const Modal = ({ modalType, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const addTaskschema = Yup.object().shape({
    title: Yup.string().required().label("Title"),
    status: Yup.string().required().label("Status"),
    priority: Yup.number().required().label("Priority"),
    starttime: Yup.string().required().label("starttime"),
    startdate: Yup.string().required().label("startdate"),
    endtime: Yup.string().required().label("endtime"),
    enddate: Yup.string().required().label("enddate"),
  });

  const editTaskschema = Yup.object().shape({
    title: Yup.string().required().label("Title"),
    status: Yup.string().required().label("Status"),
    priority: Yup.number().required().label("Priority"),
    starttime: Yup.string().required().label("starttime"),
    startdate: Yup.string().required().label("startdate"),
    endtime: Yup.string().required().label("endtime"),
    enddate: Yup.string().required().label("enddate"),
  });
  console.log(endTime, "endTime");

  const schema = modalType === "addTask" ? addTaskschema : editTaskschema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const addTask =async(data)=>{
    try {
      const res = await axios()
    } catch (error) {
      
    }
  }
  return (
    <div>
      <Dialog open={open} setOpen={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>
              {(modalType === "addTask" ? "Add New Task" : "Edit Task")}
            </DialogTitle>
            {(modalType === "addTask" ? "" : "Task ID :2")}
          </DialogHeader>
          <div>
            <div>
              <Controller
                control={control}
                name="title"
                render={({ field }) => {
                  return (
                    <input
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="title"
                      className="w-full border-[1px] px-2 py-1 rounded-sm"
                    />
                  );
                }}
              />
            </div>
            <div className="my-2 flex justify-between items-center">
              <Controller
                control={control}
                name="priority"
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1" className="cursor-pointer">
                          1
                        </SelectItem>
                        <SelectItem value="2" className="cursor-pointer">
                          2
                        </SelectItem>
                        <SelectItem value="3" className="cursor-pointer">
                          3
                        </SelectItem>
                        <SelectItem value="4" className="cursor-pointer">
                          4
                        </SelectItem>
                        <SelectItem value="5" className="cursor-pointer">
                          5
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              <Controller
                control={control}
                name="status"
                render={({ field }) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  );
                }}
              />
            </div>

            <div className="my-2 flex justify-between items-center">
              <Controller
                control={control}
                name="startdate"
                render={({ field }) => {
                  return (
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="border-[1px] px-2 py-1 rounded-sm"
                    />
                  );
                }}
              />
            </div>

            <div className="my-2 flex justify-between items-center">
              <Controller
                control={control}
                name="enddate"
                render={({ field }) => {
                  return (
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="border-[1px] px-2 py-1 rounded-sm"
                    />
                  );
                }}
              />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;

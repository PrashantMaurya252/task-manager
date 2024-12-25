import React, { useEffect } from "react";
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

import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { formatInputDateTime } from "@/lib/helper";

const Modal = ({ modalType, open, setOpen, callback, selectedTask }) => {
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  

  const addTaskschema = Yup.object().shape({
    title: Yup.string().required().label("Title"),
    status: Yup.string().label("Status"),
    priority: Yup.number().required().label("Priority"),

    startTime: Yup.string().label("startTime"),

    endTime: Yup.string().label("endTime"),
  });

  const editTaskschema = Yup.object().shape({
    title: Yup.string().required().label("Title"),
    status: Yup.string().label("Status"),
    priority: Yup.number().required().label("Priority"),

    startTime: Yup.string().label("startdate"),

    endTime: Yup.string().label("enddate"),
  });

  const schema = modalType === "addTask" ? addTaskschema : editTaskschema;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const validateTimes = () => {
    const currentDateTime = new Date().toISOString(); // Get current time in ISO format
    let validationErrors = {};

    if (!startTime || startTime < currentDateTime) {
      validationErrors.startTime =
        "Start Time should be equal to or greater than the current time.";
      toast.error(
        "Start Time should be equal to or greater than the current time."
      );
    }

    if (!endTime || endTime <= startTime) {
      validationErrors.endTime = "End Time should be greater than Start Time.";
      toast.error("End Time should be greater than Start Time.");
    }

    return Object.keys(validationErrors).length === 0; // No errors means valid
  };
  useEffect(() => {
    if (modalType === "editTask" && selectedTask) {
      setValue("title", selectedTask?.title);
      setValue("status", selectedTask?.status);
      setValue("priority", String(selectedTask?.priority));
      setStartTime(formatInputDateTime(selectedTask?.startTime));
      setEndTime(formatInputDateTime(selectedTask?.endTime));
    } else {
      setValue("title", "");
      // setValue("status", "");
      setValue("priority", "");
      // setValue("startTime","");
      // setValue("endTime", "");
      setStartTime("");
      setEndTime("");
    }
  }, [modalType, selectedTask]);

  const addTask = async (data) => {
    setLoading(true);

    const sendingData = {
      ...data,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };
    try {
      if (validateTimes()) {
        const res = await axios.post(
          "https://task-manager-hohf.onrender.com/users/add-task",
          sendingData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success("Task Added Succesfully");
          callback();
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (data) => {
    setLoading(true);

    const sendingData = {
      ...data,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };
    try {
      const res = await axios.post(
        `https://task-manager-hohf.onrender.com/users/edit-task/${selectedTask?._id}`,
        sendingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Task Edited Succesfully");
        callback();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {modalType === "addTask" ? "Add New Task" : "Edit Task"}
            </DialogTitle>
            {modalType === "addTask" ? (
              ""
            ) : (
              <span className="text-sm font-semibold">{`TASK ID: ${selectedTask?._id}`}</span>
            )}
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
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            <div className="my-2 flex justify-between items-center gap-1">
              <Controller
                control={control}
                name="priority"
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      // value={field.value}
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
              {errors.priority && (
                <p className="text-sm text-red-600">
                  {errors.priority.message}
                </p>
              )}

              <Controller
                control={control}
                name="status"
                render={({ field }) => {
                  console.log(typeof field.value);
                  const state =
                    (field.value || selectedTask?.status) === "Finished";
                  return (
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={state}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "Finished" : "Pending")
                        }
                      />
                      <span>{state ? "Finished" : "Pending"}</span>
                    </div>
                  );
                }}
              />
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div className="my-2 flex flex-col ">
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => {
                  const now = new Date();
                  const formattedMinDate = now.toISOString().slice(0, 16);
                  return (
                    <input
                      type="datetime-local"
                      min={formattedMinDate}
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="border-[1px] px-2 py-1 rounded-sm"
                    />
                  );
                }}
              />
              <span className="text-sm text-red-500">
                {startTime ? "" : "Start Time is required"}
              </span>
            </div>

            <div className="my-2 flex flex-col ">
              <Controller
                control={control}
                name="endTime"
                render={({ field }) => {
                  const formattedStartTime = startTime
                    ? new Date(startTime).toISOString().slice(0, 16)
                    : "";

                  return (
                    <input
                      type="datetime-local"
                      min={formattedStartTime}
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="border-[1px] px-2 py-1 rounded-sm"
                    />
                  );
                }}
              />
              <span className="text-sm text-red-500">
                {endTime ? "" : "End Time is required"}
              </span>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end items-center gap-2">
              <button
                className="border-[1px] border-black font-semibold px-2 py-1 rounded-sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              {modalType === "addTask" ? (
                <button
                  disabled={loading}
                  onClick={handleSubmit(addTask)}
                  className="bg-black text-white font-semibold px-4 py-1 rounded-sm"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  ) : (
                    "Add"
                  )}
                </button>
              ) : (
                <button
                  disabled={loading}
                  onClick={handleSubmit(editTask)}
                  className="bg-black text-white font-semibold px-4 py-1 rounded-sm"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  ) : (
                    "Edit"
                  )}
                </button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;

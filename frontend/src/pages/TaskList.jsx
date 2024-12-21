import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilePenLine, Plus, Trash } from "lucide-react";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import AlertDialogModal from "@/components/AlertDialogModal";
import axios from "axios";
import { toast } from "sonner";
import { formatTime } from "@/lib/helper";

const TaskList = () => {
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTask,setSelectedTask] = useState()

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/users/getAllTasks", {
        withCredentials: true,
      });
      if (res.data.success) {
        setTableData(res?.data.tasks);
        setModalType("addTask")
        setSelectedTask(null)
        setOpen(false)
        setDeleteDialog(false)
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteTask = async(id)=>{
    try {
      const res = await axios.get(`http://localhost:5000/users/delete-task/${id}`,{withCredentials:true})
      if(res.data.success){
        toast.success("Task Deleted Successfully")
        setDeleteDialog(false)
        getAllTasks()

      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || 'Somthing went wrong')
    }
  }
  
  const handleDeleteClick = (task)=>{
    setDeleteDialog(true)
    setSelectedTask(task)
  }

  const handleEditClick = (task)=>{
    setModalType("editTask")
    setSelectedTask(task)
    setOpen(true)
  }
  useEffect(() => {
    getAllTasks();
  }, []);

  

  
  return (
    <div className="py-5 px-3">
      <h1 className="font-bold text-xl ">Task List</h1>
      <div className="flex justify-between items-center">
        <div className="py-4 flex justify-center items-center gap-3">
          <div
            className="border-[2px] border-purple-500 w-fit flex justify-center items-center px-2 py-1 text-nowrap gap-1 rounded-sm"
            onClick={() => {
              setModalType("addTask");
              setOpen(true);
            }}
          >
            <span>
              <Plus className="w-[20px] text-purple-700" />
            </span>
            <span className="cursor-pointer text-purple-700 font-semibold">
              Add Task
            </span>
          </div>
         
        </div>
        <div className="flex justify-center items-center gap-3">
          <span className="font-semibold">Sort:</span>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status" className="cursor-pointer">
                  Least
                </SelectItem>
                <SelectItem value="priority" className="cursor-pointer">
                  Most
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status" className="cursor-pointer">
                  Finished
                </SelectItem>
                <SelectItem value="priority" className="cursor-pointer">
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your tasks</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Start Time</TableHead>
              <TableHead className="text-right">End Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.title}</TableCell>
                <TableCell>{item?.priority}</TableCell>
                <TableCell>{item?.status}</TableCell>
                <TableCell className="text-right">
                  {formatTime(item?.startTime)}
                </TableCell>
                <TableCell className="text-right">
                  {formatTime(item?.endTime)}
                </TableCell>
                <TableCell className="flex justify-end items-center gap-1">
                  <span onClick={()=>handleEditClick(item)}><FilePenLine className="w-[15px] text-blue-700 cursor-pointer"/></span>
                  <span onClick={()=>handleDeleteClick(item)}><Trash className="w-[15px] text-red-700 cursor-pointer" /></span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>

      <Modal modalType={modalType} open={open} setOpen={setOpen} callback={getAllTasks} selectedTask={selectedTask}/>
      <AlertDialogModal open={deleteDialog} setOpen={setDeleteDialog} action={()=>deleteTask(selectedTask._id)}/>
    </div>
  );
};

export default TaskList;

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

import { Plus, Trash } from "lucide-react";

import { useState } from "react";
import Modal from "@/components/Modal";
import AlertDialogModal from "@/components/AlertDialogModal";
import axios from "axios";
import { toast } from "sonner";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm,Controller } from "react-hook-form";

const TaskList = () => {
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const  [loading,setLoading] = useState(false)
 

 
  const addTask = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/users/add-task", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Task Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
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
          <div
            className="border-[2px] border-red-500 w-fit flex justify-center items-center px-2 py-1 text-nowrap gap-1 rounded-sm"
            onClick={() => {
              setDeleteDialog(true);
            }}
          >
            <span>
              <Trash className="w-[20px] text-red-700" />
            </span>
            <span className="cursor-pointer text-red-700 font-semibold">
              Delete Task
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <span className="font-semibold">Sort:</span>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status" className="cursor-pointer">
                  Status
                </SelectItem>
                <SelectItem value="priority" className="cursor-pointer">
                  Priority
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Modal modalType={modalType} open={open} setOpen={setOpen}  />
      <AlertDialogModal open={deleteDialog} setOpen={setDeleteDialog} />
    </div>
  );
};

export default TaskList;

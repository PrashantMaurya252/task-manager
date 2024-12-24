import DashboardCard from "@/components/DashboardCard";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import axios from "axios";

const Dasboard = () => {
  const [dashboard,setDashboard] = useState(null)
  const [loading,setLoading] = useState(false)

  async function dashboardStats(){
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:5000/users/dashboardStats',{withCredentials:true})
      if(res.data.success){
        setDashboard(res?.data?.data)
      }
    } catch (error) {
      console.log(error)
      toast.error('Try again Later')
    }
  }

  useEffect(()=>{
    dashboardStats()
  },[])

  console.log(dashboard)
  const stats = {
    value: "100%",
    label: "Total",
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
    <div className="p-5">
      <div className="grid grid-cols-5 gap-4">
        {Array(5)
          .fill(5)
          .map((item, index) => (
            <DashboardCard stats={stats} key={index} />
          ))}
      </div>
      <dev className="flex flex-col ">
        <h1 className="text-center font-bold py-5">Pending Task Summary</h1>
        <div className="grid grid-cols-3 gap-6">
          {Array(3)
            .fill(5)
            .map((item, index) => (
              <DashboardCard stats={stats} key={index} />
            ))}
        </div>
      </dev>

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
    </div>
  );
};

export default Dasboard;

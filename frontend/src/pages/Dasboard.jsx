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
  const [dashboardTable,setDashboardTable] = useState(null)
  const [loading,setLoading] = useState(false)

  async function dashboardStats(){
    try {
      setLoading(true)
      const res = await axios.get('https://task-manager-hohf.onrender.com/users/dashboardStats',{withCredentials:true})
      if(res.data.success){
        setDashboard(res?.data?.data)
      }
    } catch (error) {
      console.log(error)
      toast.error('Try again Later')
    }
  }

  
  async function dashboardTableData(){
    try {
      setLoading(true)
      const res = await axios.get('https://task-manager-hohf.onrender.com/users/dashboardTable',{withCredentials:true})
      if(res.data.success){
        setDashboardTable(res?.data?.data)
      }
    } catch (error) {
      console.log(error)
      toast.error('Try again Later')
    }
  }


  useEffect(()=>{
    dashboardStats()
    dashboardTableData()
  },[])

 

  
  return (
    <div className="p-5">
      <div className="grid grid-cols-5 screen-1100:grid-cols-4 screen-900:grid-cols-3 screen-680:grid-cols-2 screen-480:grid-cols-1 gap-4">
        {dashboard?.map((item, index) => (
            <DashboardCard stats={item} key={index} />
          ))}
      </div>
      {/* <dev className="flex flex-col ">
        <h1 className="text-center font-bold py-5">Pending Task Summary</h1>
        <div className="grid grid-cols-3 gap-6">
          {Array(3)
            .fill(5)
            .map((item, index) => (
              <DashboardCard stats={stats} key={index} />
            ))}
        </div>
      </dev> */}

      <div>
        <div className="flex justify-center items-center font-semibold text-lg my-6">
          <h1>DASHBOARD TABLE</h1>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead>Pending Task</TableHead>
              <TableHead>Total Time Lapsed</TableHead>
              <TableHead>Balance Estimate Time</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboardTable?.map((item,index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.priority}</TableCell>
                <TableCell>{item?.totalPendingTasks}</TableCell>
                <TableCell>{item?.totalTimeLapsed}</TableCell>
                <TableCell className="">
                  {item?.totalBalanceEstimateTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
        </Table>
      </div>
    </div>
  );
};

export default Dasboard;

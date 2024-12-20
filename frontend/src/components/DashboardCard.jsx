import React from 'react'

const DashboardCard = ({stats}) => {
  

  
  return (
    <div className='flex flex-col justify-center items-center border-[1px] border-black rounded-sm'>
        <span className='text-lg font-bold text-purple-500'>{stats.value}</span>
        <span className='font-semibold'>{stats.label}</span>
    </div>
  )
}

export default DashboardCard
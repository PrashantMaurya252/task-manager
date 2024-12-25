import React from 'react'

const DashboardCard = ({stats}) => {
  console.log(stats, typeof(stats))
  

  
  return (
    <div className='flex flex-col justify-center items-center border-[1px] border-black rounded-sm'>
        <span className='text-lg font-semibold text-purple-500'>{Object.keys(stats)}</span>
        <span className='font-semibold'>{Object.values(stats)=== "NaN hours" ? "NA":Object.values(stats)}</span>
    </div>
  )
}

export default DashboardCard
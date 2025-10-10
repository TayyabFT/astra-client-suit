import React from 'react'

const ReportCard = ({
  icon,
  bgColor,
  value,
  title,
  percentage,
  percentageColor
}) => {
  return (
    <div className='rounded-xl border border-[#FFFFFF0D] bg-[#67676733] px-5 py-3 space-y-4'>
      <span className={`rounded-xl flex items-center justify-center size-11`} style={{ backgroundColor: bgColor }}>
        {icon}
      </span>
      <div className='space-y-1.5'>
        <h2 className='text-[#F9FAFB] text-3xl font-semibold'>{value}</h2>
        <p className='text-[#9CA3AF] text-sm'>{title}</p>
        <p className={`text-sm font-light`} style={{ color: percentageColor }}>
          {percentage}
        </p>
      </div>
    </div>
  )
}

export default ReportCard

import React from 'react'

const KycCardBlur = ({value, title, icon, className}) => {
  return (
    <div className={`flex items-center sm:flex-row flex-col rounded-xl sm:rounded-md bg-[#FFFFFF0D] backdrop-blur-[50px] px-2 sm:px-5 gap-2 sm:gap-3 w-full ${className? 'py-3 sm:py-5' : 'max-w-[230px] w-full py-3 sm:py-3.5'}`}>
        <span className='flex items-center justify-center sm:size-8'>
            {icon}
        </span>
        <div className='flex-1'>
          <h3 className="text-[#F9FAFB] text-[22px] font-medium sm:text-start text-center">{value}</h3>
          <p className="text-[#9CA3AF] text-xs sm:text-start text-center">{title}</p>
        </div>
    </div>
  )
}

export default KycCardBlur

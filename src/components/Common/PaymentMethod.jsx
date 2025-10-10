import React from 'react'

const PaymentMethod = ({id, name, lable, placeholder}) => {
  return (
    <div className='space-y-2.5 w-full flex-1'>
      <p className='text-xs cursor-default text-[#E0E0E0]'>{lable}</p>
      <div className='p-[1px] bg-gradient-to-r from-[#505050] to-[#363636] rounded-md'>
        <div className='bg-[#292929] rounded-md overflow-hidden flex p-1 h-[40px]'>
            <input id={id} name={name} type='text' className='text-xs flex-1 w-full text-[#959595] placeholder:text-[#959595] bg-transparent py-1.5 px-3 outline-none border-none' placeholder={placeholder} />
            <span className='rounded-md bg-[#575656] text-xs text-[#FFFFFF99] px-4 h-full cursor-pointer flex items-center justify-center'>
                Update
            </span>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod

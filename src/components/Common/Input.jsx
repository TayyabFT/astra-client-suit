import React from 'react'

const Input = ({ id, type, name, lable, placeholder, onchange, value }) => {
  return (
    <div className='space-y-2.5 w-full flex-1'>
      {lable ? (
        <p className='text-xs cursor-default text-[#E0E0E0]'>{lable}</p>
      ) : null}

      <div className='p-[1px] bg-gradient-to-r from-[#505050] to-[#363636] rounded-md'>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onchange}
          className='bg-[#292929] rounded-md h-full text-xs w-full text-[#959595] placeholder:text-[#959595] py-2.5 px-4 outline-none border-none'
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default Input

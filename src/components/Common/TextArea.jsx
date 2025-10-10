import React from 'react'

const TextArea = ({id, name, lable, placeholder, value, onChange}) => {
  return (
    <div className='space-y-2.5'>
      <p className='text-xs cursor-default text-[#E0E0E0]'>{lable}</p>
      <div className='p-[1px] bg-gradient-to-r from-[#505050] to-[#363636] rounded-md h-[80px]'>
        <textarea id={id} name={name} value={value} onChange={onChange} className='bg-[#292929] rounded-md h-full text-xs flex-1 w-full text-[#959595] placeholder:text-[#959595] py-2.5 px-4 outline-none border-none resize-none' placeholder={placeholder} />
      </div>
    </div>
  )
}

export default TextArea

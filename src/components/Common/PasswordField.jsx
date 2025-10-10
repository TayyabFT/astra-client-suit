'use client'

import React, { useState } from 'react'
import { PasswordHideIcon } from '../Svgs';

const PasswordField = ({lable, id, name, placeholder, onchange, value}) => {

    const [hide, setHide] = useState('password');
    const setPassword = () => {
        setHide((hide === 'password'? 'text' : 'password'))
    }

  return (
    <div className='space-y-2.5 w-full flex-1'>
      { lable?
        <p className='text-xs cursor-default text-[#E0E0E0]'>{lable}</p>
        :
        ''
      }
      <div className='flex gap-5'>
        <div className='p-[1px] bg-gradient-to-r from-[#505050] to-[#363636] rounded-md flex-1'>
            <div className='bg-[#292929] rounded-md overflow-hidden flex p-1 h-[40px]'>
                <input value={value} id={id} name={name} type={hide} onChange={onchange} className='text-xs flex-1 w-full text-[#959595] placeholder:text-[#959595] bg-transparent py-1.5 px-3 outline-none border-none' placeholder={placeholder} />
                <span className='px-2 h-full cursor-pointer flex items-center justify-center' onClick={setPassword}>
                    <PasswordHideIcon/>
                </span>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default PasswordField

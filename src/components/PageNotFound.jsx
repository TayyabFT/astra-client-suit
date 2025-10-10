import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-center h-screen w-full flex items-center justify-center flex-col gap-1' style={{ backgroundImage: "url('/images/background.png')"}}>
      <h1 className='text-[110px] md:text-[160px] text-transparent bg-clip-text bg-gradient-to-b leading-none from-[#CDCDCD8F] to-[#BEBEBE00] font-semibold'>404</h1>
      <h2 className='text-xl md:text-2xl text-[#F9FAFB] font-semibold'>Page Not Found</h2>
      <p className='text-[#959595] font-medium text-xs md:text-sm'>Sorry, we can’t find the page you’re looking for</p>
      <Link to='/' className='rounded-lg bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-white cursor-pointer px-5 py-3 text-xs !mt-4'>
        Back to Home
      </Link>
    </div>
  )
}

export default PageNotFound

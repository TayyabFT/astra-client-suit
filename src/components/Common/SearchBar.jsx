import React from 'react'
import { SearchIcon } from '../Svgs'

const SearchBar = () => {
    return (
        <div className='bg-[#1D1D1D] rounded-md flex w-full sm:w-[304px] h-full'>
            <span className='h-full flex items-center justify-center px-4'>
                <SearchIcon />
            </span>
            <input className='flex-1 w-full pr-2 bg-transparent border-none outline-none text-xs text-[#9CA3AF] placeholder:text-[#9CA3AF]' type="text" placeholder='Search' />
        </div>
    )
}

export default SearchBar

import React from 'react'

const ButtonGradient = ({className, handleClick, text}) => {
    return (
        <div onClick={handleClick} className={`${className? '' : 'max-w-[220px]'} rounded-md select-none bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-white text-xs py-3 w-full flex items-center justify-center cursor-pointer`}>
            {text}
        </div>
    )
}

export default ButtonGradient

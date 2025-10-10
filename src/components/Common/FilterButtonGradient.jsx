import React from 'react'

const FilterButtonGradient = ({ text, selected, onClick }) => {

    const outerClasses =
        'p-[1px] h-[28px] rounded flex items-center justify-center bg-gradient-to-r from-[#858585] to-[#111111] cursor-pointer';

    const innerClasses = selected
        ? 'px-3 h-full rounded text-sm text-[#F9FAFB] bg-gradient-to-r from-[#858585] to-[#111111] flex items-center'
        : 'px-3 h-full rounded text-sm text-[#9CA3AF] bg-[#111111] flex items-center';

    return (
        <div className={outerClasses} onClick={onClick}>
            <div className={innerClasses}>
                {text}
            </div>
        </div>
    )
}

export default FilterButtonGradient
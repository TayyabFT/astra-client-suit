import React from 'react';

const FilterButtonGradientInner = ({ text, selected, onClick }) => {
  const outerClasses =
    'p-[1px] h-[25px] sm:h-[28px] rounded-[4px] flex items-center justify-center bg-gradient-to-r from-[#858585] to-[#1D1D1D] cursor-pointer';

  const innerClasses = selected
    ? 'px-3 h-full rounded-[4px] text-xs sm:text-sm text-[#F9FAFB] bg-gradient-to-r from-[#858585] to-[#1D1D1D] flex items-center'
    : 'px-3 h-full rounded-[4px] text-xs sm:text-sm text-[#9CA3AF] bg-[#1D1D1D] flex items-center';

  return (
    <div className={outerClasses} onClick={onClick}>
      <div className={innerClasses}>
        {text}
      </div>
    </div>
  );
};

export default FilterButtonGradientInner;

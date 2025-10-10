'use client'

import React from 'react'

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProgressBar = ({ label, current = 0, max = 10000 }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const formattedCurrent = formatNumber(current);
  const formattedMax = formatNumber(max);

  return (
    <div className="space-y-2.5 flex-1 w-full">
      <p className='text-xs cursor-default text-[#E0E0E0]'>{label}</p>
      <div className='space-y-2'>
        <p className='text-end text-[#959595] text-xs'>
          API Calls: {formattedCurrent} / {formattedMax} this month
        </p>
        <div className='py-1.5 rounded-full w-full bg-[#292929] border border-[#505050] relative'>
          <div
            className="absolute inset-0 h-full bg-[#0EAA04] rounded-full"
            style={{ width: `${percentage}%` }}
          >
            <span className='absolute rounded-full size-5 bg-[#0EAA04] -right-[10px] top-[50%] -translate-y-[50%]'></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

import React from 'react';

const CustomCheckbox = ({ lable, checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer select-none max-w-max">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`w-4 h-4 rounded-sm flex items-center justify-center border-[2px] border-[#E0E0E0] transition-all duration-200
        ${checked
          ? 'bg-gradient-to-r from-[#FF842D] to-[#FF2D55] border-none'
          : 'border-[#888] bg-transparent'}
      `}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="ml-3 text-xs text-[#E0E0E0]">{lable}</span>
    </label>
  );
};

export default CustomCheckbox;

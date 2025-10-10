'use client';
import React, { useState, useRef, useEffect } from 'react';
import { DropdownErrowIcon } from '../Svgs';

const CustomDropDown = ({
  items = [],
  onSelect = () => { },
  table,
  className,
  form,
  placeholder = "Select",
  gradient
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
    setOpen(false);
  };

  return (
    <div
      className={`flex-1 flex items-center justify-end relative w-full ${className ? className : 'max-w-[180px]'}`}
      ref={dropdownRef}
    >
      <div
        className={`flex items-center justify-between gap-3 sm:gap-4 rounded-lg px-2.5 sm:px-4 py-3 w-full cursor-pointer text-xs border 
          ${table ? 'border-[#2D2D2D] bg-[#2D2D2D] max-w-[120px] text-white' : ''}
          ${gradient ? 'hover:bg-gradient-to-r from-[#FF842D] to-[#FF2D55]' : ''}
          ${form ? 'border-[#505050] bg-[#292929] text-[#959595]' : ''}
          ${!table && !form ? 'border-[#FFFFFF26] text-white' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {selected || placeholder}
        <DropdownErrowIcon />
      </div>

      {open && (
        <div className="absolute top-[46px] w-full bg-[#111111] rounded-md right-0 z-50 py-1.5">
          {items.map((item, index) => (
            <p
              key={index}
              className="text-xs text-white px-4 py-1.5 cursor-pointer hover:bg-[#222]"
              onClick={() => handleSelect(item)}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;

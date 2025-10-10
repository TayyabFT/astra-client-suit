import React from "react";
import { LogoutIconG } from "../Svgs";

const AlertPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-[#1111119f] bg-opacity-70 fixed top-0 z-[111111111]">
      <div className="bg-[#7B7B7B80] p-6 rounded-2xl text-center w-[320px] backdrop-blur-[4px]">
        <span className="rounded-full bg-[#FF842D33] size-10 p-2 flex items-center justify-center mx-auto">
          <LogoutIconG/>
        </span>
        <h2 className="text-xl text-white font-semibold mt-4">Are you Sure?</h2>
        <p className="text-xs text-[#BEBEBE] mt-2">Are you sure you want to logout your account?</p>
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={onCancel} className="px-7 text-xs py-2.5 rounded-md bg-[#292929] text-white transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-7 text-xs py-2.5 rounded-md bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-white transition-all">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;

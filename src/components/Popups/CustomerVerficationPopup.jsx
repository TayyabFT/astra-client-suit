"use client";
import React, { useState } from "react";
import CustomDropDown from "../Common/CustomDropdown";
import { CrossIcon, ExportIcon, PdfIcon } from "../Svgs";
import CustomDatePicker from '../../components/Common/CustomDatePicker'


const CustomerVerficationPopup = ({ onClose }) => {

  const statusOptions = ["All Status", "Pending", "Approved", "Rejected"];
  const docTypes = ["All Types", "Passport", "CNIC", "Driving License"];
  const riskRatings = ["All Ratings", "Low", "Medium", "High"];

  return (
    <div className="absolute top-[90px] right-[50px] bg-black rounded-xl bg-opacity-70 flex items-center justify-center z-[111111111]">
      <div className="bg-[#7B7B7B80] text-white p-6 rounded-xl shadow-lg w-[900px] relative backdrop-blur-[4px] space-y-6">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <CrossIcon />
        </button>

        <div className="w-full">
          <div className="grid grid-cols-3 gap-4">
            <CustomDatePicker label="Date Range" placeholder="Start Date" />
            <CustomDatePicker label="End Date" placeholder="End Date" />

            <div className="w-full space-y-2.5">
              <p className="text-xs cursor-default text-[#E0E0E0]">Status</p>
              <CustomDropDown
                className={"w-full bg-gradient-from-[#505050] to-[#363636]"}
                items={statusOptions}
                placeholder="All Status"
                onSelect={(val) => console.log("Selected Status:", val)}
                form
              />
            </div>

            <div className="space-y-2.5">
              <p className="text-xs cursor-default text-[#E0E0E0]">Document Types</p>
              <CustomDropDown
                className={"w-full"}
                items={docTypes}
                placeholder="All Types"
                onSelect={(val) => console.log("Selected Doc:", val)}
                form
              />
            </div>

            <div className="space-y-2.5">
              <p className="text-xs cursor-default text-[#E0E0E0]">Risk Ratings</p>
              <CustomDropDown
                className={"w-full"}
                items={riskRatings}
                placeholder="All Ratings"
                onSelect={(val) => console.log("Selected Risk:", val)}
                form
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <div className="px-5 py-2.5 cursor-pointer rounded-lg text-xs bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-white font-medium flex items-center gap-2">
            <ExportIcon className="text-[#FFFFFF]" />
            Export CSV
          </div>
          <div className="bg-gradient-to-r rounded-lg from-[#FF842D] to-[#FF2D55] p-[1px]">
            <div className="px-5 py-2.5 cursor-pointer rounded-lg text-xs bg-[#4C4C4C] text-white font-medium flex items-center gap-2">
              <PdfIcon />
              Export PDF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerVerficationPopup;



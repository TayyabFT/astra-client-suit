"use client";

import { useState } from "react";
import { CrossIcon, PhoneIcon, TimeIcon } from "../Svgs";

export default function ViewReportPopup({ onclose }) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#7B7B7B80] text-white rounded-lg w-full max-w-[900px] max-h-[90vh]  backdrop-blur-[6px] overflow-y-auto custom__scrollbar  shadow-2xl">
        <div className="border-b border-[#777777] p-5">
          <h2 className="text-xl font-medium">Customer Verification Details</h2>
        </div>

        <div className="">
          <div className="flex justify-between items-center w-full border-b border-[#777777] px-5 py-3">
            <h3 className="font-medium text-white">Customer Information</h3>
            <div className="flex gap-6 text-white text-sm">
              <span className="flex items-center text-xs gap-2">
                <TimeIcon /> 18 March 2025
              </span>
              <span className="flex items-center text-xs gap-2">
                <PhoneIcon /> +44324493922
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-sm text-gray-300 p-5">
            <div className="space-y-1">
              <p className="text-[#BEBEBE]">Full Name</p>
              <p className="text-xs text-white">Ahmad Hassan</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#BEBEBE]">Email</p>
              <p className="text-xs text-white">ahmad.hassan@email.com</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#BEBEBE]">Phone</p>
              <p className="text-xs text-white">N/A</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#777777] p-5">
          <h3 className="text-lg font-semibold mb-3">Submitted Documents</h3>
          <div className="flex gap-3 flex-wrap">
            {["CNIC Front.jpg", "CNIC Back.jpg", "Selfie.jpg"].map((doc) => (
              <div
                key={doc}
                className="bg-[#3A3A3A] rounded-lg px-4 py-2 flex items-center gap-2 text-sm"
              >
                <span>{doc}</span>
                <span className="text-green-400">✔</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#777777] p-5">
          <h3 className="text-lg font-semibold mb-3">Verification Steps</h3>
          <div className=" text-sm text-gray-300 relative">
            <Step
              title="Documents Upload"
              time="Sept 15, 2024 at 10:30 AM"
              desc="Documents received and validated"
              isLast={false}
            />
            <Step
              title="OCR Processing"
              time="Sept 15, 2024 at 10:32 AM"
              desc="Text extraction completed successfully"
              isLast={false}
            />
            <Step
              title="Liveness Check"
              time="Sept 15, 2024 at 10:35 AM"
              desc="Face matching passed (96% confidence)"
              isLast={false}
            />
            <Step
              title="Successful"
              time="Sept 15, 2024 at 2:15 PM"
              desc="Approved by reviewer: John Smith"
              isLast={true}
              nopadding
            />
          </div>
        </div>

        <div className="border-t border-[#777777] py-5">
          <div className="border-b border-[#777777]">
            <h3 className="text-lg font-semibold mb-2 px-4">Risk Assessment</h3>
          </div>
          <div className="grid px-5 grid-cols-2 sm:grid-cols-4 gap-4  py-4 text-sm">
            <div className="">
              <p className="text-gray-300">Overall Risk Score</p>
              <p className="text-green-400 font-semibold">85 (Low Risk)</p>
            </div>
            <div>
              <p className="text-gray-300">Document Quality</p>
              <p className="text-white font-semibold">Excellent</p>
            </div>
            <div>
              <p className="text-gray-300">Face Match Confidence</p>
              <p className="text-white font-semibold">96%</p>
            </div>
            <div>
              <p className="text-gray-300">Data Consistency</p>
              <p className="text-white font-semibold">100%</p>
            </div>
          </div>
        </div>

        <div className=" p-5 flex justify-end">
          <button
            onClick={onclose}
            className="px-6 py-2 rounded-lg bg-[#E1E1E133] backdrop-blur-[20px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ title, time, desc, nopadding }) {
  return (
    <div className="flex items-start relative">
      <div className="relative flex h-full items-start">
        <div className="absolute left-0 top-0 flex h-full">
          <div className="h-3 w-3 rounded-full bg-green-400 relative z-10"></div>


          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/40"></div>

        </div>

        <div className="relative pl-6 space-y-2">
          <p className="font-semibold text-white">{title}</p>
          <p className="text-gray-400 text-xs">{time}</p>
          <p className={`${nopadding ? 'pb-0' : 'pb-3'}`}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

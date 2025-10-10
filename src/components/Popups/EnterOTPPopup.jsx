import React, { useState } from "react";
import { CrossIcon } from '../Svgs'
import OTPInput from 'react-otp-input'
import axios from "axios";
import { toast } from "react-toastify";

const EnterOTPPopup = ({ email, onVerify, onClose }) => {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/verify-email`,
        { email, code: otp }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message || "Email verified successfully!");
        onVerify();
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[100vh] w-full flex items-center justify-center bg-[#1111119f] bg-opacity-70 fixed top-0 z-[111111111]'>
      <div className='bg-[#7B7B7B80] p-6 rounded-2xl text-center max-w-[340px] w-full backdrop-blur-[4px]'>
        <div className='flex items-center justify-end' onClick={onClose}>
          <CrossIcon className='cursor-pointer stroke-[#ffffff]' />
        </div>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-xl text-white font-medium'>Enter Your OTP</h2>
            <p className="text-[#9CA3AF] text-xs">
              Please enter the verification code sent to <br />
              <span className="text-[#FF842D]">{email}</span>
            </p>
          </div>

          <div className='space-y-2'>
            <p className='text-xs text-[#E0E0E0] max-w-max'>Enter OTP</p>
            <OTPInput
              value={otp}
              onChange={(val) => setOtp(val)}
              numInputs={6}
              inputType="text"
              shouldAutoFocus
              inputStyle={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                textAlign: "center",
                backgroundColor: "#292929",
                color: "white",
                fontSize: "18px",
                outline: "none",
                border: "1px solid #767373",
                marginRight: "3px",
                marginLeft: "3px"
              }}
              renderInput={(props) => <input {...props} />}
            />

          </div>

          <div className='space-y-2'>
            <div onClick={handleVerify}
              disabled={loading}
              className='flex items-center justify-center bg-[#292929] cursor-pointer py-2.5 text-xs px-4 w-full text-white rounded-md'>
              {loading ? "Verifying..." : "Continue"}
            </div>
            <p className='text-xs text-[#E0E0E0] cursor-pointer underline max-w-max'>
              Resend Code
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnterOTPPopup
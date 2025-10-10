import React, { useEffect, useState } from "react";
import { FilterIcon, ReportsIcon, SuccessIcon, CrossIcon, ClockIcon, Profile2 } from "../../components/Svgs";
import ReportCard from "../../components/Cards/ReportCard";
import ReportsRecordTable from "../../components/Tables/ReportsRecordTable";
import CustomerVerficationPopup from "../../components/Popups/CustomerVerficationPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reports = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const [showFilter, setShowFilter] = useState(false);
  const [KYCData, setKYCData] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`)
      setKYCData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[#F9FAFB] font-medium text-xl">
          Customer Verification Report
        </h2>
        <div
          onClick={() => setShowFilter(true)}
          className="rounded-lg bg-transparent border border-[#FFFFFF26] px-5 py-2.5 text-sm cursor-pointer flex items-center justify-center gap-2 text-white"
        >
          Filter
          <FilterIcon />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <ReportCard
          icon={<Profile2 className="stroke-[#FF842D]" />}
          bgColor="#FF842D26"
          value={KYCData.pendingRequests | 0}
          title="Total Customers Processed"
          percentage="+12% from last month"
          percentageColor="#2BD72C"
        />
        <ReportCard
          icon={<SuccessIcon />}
          bgColor="#2BD72C26"
          value={KYCData.verifiedRequests | 0}
          title="Verified Customers"
          percentage="+8% from last month"
          percentageColor="#2BD72C"
        />
        <ReportCard
          icon={<CrossIcon className="stroke-[#FF2D55]" />}
          bgColor="#FF2D5526"
          value={KYCData.pendingRequests | 0}
          title="Rejected Customers"
          percentage="-5% from last month"
          percentageColor="#FF2D55"
        />
        <ReportCard
          icon={<ClockIcon />}
          bgColor="#8237FF26"
          value={KYCData.failedRequests | 0}
          title="Average verification time"
          percentage="-0.3h from last month"
          percentageColor="#2BD72C"
        />
      </div>

      <ReportsRecordTable />

      {showFilter && <CustomerVerficationPopup onClose={() => setShowFilter(false)} />}
    </div>
  );
};

export default Reports;

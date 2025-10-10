import React, { useEffect, useState } from 'react'
import ViewReportPopup from '../Popups/ViewReportPopup';
import axios from 'axios';


const ReportsRecordTable = () => {
    const [showPopup, setShowPopup] = React.useState(false);
    const [selectedReport, setSelectedReport] = React.useState(null);
    const [data, setdata] = useState([])


    const handleViewReport = (report) => {
        setSelectedReport(report);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedReport(null);
    };

    const fetchData = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc-customers?organizationId=55210fb6-f1bc-48ce-a4d6-d999e9ebd424`)
        setdata(response.data.data, []);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='bg-[#252525BF] w-full rounded-md'>
            <div className='px-4 py-3'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>Customer Verification Records</h2>
            </div>
            <div className='overflow-auto'>
                <div className="min-w-[800px] w-full">
                    <div className="uppercase flex items-center w-full text-[12px] bg-[#2D2D2D] text-[#9CA3AF] px-5 py-2.5">
                        <div className="flex-1 font-medium text-start">customer Name</div>
                        <div className="flex-1 font-medium text-center">document type</div>
                        <div className="flex-1 font-medium text-center">submission date</div>
                        <div className="flex-1 font-medium text-center">status</div>
                        <div className="flex-1 font-medium text-center">risk score</div>
                        <div className="flex-1 font-medium text-end">Actions</div>
                    </div>
                    <div className='overflow-y-auto w-full py-1'>
                        {data.length === 0 ? (
                        <div className="text-center py-5 text-[#9CA3AF] text-xs">No customer found</div>
                        ) : ( data.map((itm, index) => (
                        <div key={index} className="text-[#D1D5DB] text-xs py-2 w-full flex items-center px-5">
                            <div className="flex-1 text-start">{itm.name}</div>
                            <div className="flex-1 text-center">{itm.docType}</div>
                            <div className="flex-1 text-center">
                                {new Date(itm.date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </div>
                            <div className="flex-1 text-center">
                                <button className={`rounded-md ${itm.kycStatus === 'verified' ? 'bg-[#0EAA0433] text-[#2BD72C]' : itm.kycStatus === 'failed' ? 'bg-[#FF2D5533] text-[#FF161A]' : 'bg-[#FF842D33] text-[#FF842D]'} cursor-default max-w-[120px] mx-auto w-full py-2 text-[13px]`}>
                                    {itm.kycStatus}
                                </button>
                            </div>
                            <div
                                className={`flex-1 text-center ${itm.riskScore.includes("medium")
                                    ? "text-[#0EAA04]"
                                    : itm.riskScore.includes("high")
                                        ? "text-[#FF2D55]"
                                        : "text-[#FF842D]"
                                    }`}
                            >
                                {itm.riskScore}
                            </div>
                            <div className='flex-1 flex items-center justify-end'>
                                <button
                                    className='rounded-lg px-4 py-2 cursor-pointer text-[13px] text-end flex items-center gap-2 bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'
                                    onClick={() => handleViewReport(itm)}
                                >
                                    View Report
                                </button>
                            </div>
                        </div>
                        )))}
                    </div>
                </div>
            </div>
            {showPopup && selectedReport && (
                <ViewReportPopup
                    onclose={handleClosePopup}
                    report={selectedReport}
                />
            )}
        </div>
    )
}

export default ReportsRecordTable

'use client';

import React, { useEffect, useState } from 'react'
import CustomDropDown from '../Common/CustomDropdown';
import axios from 'axios';

const CustomerOnboardingRiskManagement = ({action, countryFilter}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            let url = `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/risky-users?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`;
            
            if (countryFilter) {
                url += `&country=${countryFilter}`;
            }
            
            const response = await axios.post(url);
            setData(response.data.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [countryFilter]);

    return (
        <div className="bg-[#1D1D1D] w-full rounded-md">
            <div className="px-4 py-3">
                <h2 className="text-[#F9FAFB] font-semibold text-lg">Customer Onboarding</h2>
            </div>

            <div className="overflow-auto custom__scrollbar">
                <div className="min-w-[500px] w-full">
                    <div className="uppercase flex items-center w-full text-[12px] bg-[#2D2D2D] text-[#9CA3AF] px-5 py-2.5">
                        <div className="flex-1 font-medium text-start">User Name</div>
                        <div className="flex-1 font-medium text-center">Type</div>
                        <div className="flex-1 font-medium text-center">Date</div>
                        <div className="flex-1 font-medium text-center">Event</div>
                        <div className="flex-1 font-medium text-end">Status</div>
                        {
                            action ?
                                <div className="flex-1 font-medium text-end">Action</div>
                                :
                                ''
                        }
                    </div>

                    <div className="overflow-y-auto custom__scrollbar w-full">
                        {loading ? (
                            <div className="text-center py-5 text-[#9CA3AF] text-sm">Loading...</div>
                        ) : data.length === 0 ? (
                            <div className="text-center py-5 text-[#9CA3AF] text-xs">No users found</div>
                        ) : (
                            data.map((itm, index) => (
                                <div
                                    key={index}
                                    className="text-[#D1D5DB] text-xs border-t border-[#393534] py-2.5 w-full flex items-center px-5"
                                >
                                    <div className="flex-1 whitespace-nowrap text-start">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-full size-9 bg-[#2D2D2D] flex items-center justify-center text-white text-sm font-medium">
                                                {itm.username
                                                    ?.split(" ")
                                                    .slice(0, 2)
                                                    .map((word) => word[0].toUpperCase())
                                                    .join("")}
                                            </div>
                                            <p className="text-[13px]">{itm.username}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center capitalize">{itm.riskLevel}</div>

                                    <div className="flex-1 text-center">{new Date(itm.event.date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                    </div>
                                    <div className="flex-1 text-center capitalize">{itm.event.type}</div>

                                    <div className="flex-1 text-end">
                                        <button
                                            className={`rounded-md ${itm.event.status === 'flagged'
                                                ? 'bg-[#FF842D33] text-[#FF842D]'
                                                : 'bg-[#FF2D5533] text-[#FF2D55]'
                                                } cursor-default px-4 py-2 text-[13px]`}
                                        >
                                            {itm.event.status}
                                        </button>
                                    </div>

                                    {action ?
                                        <div className="flex-1 flex justify-end">
                                            {/* <CustomDropDown
                                            gradient
                                            items={['Restrict User', 'Review Account']}
                                            table
                                            placeholder={itm.current_action || 'Select'}
                                            onSelect={(item) => {
                                                console.log(`Row ${index} selected:`, item);
                                            }}
                                        /> */}
                                            <button class="rounded-lg px-4 py-2 cursor-pointer text-[13px] text-end flex items-center gap-2 bg-gradient-to-r from-[#FF842D] to-[#FF2D55]">Restrict User</button>
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerOnboardingRiskManagement;

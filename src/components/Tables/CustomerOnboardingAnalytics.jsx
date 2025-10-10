import React, { useEffect, useState } from "react";
import { FaceScanIcon, IDCardIcon, LocationTypeIcon } from "../Svgs";
import FilterButtonGradientInner from "../Common/FilterButtonGradientInner";
import axios from "axios";
import Pagination from "../../components/Common/Pagination";

const buttonValues = [
  { label: "Last day", value: "1d" },
  { label: "Week", value: "7d" },
  { label: "Month", value: "30d" },
  { label: "Year", value: "365d" },
];

const CustomerOnboardingAnalytics = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("1d");
  const rowsPerPage = 3;

  const fetchData = async (time = "1d") => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc-customers?organizationId=55210fb6-f1bc-48ce-a4d6-d999e9ebd424&time=${time}`
      );
      setTableData(response.data?.data || []);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedFilter);
  }, [selectedFilter]);

  const paginatedData = tableData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="bg-[#1D1D1D] rounded-md space-y-3 w-full overflow-x-auto custom__scrollbar">
        <div className="min-w-[1000px]">
          <div className="px-4 py-3 space-y-2 flex items-center justify-between">
            <h2 className="text-[#F9FAFB] font-semibold text-lg">
              Customer Onboarding
            </h2>
            <div className="flex gap-2">
              {buttonValues.map((item) => (
                <FilterButtonGradientInner
                  key={item.value}
                  text={item.label}
                  selected={selectedFilter === item.value}
                  onClick={() => setSelectedFilter(item.value)}
                />
              ))}
            </div>
          </div>

          <div className="uppercase flex items-center w-full text-[12px] bg-[#2D2D2D] text-[#9CA3AF] px-5 py-2.5">
            <div className="flex-1 font-medium text-start">Country</div>
            <div className="flex-1 font-medium text-center">User Name</div>
            <div className="flex-1 font-medium text-center">User Type</div>
            <div className="flex-1 font-medium text-center">Date</div>
            <div className="flex-1 font-medium text-center">Level</div>
            <div className="flex-1 font-medium text-end">Kyc Type</div>
            <div className="flex-1 font-medium text-end">AML Status</div>
            <div className="flex-1 font-medium text-end">Status</div>
          </div>

          {loading ? (
            <p className="text-white text-center py-5 text-xs">Loading...</p>
          ) : (
            paginatedData.length === 0?(
              <p className="text-center py-6 text-[#9CA3AF] text-xs">No customers found</p>
            )
            :
            paginatedData.map((itm, index) => (
              <div
                key={index}
                className="text-[#D1D5DB] text-xs border-t border-[#393534] py-2.5 w-full flex items-center px-5"
              >
                <div className="flex-1 whitespace-nowrap text-start">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full size-9 bg-[#2D2D2D] flex items-center justify-center text-white text-sm font-medium">
                      {itm.name
                        ?.split(" ")
                        .slice(0, 2)
                        .map((word) => word[0].toUpperCase())
                        .join("")}
                    </div>
                    <p className="text-[12px]">{itm.country}</p>
                  </div>
                </div>
                <div className="flex-1 text-center">{itm.name}</div>
                <div className="flex-1 text-center">{itm.type}</div>
                <div className="flex-1 text-center">
                  {new Date(itm.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex-1 text-center">{itm.kycLevel}</div>
                <div className="flex-1 flex items-end justify-end gap-2">
                  {itm.kycType?.identity_verification !== "not_started" || (
                    <IDCardIcon />
                  )}
                  {itm.kycType?.proof_of_address_verification !==
                    "not_started" || <LocationTypeIcon />}
                  {itm.kycType?.biometric_verification !== "not_started" || (
                    <FaceScanIcon />
                  )}
                </div>
                <div className="flex-1 text-end">
                  <button
                    className={`rounded-md px-4 py-2 text-[13px] cursor-default
                        ${!itm.amlStatus
                        ? "bg-[#FF842D33] text-[#FF842D]"
                        : itm.amlStatus.toLowerCase() === "flagged"
                          ? "bg-[#FF2D5533] text-[#FF161A]"
                          : "bg-[#0EAA0433] text-[#0EAA04]"
                      }`}
                  >
                    {!itm.amlStatus ? "Pending" : itm.amlStatus}
                  </button>
                </div>
                <div className="flex-1 text-end">
                  <button
                    className={`rounded-md ${itm.kycStatus?.toLowerCase() === "success"
                      ? "bg-[#0EAA0433] text-[#0EAA04]"
                      : itm.kycStatus?.toLowerCase() === "pending"
                        ? "bg-[#FF842D33] text-[#FF842D]"
                        : "bg-[#FF2D5533] text-[#FF2D55]"
                      } cursor-default px-4 py-2 text-[13px]`}
                  >
                    {itm.kycStatus}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {tableData.length > 0 && !loading && (
          <div className="flex items-center justify-end pb-5 px-5">
            <Pagination
              pageCount={Math.ceil(tableData.length / rowsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerOnboardingAnalytics;

import React, { useEffect, useState } from "react";
import ViewAllButton from "../Common/ViewAllButton";
import Pagination from "../../components/Common/Pagination";
import axios from "axios";

const CustomerOnboarding = ({ timeFilter, countryFilter }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 3;

  const fetchData = async () => {
    try {
      const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc-customers`;
      const organizationId = '55210fb6-f1bc-48ce-a4d6-d999e9ebd424';
      
      let url = `${baseUrl}?organizationId=${organizationId}`;
      
      if (timeFilter) {
        url += `&time=${timeFilter}`;
      }
      
      if (countryFilter) {
        url += `&country=${countryFilter}`;
      }

      const response = await axios.post(url);
      setTableData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeFilter, countryFilter]);

  const paginatedData = tableData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const shimmerRow = (
    <tr className="animate-pulse">
      <td className="px-6 pt-3 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full size-9 bg-gray-400"></div>
          <div className="h-4 w-20 bg-gray-400 rounded"></div>
        </div>
      </td>
      <td className="px-2 pt-3 py-2">
        <div className="h-4 w-12 bg-gray-400 rounded mx-auto"></div>
      </td>
      <td className="px-2 pt-3 py-2">
        <div className="h-4 w-16 bg-gray-400 rounded mx-auto"></div>
      </td>
      <td className="px-2 pt-3 py-2">
        <div className="h-4 w-14 bg-gray-400 rounded mx-auto"></div>
      </td>
      <td className="px-2 pt-3 py-2">
        <div className="h-4 w-14 bg-gray-400 rounded ml-auto"></div>
      </td>
    </tr>
  );

  return (
    <div className="bg-[#1D1D1D] rounded-xl">
      <div className="flex items-center justify-between w-full relative py-3 px-5">
        <h3 className="text-[#F9FAFB] font-semibold text-lg">
          Customer Onboarding
        </h3>
      </div>

      <div className="overflow-auto !max-h-[300px] custom__scrollbar">
        <table className="min-w-[500px] w-full">
          <thead className="text-[12px] bg-[#2D2D2D] text-[#9CA3AF]">
            <tr className="uppercase">
              <th className="px-6 py-3 font-medium text-start">User Name</th>
              <th className="px-6 py-3 font-medium text-center">Type</th>
              <th className="px-6 py-3 font-medium text-center">Date</th>
              <th className="px-6 py-3 font-medium text-center">Level</th>
              <th className="px-6 py-3 font-medium text-end">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, idx) => <React.Fragment key={idx}>{shimmerRow}</React.Fragment>)
            ) : tableData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-[#9CA3AF] text-xs">
                  No customers found
                </td>
              </tr>
            ) : (
              paginatedData.map((data, index) => (
                <tr key={index} className="text-[#D1D5DB] text-xs">
                  <td className="px-6 pt-3 whitespace-nowrap text-start">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full size-9 bg-[#2D2D2D] flex items-center justify-center text-white text-sm font-medium">
                        {data.name
                          ?.split(" ")
                          .slice(0, 2)
                          .map((word) => word[0].toUpperCase())
                          .join("")}
                      </div>
                      <p className="text-[13px]">{data.name}</p>
                    </div>
                  </td>
                  <td className="px-2 pt-3 text-center">{data.type}</td>
                  <td className="px-2 pt-3 text-center">
                    {new Date(data.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-2 pt-3 text-center">{data.kycLevel}</td>
                  <td className="px-2 pt-3 text-end">
                    <button
                      className={`rounded-md ${data.kycStatus?.toLowerCase() === "success"
                        ? "bg-[#0EAA0433] text-[#0EAA04]"
                        : data.kycStatus?.toLowerCase() === "pending"
                          ? "bg-[#FF842D33] text-[#FF842D]"
                          : "bg-[#FF2D5533] text-[#FF2D55]"
                        } cursor-default px-4 py-2 text-[13px]`}
                    >
                      {data.kycStatus}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {tableData.length > 0 && (
        <div className="flex items-center justify-end pb-5 px-5">
          <Pagination
            pageCount={Math.ceil(tableData.length / rowsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerOnboarding;

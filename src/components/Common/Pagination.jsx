import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
        if (onPageChange) onPageChange(selectedItem.selected);
    };

    return (
        <div className="flex justify-center mt-4">
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                forcePage={currentPage}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center gap-2 text-white"
                pageClassName="px-3.5 py-2 text-xs rounded-lg text-white hover:bg-[#333] select-none cursor-pointer"
                activeClassName="bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-white px-3.5 py-2 rounded-lg"
                previousClassName={`px-3 py-2 text-xs rounded-lg border border-[#919191] cursor-pointer flex items-center ${currentPage === 0 ? "text-[#888] pointer-events-none" : "text-white"
                    }`}
                nextClassName={`px-3 py-2 text-xs rounded-lg border border-[#919191] cursor-pointer flex items-center ${currentPage === pageCount - 1 ? "text-[#888] pointer-events-none" : "text-white"
                    }`}
                breakClassName="px-3 py-2 text-xs"
            />
        </div>
    );
};

export default Pagination;

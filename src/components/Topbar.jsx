import { useState } from "react";
import SearchBar from "./Common/SearchBar";
import { HamurgerIcon, NotificationIcon, SearchIcon } from "./Svgs";
import NotificationPopup from "./Popups/NotificationPopup";

const Topbar = ({ hide, setHide }) => {
    const [popup, setPopup] = useState(false);

    const handleNotification = () => {
        setPopup((prev) => !prev);
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex justify-between py-4 sm:py-5 z-50 bg-[#111111] h-[76px] sm:h-[86px]">
            <div className="space-y-2 sm:block hidden">
                <img src="/images/astra.png" alt="Banner" className="w-[90px]" />
                <p className="text-[#9CA3AF] text-xs">Compliance Management Dashboard</p>
            </div>

            <div className="sm:hidden block my-auto">
                <img src="/images/astraLogo.png" alt="Banner" className="w-[110px] h-auto" />
            </div>

            <div className="flex gap-1.5 sm:gap-2.5 flex-1 justify-end">
                <div className="hidden lg:block h-full">
                    <SearchBar />
                </div>

                <div className="flex items-center justify-center rounded-md bg-[#1D1D1D] h-full px-4 cursor-pointer lg:hidden">
                    <SearchIcon className="stroke-[#E0E0E0]" />
                </div>

                <div
                    className="rounded-md bg-[#1D1D1D] h-full cursor-pointer relative"
                >
                    <span className="rounded-md px-4 h-full flex items-center justify-center" onClick={handleNotification}>
                        <NotificationIcon />
                    </span>
                    {popup && <NotificationPopup />}
                </div>

                <div
                    className="flex items-center justify-center rounded-md bg-[#1D1D1D] h-full px-4 cursor-pointer lg:hidden"
                    onClick={() => setHide((prev) => !prev)}
                >
                    <HamurgerIcon />
                </div>
            </div>
        </div>
    );
};

export default Topbar;

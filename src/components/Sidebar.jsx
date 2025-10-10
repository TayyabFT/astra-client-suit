import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Account,
    AccountG,
    AnalyticsIcon,
    AnalyticsIconG,
    DashboardIcon,
    DashboardIconG,
    GlobalKyc,
    GlobalKycG,
    LogoutIconG,
    ReportsIcon,
    ReportsIconG,
    RiskManagement,
    RiskManagementG,
    Setting,
    SettingG,
} from "./Svgs";
import AlertPopup from "./Popups/AlertPopup";

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname;
    const [popup, setPopup] = useState(false);

    const handleLogout = () => {
        setPopup(true);
    };

    const confirmLogout = () => {
        setPopup(false);
        console.log("User logged out");
    };

    return (
        <>
            <div className="bg-[#1D1D1D] w-[260px] h-screen pl-9 pr-[2px] py-5 flex flex-col justify-between fixed top-0 left-0 transition-transform duration-300 overflow-auto space-y-8 custom__scrollbar">
                <div>
                    <img src="/images/logo.svg" alt="Banner" className="w-[110px] h-auto" />

                    <div className="space-y-5 pt-8">
                        {[
                            { to: "/", label: "Dashboard", icon: <DashboardIcon />, activeIcon: <DashboardIconG /> },
                            { to: "/analytics", label: "Analytics", icon: <AnalyticsIcon />, activeIcon: <AnalyticsIconG /> },
                            { to: "/global-kyc", label: "Global Kyc", icon: <GlobalKyc />, activeIcon: <GlobalKycG /> },
                            { to: "/risk-management", label: "Risk Management", icon: <RiskManagement />, activeIcon: <RiskManagementG /> },
                            { to: "/reports", label: "Reports", icon: <ReportsIcon />, activeIcon: <ReportsIconG /> },
                            { to: "/account", label: "Account", icon: <Account />, activeIcon: <AccountG /> },
                            { to: "/setting", label: "Setting", icon: <Setting />, activeIcon: <SettingG /> },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center gap-2.5 cursor-pointer py-1 relative"
                            >
                                    {(link.to === "/global-kyc" && (path === "/global-kyc" || path === "/list-kyc"))
                                        ? link.activeIcon
                                        : (path === link.to ? link.activeIcon : link.icon)
                                    }
                                    <h4
                                        className={`text-sm ${
                                            (link.to === "/global-kyc" && (path === "/global-kyc" || path === "/list-kyc"))
                                                ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FF842D] to-[#FF2D55]"
                                                : (path === link.to ? "text-white" : "text-[#9CA3AF]")
                                        }`}
                                    >
                                        {link.label}
                                    </h4>
                                    {(link.to === "/global-kyc" && (path === "/global-kyc" || path === "/list-kyc")) && (
                                        <div className="w-[6px] h-full absolute rounded-3xl rounded-r-none bg-gradient-to-r from-[#FF842D] to-[#FF2D55] right-0"></div>
                                    )}
                                    {(link.to !== "/global-kyc" && path === link.to) && (
                                        <div className="w-[6px] h-full absolute rounded-3xl rounded-r-none bg-gradient-to-r from-[#FF842D] to-[#FF2D55] right-0"></div>
                                    )}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleLogout}>
                    <LogoutIconG />
                    <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF842D] to-[#FF2D55]">
                        Logout
                    </p>
                </div>
            </div>

            {popup && (
                <AlertPopup
                    onConfirm={confirmLogout}
                    onCancel={() => setPopup(false)}
                />
            )}
        </>
    );
};

export default Sidebar;

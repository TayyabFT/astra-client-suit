import React, { useEffect, useState } from 'react';
import MethodDistribution from '../../components/MethodDestribution';
import BarChart from '../../components/Charts/BarChart';
import FilterButtonGradientInner from '../../components/Common/FilterButtonGradientInner';
import CustomerOnboardingAnalytics from '../../components/Tables/CustomerOnboardingAnalytics';
import { useNavigate } from 'react-router-dom';

const buttonValues = ['Yearly', 'Monthly', 'Weekly'];

const Analytics = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    const [selectedRange, setSelectedRange] = useState('yearly');

    const handleFilterClick = (value) => {
        setSelectedRange(value.toLowerCase());
    };

    return (
        <div className="space-y-5">
            <div className="grid xl:grid-cols-2 gap-4 w-full">
                <div className="bg-[#1D1D1D] w-full rounded-md space-y-2">
                    <div className="px-4 py-3 space-y-2">
                        <h2 className="text-[#F9FAFB] font-semibold text-lg">
                            New Customer Trends
                        </h2>
                        <div className="flex gap-2 flex-wrap">
                            {buttonValues.map((item, index) => (
                                <FilterButtonGradientInner
                                    key={index}
                                    text={item}
                                    selected={selectedRange === item.toLowerCase()}
                                    onClick={() => handleFilterClick(item)}
                                />
                            ))}
                        </div>
                    </div>
                    <BarChart range={selectedRange} />
                </div>
                <MethodDistribution title="Method Distribution" colorHeading />
            </div>
            <CustomerOnboardingAnalytics />
        </div>
    );
};

export default Analytics;

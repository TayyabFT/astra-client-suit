import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const BarChart = ({ range }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/analytics/customer-trends/bar/?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8&range=${range}`
            );

            console.log('API Response:', response.data);

            const apiData = response?.data?.data || {};

            const formattedData = Object.entries(apiData).map(([month, value]) => ({
                name: month,
                value: value,
            }));

            setData(formattedData);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [range]);

    return (
        <div className="w-full h-[140px] sm:h-[220px] overflow-hidden flex items-center justify-center">
            {loading ? (
                <p className="text-center text-[#9CA3AF] text-xs">Loading...</p>
            ) : data.length === 0 ? (
                <p className="text-center text-[#9CA3AF] text-xs">No data available</p>
            ) : (
                <ResponsiveContainer width="100%">
                    <ReBarChart data={data} barCategoryGap={6}>
                        <defs>
                            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF842D" />
                                <stop offset="100%" stopColor="#FF2D55" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid stroke="transparent" />
                        <XAxis
                            dataKey="name"
                            stroke="#aaa"
                            tick={{ fontSize: 10, fill: '#9CA3AF' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#aaa"
                            tick={{ fontSize: 10, fill: '#9CA3AF' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Bar dataKey="value" fill="url(#colorBar)" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default BarChart;

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const FlaggedSourceBarChart = () => {
  const [data, setData] = useState([]);
  const [labelLimit, setLabelLimit] = useState(12);
  const [barGap, setBarGap] = useState(12);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/analytics/flagged-source-breakdown?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`
      );

      console.log('✅ API Response:', response.data);

      const formattedData = (response.data.data || []).map((item) => ({
        name: item.source,
        value: item.count,
      }));

      setData(formattedData);
    } catch (error) {
      console.error('❌ Error fetching flagged source data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setLabelLimit(6);
        setBarGap(4);
      } else if (width < 768) {
        setLabelLimit(9);
        setBarGap(8);
      } else {
        setLabelLimit(12);
        setBarGap(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-[180px] sm:h-[220px] overflow-hidden flex items-center justify-center">
      {loading ? (
        <p className="text-center text-[#9CA3AF] text-xs">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-[#9CA3AF] text-xs">No data available</p>
      ) : (
        <ResponsiveContainer width="100%">
          <ReBarChart data={data} barCategoryGap={barGap}>
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
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickFormatter={(value) =>
                value.length > labelLimit ? value.slice(0, labelLimit) + '…' : value
              }
            />
            <YAxis
              stroke="#aaa"
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 10, 20, 30, 40, 50]}
            />
            <Bar dataKey="value" fill="url(#colorBar)" radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FlaggedSourceBarChart;

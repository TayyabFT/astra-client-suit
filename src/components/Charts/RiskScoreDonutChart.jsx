'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#FF6E5E', 'url(#gradientLaptop)', '#B83CDB', '#FF2D55'];

const renderCustomLabel = ({
  cx, cy, midAngle, outerRadius, percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {(percent * 100).toFixed(2)}%
    </text>
  );
};

const ColorInfo = ({ heading, className }) => (
  <div className="flex items-center gap-3">
    <span className={`rounded-sm w-5 h-2.5 ${className}`}></span>
    <p className="text-[#D1D5DB] text-xs">{heading}</p>
  </div>
);

const RiskScoreDonutChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/analytics/flagged-source-percentages?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`
      );

      if (res.data?.status === 'success') {
        const formatted = res.data.data.map((item) => ({
          name: item.source,
          value: item.percentage,
        }));
        setData(formatted);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="bg-[#1D1D1D] w-full rounded-md space-y-2 z-10 relative">
      <div className="px-4 py-3">
        <h2 className="text-[#F9FAFB] font-semibold text-lg">Risk Score Source</h2>

        {loading ? (
          <p className="text-center text-[#9CA3AF] text-xs py-4">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-[#9CA3AF] text-xs py-4">No data available</p>
        ) : (
          <div className="flex items-center gap-6 flex-wrap sm:flex-row flex-col">
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="h-[220px] w-full overflow-hidden">
                <ResponsiveContainer width="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="gradientLaptop" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FF842D" />
                        <stop offset="100%" stopColor="#FF2D55" />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={data}
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      labelLine
                      label={renderCustomLabel}
                      paddingAngle={0}
                      stroke="none"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4 sm:max-w-[200px] w-full">
              {data.map((item, i) => (
                <ColorInfo
                  key={i}
                  heading={item.name}
                  className={
                    i === 0
                      ? 'bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'
                      : 'bg-[#FF6E5E]'
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskScoreDonutChart;

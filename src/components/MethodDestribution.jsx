'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Laptop', value: 28.96 },
  { name: 'Mobile', value: 52.58 },
  { name: 'Others', value: 18.14 },
];

const COLORS = ['#FF6E5E', 'url(#gradientLaptop)', '#B83CDB'];

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

const ColorInfo = ({ heading, className }) => {
  return (
    <div className="flex items-center gap-3">
      <span className={`rounded-sm w-5 h-2.5 ${className}`}></span>
      <p className="text-[#D1D5DB] text-xs">{heading}</p>
    </div>
  );
};

const MethodDistribution = ({ title, colorHeading }) => {
  return (
    <div className="bg-[#1D1D1D] w-full rounded-md space-y-2 z-10 relative">
      <div className="px-4 py-3">
        <h2 className="text-[#F9FAFB] font-semibold text-lg">{title}</h2>
        <div className="flex items-center gap-6 flex-wrap flex-col sm:flex-row">
          <div className="w-full h-[300px] sm:h-[250px] flex items-center justify-center sm:flex-1 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
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
          {
            colorHeading ?
              <div className="space-y-4 flex-1 sm:max-w-[160px] w-full">
                <ColorInfo heading="Laptop" className="bg-gradient-to-r from-[#FF842D] to-[#FF2D55]" />
                <ColorInfo heading="Mobile" className="bg-[#FF6E5E]" />
                <ColorInfo heading="Other" className="bg-[#B83CDB]" />
              </div>
              :
              ''
          }
        </div>
      </div>
    </div>
  );
};

export default MethodDistribution;

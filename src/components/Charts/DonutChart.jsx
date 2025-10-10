'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import ViewAllButton from '../Common/ViewAllButton';

const data = [
  { name: 'A', value: 40.29 },
  { name: 'B', value: 26.53 },
  { name: 'C', value: 20.88 },
  { name: 'D', value: 12.5 },
];

const COLORS = ['#E76000', '#FF842D', '#FFA05E', '#FFC49B'];

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

const ColorInfo = ({heading, color}) => {
  return (
    <div className='flex items-center gap-2'>
      <span
        className='rounded-sm w-5 h-2.5'
        style={{ backgroundColor: color }}
      ></span>
      <p className='text-[#D1D5DB] text-xs'>{heading}</p>
    </div>
  );
};

const DonutChart = () => {
  return (
    <div className="w-full bg-[#FFFFFF0D] rounded-xl py-5 ">
      <div className="flex items-center justify-between w-full pb-6 relative px-5">
        <h3 className="text-[#F9FAFB] font-semibold text-lg">Risk Monitoring</h3>
        <ViewAllButton href='/risk-management'/>
      </div>
      <div className="h-[250px] overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              labelLine={true}
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
      <div className='space-y-2 px-5 pt-5'>
        <ColorInfo heading="Flagged Events Open" color="#E76000" />
        <ColorInfo heading="Flagged Events Closed" color="#FF842D" />
        <ColorInfo heading="Verification Locations" color="#FFA05E" />
        <ColorInfo heading="Post Verification user access revocation" color="#FFC49B" />
      </div>
    </div>
  );
};

export default DonutChart;

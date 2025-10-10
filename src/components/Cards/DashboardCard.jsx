import React from 'react';

const DashboardCard = ({ icon: Icon, value, title, gradient }) => {
  return (
    <div className="rounded-xl p-[1px] w-full flex items-center h-[116px] justify-center relative" style={{
      background: `linear-gradient(180deg, ${gradient})`,
    }}>
      <div className="w-full h-full rounded-xl flex items-center justify-center gap-8 lg:gap-4 2xl:gap-8 bg-[#1D1D1D]">
        <span className="flex items-center justify-center">
          {Icon}
        </span>
        <div className='space-y-0.5'>
          <h3 className="text-[#F9FAFB] text-2xl font-medium text-center">{value}</h3>
          <p className="text-[#9CA3AF] text-sm text-center">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

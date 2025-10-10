'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import ViewAllButton from '../Common/ViewAllButton';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('userName', {
    header: 'User Name',
    cell: info => (
      <div className="flex items-center gap-2 flex-[2]">
        <div className="rounded-full size-8 bg-[#2D2D2D] flex items-center justify-center">
          <img src={info.row.original.img} className='h-[32px]' alt="" />
        </div>
        <p className="text-xs">{info.getValue()}</p>
      </div>
    ),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => <div className="text-center flex-1">{info.getValue()}</div>,
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => <div className="text-center flex-1">{info.getValue()}</div>,
  }),
  columnHelper.accessor('level', {
    header: 'Level',
    cell: info => <div className="text-center flex-1">{info.getValue()}</div>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      const statusStyles = {
        Success: 'bg-[#0EAA0433] text-[#0EAA04]',
        Pending: 'bg-[#FF842D33] text-[#FF842D]',
        Failed: 'bg-[#FF2D5533] text-[#FF2D55]',
      };

      return (
        <div className="flex-1 text-end">
          <button className={`rounded-md cursor-default px-4 py-2 text-[13px] ${statusStyles[status]}`}>
            {status}
          </button>
        </div>
      );
    },
  }),
];

const data = [
  {
    userName: 'Alice Johnson',
    img: '/images/user.svg',
    type: 'Admin',
    date: '2025-06-25',
    level: 'Level 1',
    status: 'Success',
  },
  {
    userName: 'Bob Smith',
    img: '/images/user.svg',
    type: 'Editor',
    date: '2025-06-24',
    level: 'Level 2',
    status: 'Pending',
  },
  {
    userName: 'Carol Lee',
    img: '/images/user.svg',
    type: 'User',
    date: '2025-06-23',
    level: 'Level 3',
    status: 'Failed',
  },
  {
    userName: 'Daniel Craig',
    img: '/images/user.svg',
    type: 'User',
    date: '2025-06-22',
    level: 'Level 1',
    status: 'Success',
  },
  {
    userName: 'Emma Watson',
    img: '/images/user.svg',
    type: 'Admin',
    date: '2025-06-21',
    level: 'Level 2',
    status: 'Failed',
  },
];

const ReactTable = ({ heading }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-[#FFFFFF0D] backdrop-blur-[80px] rounded-md w-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5">
        <h3 className="text-[#F9FAFB] font-semibold text-lg">{heading}</h3>
        <ViewAllButton/>
      </div>
      <div className="w-full flex gap-1 items-center text-xs bg-[#2D2D2D] text-[#9CA3AF] px-4 py-3 uppercase font-medium">
        {table.getHeaderGroups().map(headerGroup =>
          headerGroup.headers.map((header, index) => (
            <div
              key={header.id}
              className={`${index === 0 ? 'flex-[2]' : 'flex-1'} text-center first:text-start last:text-start`}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          ))
        )}
      </div>
      <div className='overflow-auto'>  
        <div className="h-[166px] overflow-y-auto space-y-2 py-2 px-4 custom__scrollbar min-w-[500px] w-full">
          {table.getRowModel().rows.map(row => (
            <div
              key={row.id}
              className="flex gap-1 items-center text-xs text-[#D1D5DB]"
            >
              {row.getVisibleCells().map((cell, index) => (
                <div
                  key={cell.id}
                  className={`${index === 0 ? 'flex-[2]' : 'flex-1'} text-center first:text-start last:text-end`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactTable;

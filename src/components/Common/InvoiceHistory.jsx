import React from 'react'
import { DownloadIcon, FilterIcon } from '../Svgs'

const data = [
    {
        id: '23569',
        date: '21 June 2025',
        plan: 'Basic',
        amount: '55.98',
        status: 'Paid',
    },
    {
        id: '23569',
        date: '21 June 2025',
        plan: 'Enterprise',
        amount: '55.98',
        status: 'Paid',
    },
    {
        id: '23569',
        date: '21 June 2025',
        plan: 'Basic',
        amount: '55.98',
        status: 'Payment Due',
    },
    {
        id: '23569',
        date: '21 June 2025',
        plan: 'Basic',
        amount: '55.98',
        status: 'Payment Due',
    },
    {
        id: '23569',
        date: '21 June 2025',
        plan: 'Basic',
        amount: '55.98',
        status: 'Paid',
    },
]

const InvoiceHistory = () => {
    return (
        <div className='bg-[#252525BF] w-full rounded-md'>
            <div className='px-4 py-3 flex items-center justify-between'>
                <h2 className='text-[#F9FAFB] font-semibold text-lg'>Customer Onboarding</h2>
                <span className='flex items-center justify-center size-5'>
                    <FilterIcon />
                </span>
            </div>
            <div className='overflow-auto'>
                <div className="min-w-[800px] w-full">
                    <div className="uppercase flex items-center w-full text-[12px] bg-[#2D2D2D] text-[#9CA3AF] px-5 py-2.5">
                        <div className="flex-1 font-medium text-start">Invoice ID</div>
                        <div className="flex-1 font-medium text-center">Date</div>
                        <div className="flex-1 font-medium text-center">Plan</div>
                        <div className="flex-1 font-medium text-center">Amount</div>
                        <div className="flex-1 font-medium text-center">Status</div>
                        <div className="flex-1 font-medium text-end">Download</div>
                    </div>
                    <div className='overflow-y-auto w-full py-1'>
                        {
                            data.map((itm, index) => (
                                <div key={index} className="text-[#D1D5DB] text-xs py-2 w-full flex items-center px-5">
                                    <div className="flex-1 text-start">#{itm.id}</div>
                                    <div className="flex-1 text-center">{itm.date}</div>
                                    <div className="flex-1 text-center">{itm.plan}</div>
                                    <div className="flex-1 text-center">${itm.amount}</div>
                                    <div className="flex-1 text-center">
                                        <button className={`rounded-md ${itm.status === 'Paid' ? 'bg-[#0EAA0433] text-[#2BD72C]' : 'bg-[#FF842D33] text-[#FF842D]'} cursor-default max-w-[120px] mx-auto w-full py-2 text-[13px]`}>
                                            {itm.status}
                                        </button>
                                    </div>
                                    <div className='flex-1 flex items-center justify-end'>
                                        <button className='rounded-lg px-4 py-2 cursor-pointer text-[13px] text-end flex items-center gap-2 bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'>
                                            <DownloadIcon />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceHistory

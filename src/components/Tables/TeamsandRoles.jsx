import React from 'react'
import { EditIcon, DeleteIcon2, PasswordHideIcon } from '../Svgs'
import Pagination from '../Common/Pagination'
const data = [
    {
        id: 'John Smith',
        date: 'john@company.com',
        plan: 'Admin',
        score: '2 hours ago',
        status: 'Active',
    },
    {
        id: 'Sarah Johnson',
        date: 'sarah@company.com',
        plan: 'Super User',
        score: 'Yesterday',
        status: 'Active',
    },
    {
        id: 'Mike Wilson',
        date: 'mike@company.com',
        plan: 'User',
        score: 'Last Week',
        status: 'Suspended',
    },
    {
        id: 'Fatima Sheikh',
        date: 'Driving License',
        plan: 'User',
        score: 'Never',
        status: 'Active',
    },

]

const TeamsandRoles = () => {

    return (
        <div className='bg-[#252525BF] w-full rounded-md justify-center'>
            <div className='px-4 py-3 flex items-center justify-between'>
                <h2 className='text-[#F9FAFB] flex-row font-semibold text-lg'>Teams and Roles</h2>
                <div className='flex items-center gap-3'>
                    <div className='bg-gradient-to-r from-[#505050] to-[#363636] p-[1px] rounded-lg'>
                        <div className='bg-[#292929] rounded-lg px-3 py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer'>
                            <PasswordHideIcon />
                            <p className='text-[#959595]'>Role Permissions</p>
                        </div>
                    </div>
                    <div className='bg-gradient-to-r from-[#FF842D] to-[#FF2D55] p-[1px] rounded-lg'>
                        <div className='bg-[#292929] rounded-lg px-3 py-2.5 text-xs cursor-pointer text-white'>
                            + Invite Member
                        </div>
                    </div>
                </div>
            </div>

            <div className='overflow-auto'>
                <div className="min-w-[800px] w-full">
                    <div className="uppercase flex items-center w-full text-[12px] bg-[#2D2D2D] text-[#9CA3AF] px-5 py-2.5">
                        <div className="flex-1 font-medium text-start">Name</div>
                        <div className="flex-1 font-medium text-center">Email</div>
                        <div className="flex-1 font-medium text-center">Role</div>
                        <div className="flex-1 font-medium text-center">Last Login</div>
                        <div className="flex-1 font-medium text-center">Status</div>
                        <div className="flex-1 font-medium text-end">Actions</div>
                    </div>
                    <div className='overflow-y-auto w-full py-1'>
                        {
                            data.map((itm, index) => (
                                <div key={index} className="text-[#D1D5DB] text-xs py-2 w-full flex items-center px-5">
                                    <div className='flex-1 flex items-center gap-2'>
                                        <div className="rounded-full size-7 bg-[#2D2D2D] flex items-center justify-center overflow-hidden">
                                            {itm.img ? (
                                                <img src={itm.img} className='w-7 h-7 object-cover rounded-full' alt={itm.id} />
                                            ) : (
                                                <span className="text-xs text-[#9CA3AF]">
                                                    {itm.id.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-start">{itm.id}</div>
                                    </div>
                                    <div className="flex-1 text-center">{itm.date}</div>
                                    <div className="flex-1 text-center">{itm.plan}</div>
                                    <div className="flex-1 text-center">{itm.score}</div>
                                    <div className="flex-1 text-center">
                                        <button className={`rounded-md ${itm.status === 'Active' ? 'bg-[#0EAA0433] text-[#2BD72C]' : 'bg-[#FF842D33] text-[#FF842D]'} cursor-default max-w-[120px] mx-auto w-full py-2 text-[13px]`}>
                                            {itm.status}
                                        </button>
                                    </div>
                                    <div className='flex-1 flex items-center justify-end gap-4'>
                                        <div className='cursor-pointer'>
                                            <EditIcon className="!fill-[#8E8E8E]" />
                                        </div>
                                        <div className='cursor-pointer'>
                                            <DeleteIcon2 />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between w-full px-4 py-3 mt-3'>
                <p className='text-[#8E8E8E] text-xs'>Showing 1 to 4 of 120 members</p>
                <Pagination />
            </div>
        </div>
    )
}

export default TeamsandRoles

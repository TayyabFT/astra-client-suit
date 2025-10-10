import React, { useEffect, useState } from 'react'
import { ActiveUserIcon } from '../../components/Svgs'
import Input from '../../components/Common/Input'
import TextArea from '../../components/Common/TextArea'
import CustomDropDown from '../../components/Common/CustomDropdown'
import ProgressBar from '../../components/Common/ProgressBar'
import PaymentMethod from '../../components/Common/PaymentMethod'
import InvoiceHistory from '../../components/Common/InvoiceHistory'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    const [profileInfo, setProfileInfo] = useState('')
    const [loading, setLoading] = useState(false)
    // 
    const [name, setName] = useState('')
    const [contactNamed, setContactName] = useState('')
    const [email, setEmail] = useState('')
    const [businessAddress, setBusinessAddress] = useState('')

    const fetchProfileInfo = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/organization/94114855-618e-4c19-866e-92d2642271b8`
            );

            const data = response.data.data;
            const contact = data.contactName

            setProfileInfo(data);
            setName(data.name);
            setEmail(data.email);
            setContactName(contact);
            setBusinessAddress(data.businessAddress);
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    useEffect(() => {
        fetchProfileInfo();
    }, []);



    const updateProfileInfo = async () => {
        try {
            setLoading(true)
            const payload = {
                name,
                email,
                contactNamed,
                businessAddress,
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/organization/94114855-618e-4c19-866e-92d2642271b8`,
                payload
            );

            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };



    return (
        <div className='space-y-4'>
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-5'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[#F9FAFB] font-semibold text-lg'>Profile Information</h2>
                    <div className={`max-w-max rounded-md ${profileInfo.status === 'active' ? 'bg-[#0EAA0433] text-[#0EAA04]' : 'bg-red-400 text-red-800'} text-xs flex items-center gap-1 py-2 px-3`}>
                        <ActiveUserIcon />
                        {profileInfo.status}
                    </div>
                </div>
                <Input type='text' onchange={(e) => setName(e.target.value)} value={name} lable='Company/Organization Name' placeholder='Astra' />
                <div className='flex items-center gap-5 flex-col sm:flex-row'>
                    <Input type='text' onchange={(e) => setContactName(e.target.value)} value={contactNamed} lable='Primary Contact Name' placeholder='Ellis' />
                    <Input type='email' onchange={(e) => setEmail(e.target.value)} value={email} lable='Email Address' placeholder='Ellis@astra.com ' />
                </div>
                <div className='flex items-center gap-5 flex-col sm:flex-row'>
                    <Input type='text' lable='Phone Number' placeholder='+1 (555) 123-4567' />
                    <Input type='text' value={new Date(profileInfo.accountCreationDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", })} lable='Account Creation Date' placeholder='March 15,2024' />
                </div>
                <div className='grid sm:grid-cols-2 gap-5'>
                    <TextArea value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} lable='Business Address' placeholder='123 Business Ave, Suite 100 New york, NY 10001 United States' />
                    <div className='flex items-end justify-end gap-3 h-full'>
                        <div className='p-[1px] bg-gradient-to-r from-[#FF842D] to-[#FF2D55] rounded-md cursor-pointer'>
                            <div onClick={updateProfileInfo} className='bg-gradient-to-r from-[#FF842D] to-[#FF2D55] rounded-md h-full text-white text-xs w-full py-2.5 px-12'>
                                {loading ? 'Loading' : 'Save'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-[#FFFFFF0D] p-5 rounded-md space-y-8'>
                <div className='space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[#F9FAFB] font-semibold text-lg'>Profile Information</h2>
                        <div className='bg-gradient-to-r from-[#0EAA04] to-[#0EAA04] rounded-md h-full text-white text-xs py-2.5 px-4'>
                            Upgrade Plan
                        </div>
                    </div>
                    <div className='space-y-2.5'>
                        <p className='text-xs cursor-default text-[#E0E0E0]'>Current Plan</p>
                        <CustomDropDown
                            items={[
                                'Basic',
                                'Enterprise',
                            ]}
                            placeholder='Basic'
                            className='w-full'
                            form
                        />
                    </div>
                    <div className='flex items-center gap-5 flex-col sm:flex-row'>
                        <Input type='text' lable='Next Billing Date' placeholder='July 15, 2025' />
                        <Input type='text' lable='Billing Cycle' placeholder='Annual - $990/year (Save 17%)' />
                    </div>
                    <div className='grid sm:grid-cols-2 gap-5'>
                        <PaymentMethod lable='Payment Method' placeholder='*** *** **** 4567 (Visa)' />
                        <ProgressBar label='Usage Statistics' current={6500} max={10000} />
                    </div>
                </div>
                <div className='space-y-8'>
                    <InvoiceHistory />
                    <div className='flex items-center justify-end gap-3 h-full'>
                        <div className='p-[1px] bg-gradient-to-r from-[#919191] to-[#7F7F7F] rounded-md cursor-pointer'>
                            <div className='bg-[#292929] rounded-md h-full text-white text-xs w-full py-2.5 px-10'>
                                Cancel
                            </div>
                        </div>
                        <div className='p-[1px] bg-gradient-to-r from-[#FF842D] to-[#FF2D55] rounded-md cursor-pointer'>
                            <div className='bg-gradient-to-r from-[#FF842D] to-[#FF2D55] rounded-md h-full text-white text-xs w-full py-2.5 px-12'>
                                Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account

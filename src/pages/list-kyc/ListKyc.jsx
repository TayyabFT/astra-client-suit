import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomDropDown from '../../components/Common/CustomDropdown';
import KycCardBlur from '../../components/Common/KycCardBlur';
import { AMLBlurIcon, FailedKycBlurIcon, FlagsBlurIcon, RiskBlurIcon, SuccessKycBlurIcon, TotalKycIcon, UsersBlurIcon } from '../../components/Svgs';
import ReactTable from '../../components/Tables/ReactTable';
import CustomerOnboarding from '../../components/Tables/CustomerOnboarding';
import axios from 'axios';
import CustomerOnboardingRiskManagement from '../../components/Tables/CustomerOnboardingRiskManagement';

const ListKyc = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    const [KYCData, setKYCData] = useState('');
    const [data, setData] = useState({})
    const [selectedCountry, setSelectedCountry] = useState('')
    const [availableCountries, setAvailableCountries] = useState([])

    const fetchData = async (country = '') => {
        try {
            let url = `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`
            if (country) {
                url += `&country=${country}`
            }
            const response = await axios.post(url)
            setKYCData(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData2 = async (country = '') => {
        try {
            let url = `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/compliance/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`
            if (country) {
                url += `&country=${country}`
            }
            const response = await axios.post(url)
            setData(response.data.data || {})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData2()
    }, [])

    const fetchAvailableCountries = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc-customers?organizationId=55210fb6-f1bc-48ce-a4d6-d999e9ebd424`
            );

            if (response.data.status === 'success' && response.data.data) {
                const customers = response.data.data;

                const uniqueCountries = [...new Set(
                    customers
                        .map(customer => customer.country)
                        .filter(country => country && country.trim() !== '') // Filter out null, undefined, or empty countries
                )];

                setAvailableCountries(uniqueCountries);
            }
        } catch (error) {
            console.log('Error fetching available countries:', error);
        }
    }

    // Fetch available countries on component mount
    useEffect(() => {
        fetchAvailableCountries();
    }, [])


    return (
        <div className='space-y-7'>
            <div className='flex justify-between md:grid grid-cols-3 sm:gap-2 items-center'>
                <h3 className='text-[#F9FAFB] text-sm sm:block hidden'>Global Kyc</h3>
                <div className='flex items-center gap-1.5 sm:gap-2 justify-center'>
                    <Link to='/global-kyc' className='p-[1px] rounded-full sm:rounded-md cursor-pointer bg-gradient-to-r from-[#CDCDCD] to-[#BEBEBE] sm:from-[#FF842D] sm:to-[#FF2D55]'>
                        <div className='bg-[#2C2C2C] sm:bg-[#111111] text-sm text-white px-3 sm:px-5 py-1.5 rounded-full sm:rounded-md'>
                            Global View
                        </div>
                    </Link>
                    <div className='p-[1px] rounded-full sm:rounded-md cursor-pointer bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'>
                        <div className='bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-sm text-white px-3 sm:px-5 py-1.5 rounded-full sm:rounded-md'>
                            List View
                        </div>
                    </div>
                </div>
                <div className='relative flex items-center justify-end'>
                    <CustomDropDown
                        items={availableCountries}
                        placeholder={availableCountries.length > 0 ? 'Select Country' : 'Loading...'}
                        onSelect={(item) => {
                            setSelectedCountry(item);
                            fetchData(item);
                            fetchData2(item);
                        }}
                    />
                </div>
            </div>
            <div className="space-y-1 sm:hidden block">
                <h3 className="text-[#F9FAFB] text-sm">Global Kyc</h3>
                <p className="font-medium text-3xl text-[#F9FAFB]">12,000</p>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
                <KycCardBlur className='w-full' icon={<TotalKycIcon />} title='Total KYC Requests' value={KYCData.pendingRequests || 0} />
                <KycCardBlur className='w-full' icon={<SuccessKycBlurIcon />} title='KYC Successful' value={KYCData.verifiedRequests || 0} />
                <KycCardBlur className='w-full' icon={<FailedKycBlurIcon />} title='KYC Processing' value={KYCData.pendingRequests || 0} />
                <KycCardBlur className='w-full' icon={<FailedKycBlurIcon />} title='KYC Failed' value={KYCData.failedRequests || 0} />
            </div>
            <div className='space-y-3'>
                <h3 className='text-[#F9FAFB] text-sm'>Risk Management Suite</h3>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
                    <KycCardBlur className='w-full' icon={<RiskBlurIcon />} title='Risk Score' value={data?.riskScorePercentage || '0'} />
                    <KycCardBlur className='w-full' icon={<UsersBlurIcon />} title='Post Verification user access revocation Rate' value={data?.postRevocationRate || '0'} />
                    <KycCardBlur className='w-full' icon={<FlagsBlurIcon />} title='Number of new Flags' value={data?.newFlags?.count || '0'} />
                    <KycCardBlur className='w-full' icon={<AMLBlurIcon />} title='AML Requests' value={data?.amlRequests?.total || '0'} />
                </div>
            </div>
            <div className='w-full grid lg:grid-cols-2 gap-4'>
                <CustomerOnboarding countryFilter={selectedCountry} />
                <CustomerOnboardingRiskManagement countryFilter={selectedCountry} />
            </div>
        </div>
    )
}

export default ListKyc

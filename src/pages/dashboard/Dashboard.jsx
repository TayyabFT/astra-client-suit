import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";
import ViewAllButton from '../../components/Common/ViewAllButton'
import { KycFIcon, KycPIcon, KycRIcon, KycSIcon } from '../../components/Svgs';
import KycTrendChart from '../../components/Charts/KycTrendChart';
import GlobalReview from '../../components/Charts/GlobalReview';
import CustomerOnboarding from '../../components/Tables/CustomerOnboarding';
import DonutChart from '../../components/Charts/DonutChart';
import DashboardCard from '../../components/Cards/DashboardCard';
import FilterButtonGradient from '../../components/Common/FilterButtonGradient';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const buttonValues = [
  'All',
  '1 hour',
  '24 hours',
  '7 days',
  '30 days',
  '90 days',
  '1 year',
]

const Dashboard = () => {
  const [KYCData, setKYCData] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const labelToTime = (label) => {
    switch (label) {
      case '1 hour':
        return '1h'
      case '24 hours':
        return '24h'
      case '7 days':
        return '7d'
      case '30 days':
        return '30d'
      case '90 days':
        return '90d'
      case '1 year':
        return '365d'
      default:
        return null
    }
  }

const fetchData = async () => {
  try {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc/analytics`;
    const organizationId = localStorage.getItem('organizationId');
    const token = localStorage.getItem('token'); // ✅ token from localStorage

    const url = selectedTime
      ? `${baseUrl}?organizationId=${organizationId}&time=${selectedTime}`
      : `${baseUrl}?organizationId=${organizationId}`;

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
      }
    );

    setKYCData(response.data.data);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    fetchData();
  }, [selectedTime]);

  return (
    <section className='space-y-4 md:space-y-5'>
      <h2 className="text-[#F9FAFB] font-medium text-xl">Compliance</h2>
      <div className='flex items-center justify-between'>
        <div className="flex gap-2 max-w-[320px] md:max-w-[800px] overflow-x-auto whitespace-nowrap custom__scrollbar">
          {buttonValues.map((item, index) => (
            <FilterButtonGradient
              key={index}
              text={item}
              selected={(selectedTime === null && item === 'All') || selectedTime === labelToTime(item)}
              onClick={() => setSelectedTime(labelToTime(item))}
            />
          ))}
        </div>
        <ViewAllButton to='/analytics' />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

        <DashboardCard
          icon={<KycRIcon />}
          value={KYCData.pendingRequests || 0}
          title={'Total KYC Requests'}
          gradient={'#67676754, #ff3d22, #67676754'}
        />
        <DashboardCard
          icon={<KycSIcon />}
          value={KYCData.verifiedRequests || 0}
          title={'KYC Successful'}
          gradient={'#67676754, #1EA51F, #67676754'}
        />
        <DashboardCard
          icon={<KycPIcon />}
          value={KYCData.pendingRequests || 0}
          title={'KYC Processing'}
          gradient={'#67676754, #8237FF, #67676754'}
        />
        <DashboardCard
          icon={<KycFIcon />}
          value={KYCData.failedRequests || 0}
          title={'KYC Failed'}
          gradient={'#67676754, #FF749F, #67676754'}
        />

      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <KycTrendChart selectedFilter={selectedTime} />
        <GlobalReview timeFilter={selectedTime} />
      </div>
      <div className="flex gap-4 w-full xl:flex-row flex-col-reverse">
        <div className="w-full xl:flex-[7]">
          <CustomerOnboarding timeFilter={selectedTime} />
        </div>
        <div className="w-full xl:flex-[3]">
          <DonutChart />
        </div>
      </div>
    </section>
  )
}

export default Dashboard

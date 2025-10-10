import React, { useEffect, useState } from 'react'
import RiskScoreDonutChart from '../../components/Charts/RiskScoreDonutChart'
import CustomerOnboardingRiskManagement from '../../components/Tables/CustomerOnboardingRiskManagement'
import { AMLBlurIcon, FlagsBlurIcon, RiskBlurIcon, UsersBlurIcon } from '../../components/Svgs'
import FlaggedSourceBarChart from '../../components/Charts/FlaggedSourceBarChart'
import KycCardBlur from '../../components/Common/KycCardBlur'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RiskManagement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const [data, setData] = useState({})

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/compliance/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`
      )
      setData(response.data.data || {})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
        <KycCardBlur
          className='w-full'
          icon={<RiskBlurIcon />}
          title='Risk Score'
          value={data?.riskScorePercentage || '0'}
        />
        <KycCardBlur
          className='w-full'
          icon={<UsersBlurIcon />}
          title='Post Verification user access revocation Rate'
          value={data?.postRevocationRate || '0'}
        />
        <KycCardBlur
          className='w-full'
          icon={<FlagsBlurIcon />}
          title='Number of new Flags'
          value={data?.newFlags?.count || '0'}
        />
        <KycCardBlur
          className='w-full'
          icon={<AMLBlurIcon />}
          title='AML Requests'
          value={data?.amlRequests?.total || '0'}
        />
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 w-full'>
        <div className='bg-[#1D1D1D] w-full rounded-md space-y-2'>
          <div className='px-4 py-3'>
            <h2 className='text-[#F9FAFB] font-semibold text-lg'>
              Flagged Source Breakdown
            </h2>
          </div>
          <FlaggedSourceBarChart />
        </div>
        <RiskScoreDonutChart />
      </div>

      <CustomerOnboardingRiskManagement action />
    </div>
  )
}

export default RiskManagement

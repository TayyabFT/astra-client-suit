'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Failed, Success } from '../Svgs'

const AxisTick = ({ x, y, payload }) => (
  <text x={x} y={y + 10} textAnchor="middle" fill="#9CA3AF" fontSize={11}>
    {payload.value}
  </text>
)

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#3D3D3D] rounded-md px-3 py-1.5 space-y-0.5">
        <p className="text-white text-[9px]">Successful: {payload[0].value}</p>
        <p className="text-white text-[9px]">Failed: {payload[1].value}</p>
      </div>
    )
  }
  return null
}

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

const KycTrendChart = ({ selectedFilter = '30 days' }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTrends = async (filter) => {
    try {
      setLoading(true)
      const period = labelToTime(filter)
      const orgId = localStorage.getItem('organizationId');

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/analytics/customer-trends/line`,
        {
          params: {
            organizationId: orgId,
            period,
          },
        }
      )

      if (response.data?.status === 'success') {
        const chartData = response.data.data.map((item) => ({
          name: item.month,
          Successful: item.successful,
          Failed: item.failed,
        }))
        setData(chartData)
      }
    } catch (err) {
      console.error('Error fetching KYC trend:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrends(selectedFilter)
  }, [selectedFilter])

  return (
    <div className="bg-[#FFFFFF0D] rounded-xl h-full">
      <div className="flex items-center justify-between w-full p-5">
        <h3 className="text-[#F9FAFB] font-semibold text-lg">KYC Trend</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Success />
            <p className="text-white text-xs">Successful</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Failed />
            <p className="text-white text-xs">Failed</p>
          </div>
        </div>
      </div>

      <div className="w-full h-[230px] sm:h-[260px] pr-3 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full text-white text-sm">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#9CA3AF33" vertical={true} horizontal={false} />
              <XAxis dataKey="name" stroke="#9CA3AF33" tick={<AxisTick />} axisLine={false} />
              <YAxis stroke="#9CA3AF33" tick={<AxisTick />} axisLine={false} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#9CA3AF33', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="Successful"
                stroke="#2BD72C"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 7,
                  stroke: '#001219',
                  strokeWidth: 2,
                  fill: '#2BD72C',
                }}
              />
              <Line
                type="monotone"
                dataKey="Failed"
                stroke="#FF2D55"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 7,
                  stroke: '#001219',
                  strokeWidth: 2,
                  fill: '#FF2D55',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default KycTrendChart

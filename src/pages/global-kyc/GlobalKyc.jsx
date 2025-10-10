'use client';

import { useEffect, useRef, useState } from 'react';
import KycCardBlur from '../../components/Cards/KycBlurCard'
import * as THREE from 'three';
import { FailedKycBlurIcon, AMLBlurIcon, FlagsBlurIcon, RiskBlurIcon, TooltipIcon, UsersBlurIcon, SuccessKycBlurIcon } from '../../components/Svgs'
import { Link, useNavigate } from 'react-router-dom';
import ReactTable from '../../components/Tables/ReactTable'
import Globe from 'react-globe.gl';
import CustomerOnboarding from '../../components/Tables/CustomerOnboarding';
import CustomerOnboardingRiskManagement from '../../components/Tables/CustomerOnboardingRiskManagement';
import axios from 'axios';


const kycData = [
  {
    country: 'Egypt',
    lat: 30.0,
    lng: 31.0,
    success: 145,
    failed: 30,
    riskScore: '60%',
    revocationRate: '0.002%',
    newFlags: '12',
    aml: '15',
  },
  {
    country: 'France',
    lat: 48.8,
    lng: 2.35,
    success: 120,
    failed: 20,
    riskScore: '70%',
    revocationRate: '0.003%',
    newFlags: '18',
    aml: '22',
  },
  {
    country: 'Kenya',
    lat: -1.3,
    lng: 36.8,
    success: 90,
    failed: 12,
    riskScore: '55%',
    revocationRate: '0.001%',
    newFlags: '8',
    aml: '10',
  },
  {
    country: 'Pakistan',
    lat: 30.3753,
    lng: 69.3451,
    success: 90,
    failed: 12,
    riskScore: '65%',
    revocationRate: '0.004%',
    newFlags: '14',
    aml: '19',
  },
];

const GlobalKyc = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);


  const globeRef = useRef();
  const containerRef = useRef();
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [globalKycData, setGlobalKycData] = useState({
    country: 'Global KYC',
    success: 0,
    failed: 0,
  });
  const [globalComplianceData, setGlobalComplianceData] = useState({
    riskScore: '0%',
    revocationRate: '0%',
    newFlags: '0',
    aml: '0',
  });
  const [countryKycData, setCountryKycData] = useState({});
  const [countryComplianceData, setCountryComplianceData] = useState({});

  const fetchGlobalKycData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`
      );
      if (response.data.status === 'success') {
        const data = response.data.data;
        setGlobalKycData({
          country: 'Global KYC',
          success: data.verifiedRequests || 0,
          failed: data.failedRequests || 0,
        });
      }
    } catch (error) {
      console.log('Error fetching global KYC data:', error);
    }
  };

  // Fetch global compliance data
  const fetchGlobalComplianceData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/compliance/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8`
      );
      if (response.data.status === 'success') {
        const data = response.data.data;
        setGlobalComplianceData({
          riskScore: data.riskScorePercentage || '0%',
          revocationRate: data.postRevocationRate || '0%',
          newFlags: data.newFlags?.count?.toString() || '0',
          aml: data.amlRequests?.total?.toString() || '0',
        });
      }
    } catch (error) {
      console.log('Error fetching global compliance data:', error);
    }
  };

  // Fetch country-specific KYC data
  const fetchCountryKycData = async (country) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8&country=${country}`
      );
      if (response.data.status === 'success') {
        const data = response.data.data;
        return {
          success: data.verifiedRequests || 0,
          failed: data.failedRequests || 0,
        };
      }
    } catch (error) {
      console.log(`Error fetching KYC data for ${country}:`, error);
    }
    return { success: 0, failed: 0 };
  };

  // Fetch country-specific compliance data
  const fetchCountryComplianceData = async (country) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/compliance/analytics?organizationId=13320b3e-6eab-4939-927f-2c9a3b4e9be8&country=${country}`
      );
      if (response.data.status === 'success') {
        const data = response.data.data;
        return {
          riskScore: data.riskScorePercentage || '0%',
          revocationRate: data.postRevocationRate || '0%',
          newFlags: data.newFlags?.count?.toString() || '0',
          aml: data.amlRequests?.total?.toString() || '0',
        };
      }
    } catch (error) {
      console.log(`Error fetching compliance data for ${country}:`, error);
    }
    return {
      riskScore: '0%',
      revocationRate: '0%',
      newFlags: '0',
      aml: '0',
    };
  };

  // Fetch available countries from kyc-customers endpoint
  const fetchAvailableCountriesData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc-customers?organizationId=55210fb6-f1bc-48ce-a4d6-d999e9ebd424`
      );

      if (response.data.status === 'success' && response.data.data) {
        const customers = response.data.data;

        // Group customers by country and extract unique countries with location data
        const countryMap = new Map();

        customers.forEach(customer => {
          if (customer.country && customer.location && customer.location.lat && customer.location.lng) {
            if (!countryMap.has(customer.country)) {
              countryMap.set(customer.country, {
                country: customer.country,
                lat: customer.location.lat,
                lng: customer.location.lng,
                customers: []
              });
            }
            countryMap.get(customer.country).customers.push(customer);
          }
        });

        // Convert map to array and fetch KYC/compliance data for each country
        const updatedKycData = [];
        const updatedCountryKycData = {};
        const updatedCountryComplianceData = {};

        for (const [countryName, countryInfo] of countryMap) {
          // Fetch KYC and compliance data for this country
          const kycData_country = await fetchCountryKycData(countryName);
          const complianceData = await fetchCountryComplianceData(countryName);

          const countryDataWithMetrics = {
            country: countryName,
            lat: countryInfo.lat,
            lng: countryInfo.lng,
            success: kycData_country.success,
            failed: kycData_country.failed,
            riskScore: complianceData.riskScore,
            revocationRate: complianceData.revocationRate,
            newFlags: complianceData.newFlags,
            aml: complianceData.aml,
          };

          updatedKycData.push(countryDataWithMetrics);
          updatedCountryKycData[countryName] = kycData_country;
          updatedCountryComplianceData[countryName] = complianceData;
        }

        setCountryKycData(updatedCountryKycData);
        setCountryComplianceData(updatedCountryComplianceData);

        kycData.splice(0, kycData.length, ...updatedKycData);
      }
    } catch (error) {
      console.log('Error fetching available countries data:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchGlobalKycData();
    fetchGlobalComplianceData();
    fetchAvailableCountriesData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current && globeRef.current.controls()) {
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = true;
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Update tooltip screen position for hovered point
  useEffect(() => {
    if (!globeRef.current) return;
    let rafId;
    const update = () => {
      if (hovered) {
        const screen = globeRef.current.getScreenCoords(hovered.lat, hovered.lng);
        if (screen) setTooltipPos({ x: screen.x, y: screen.y });
      }
      rafId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(rafId);
  }, [hovered]);

  const currentData = selectedCountry
    ? {
      country: selectedCountry.country,
      success: selectedCountry.success,
      failed: selectedCountry.failed,
      riskScore: selectedCountry.riskScore,
      revocationRate: selectedCountry.revocationRate,
      newFlags: selectedCountry.newFlags,
      aml: selectedCountry.aml,
    }
    : {
      country: globalKycData.country,
      success: globalKycData.success,
      failed: globalKycData.failed,
      riskScore: globalComplianceData.riskScore,
      revocationRate: globalComplianceData.revocationRate,
      newFlags: globalComplianceData.newFlags,
      aml: globalComplianceData.aml,
    };


  return (
    <>
      <div className='sm:h-full w-full relative overflow-hidden space-y-6 px-3'>
        <div className="sm:absolute top-0 sm:left-[50%] sm:-translate-x-[50%] z-40">
          <div className='flex items-center gap-1.5 sm:gap-2 justify-center'>
            <div onClick={() => setSelectedCountry(null)} className='p-[1px] rounded-full sm:rounded-md cursor-pointer bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'>
              <div className='bg-gradient-to-r from-[#FF842D] to-[#FF2D55] text-sm text-white px-5 py-1.5 rounded-full sm:rounded-md'>
                Global View
              </div>
            </div>
            <Link to="/list-kyc" className='p-[1px] rounded-full sm:rounded-md cursor-pointer bg-gradient-to-r from-[#CDCDCD] to-[#BEBEBE] sm:from-[#FF842D] sm:to-[#FF2D55]'>
              <div className='bg-[#2C2C2C] sm:bg-[#111111] text-sm text-white px-5 py-1.5 rounded-full sm:rounded-md'>
                List View
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 pt-3">
            <TooltipIcon />
            <p className="text-xs text-[#484848]">You can scroll the globe by mouse</p>
          </div>
        </div>
        <div className="relative sm:absolute left-0 top-0 z-40">
          <div className='space-y-3'>
            <div className="space-y-1">
              <h3 className="text-[#F9FAFB] text-sm">{currentData.country}</h3>
              <p className="font-medium text-3xl text-[#F9FAFB]">
                {currentData.success + currentData.failed}
              </p>
            </div>
            <div className="sm:space-y-2 grid grid-cols-2 sm:grid-cols-none gap-3">
              <KycCardBlur icon={<SuccessKycBlurIcon />} title="Successful KYC" value={currentData.success.toLocaleString()} />
              <KycCardBlur icon={<FailedKycBlurIcon />} title="Failed KYC" value={currentData.failed.toLocaleString()} />
            </div>
          </div>
        </div>
        <div className='block sm:hidden h-[560px]'></div>
        <div className="absolute sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-[84%] sm:-translate-y-1/2 w-[980px] h-[880px] overflow-hidden z-0" ref={containerRef}>
          <Globe
            ref={globeRef}
            globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere={false}
            width={980}
            height={880}
            pointsData={kycData}
            pointLat={(d) => d.lat}
            pointLng={(d) => d.lng}
            pointAltitude={() => 0.01}
            pointRadius={() => 0.9}
            pointColor={() => '#FF6A3D'}
            onPointHover={(d) => setHovered(d || null)}
            onPointClick={(d) => setSelectedCountry(d)}
          />

          {hovered && (
            <div
              className="absolute text-white px-3 py-2 rounded-md shadow"
              style={{
                top: `${tooltipPos.y - 86}px`,
                left: `${tooltipPos.x - 100}px`,
                backgroundColor: '#3D3D3D',
                zIndex: 50,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <div className="text-xs font-medium bg-gradient-to-r from-[#FF842D] to-[#FF2D55] bg-clip-text text-transparent">
                {hovered.country}
              </div>
              <div className="text-white text-xs whitespace-nowrap mt-1">
                Success: <span className="text-[#1EA51F]">{hovered.success}</span>
              </div>
              <div className="text-white text-xs whitespace-nowrap">
                Failed: <span className="text-[#FF2D55]">{hovered.failed}</span>
              </div>
            </div>
          )}
        </div>
        <div className="sm:absolute right-0 top-0 space-y-5 z-40 relative">
          <h3 className="text-[#F9FAFB] text-sm">Risk Management Suite</h3>
          <div className="sm:space-y-2 grid grid-cols-2 gap-3 sm:grid-cols-none">
            <KycCardBlur icon={<RiskBlurIcon />} title="Risk Score" value={currentData.riskScore} />
            <KycCardBlur icon={<UsersBlurIcon />} title="Post Verification user access revocation Rate" value={currentData.revocationRate} />
            <KycCardBlur icon={<FlagsBlurIcon />} title="Number of new Flags" value={currentData.newFlags} />
            <KycCardBlur icon={<AMLBlurIcon />} title="AML" value={currentData.aml} />
          </div>
        </div>
        <div className="w-full pt-[700px] bottom-0 z-40 grid sm:grid-cols-2 gap-4 right-0">
          <CustomerOnboarding countryFilter={selectedCountry?.country} />
          <CustomerOnboardingRiskManagement countryFilter={selectedCountry?.country} />
        </div>
      </div>
    </>
  );
};

export default GlobalKyc;

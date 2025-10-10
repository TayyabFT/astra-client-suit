import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import ButtonGradient from '../../components/Common/ButtonGradient';
import Syep1 from '../../components/Onboarding/Syep1';
import Step2 from '../../components/Onboarding/Step2';
import Step3 from '../../components/Onboarding/Step3';
import Step4 from '../../components/Onboarding/Step4';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);

  const [accountDetail, setAccountDetail] = useState({});
  const [businessDetail, setBusinessDetail] = useState({});
  const [personalDetail, setPersonalDetail] = useState({});
  const [businessModel, setBusinessModel] = useState({});

  const getStepCircle = (currentStep) => {
    const active = step >= currentStep;
    return (
      <span
        className={`rounded-full size-10 text-xs flex items-center justify-center text-white ${active
            ? 'bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'
            : 'bg-[#1A1A1A] border border-[#FFFFFF4D]'
          }`}
      >
        {currentStep}
      </span>
    );
  };

  const getStepLine = (currentStep) => {
    const active = step > currentStep;
    return (
      <div
        className={`h-[1px] flex-1 ${active
            ? 'bg-gradient-to-r from-[#FF842D] to-[#FF2D55]'
            : 'border border-dashed border-[#474747]'
          }`}
      ></div>
    );
  };

  const formatDate = (d) => {
    try {
      if (!d) return undefined;
      const date = new Date(d);
      if (isNaN(date.getTime())) return undefined;
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    } catch {
      return undefined;
    }
  };

  const handleFinish = async () => {
    if (!step4Ref.current?.validateAndSave()) toast.error('data');

    const orgId = localStorage.getItem('organizationId');
    const userEmail = localStorage.getItem('userEmail');

    if (!orgId) {
      toast.error('Organization ID not found. Please register again.');
      return;
    }

    const payload = {
      orgId,
      orgName: businessDetail?.orgName || accountDetail?.orgName || undefined,
      businessDetail: {
        registrationNumber: businessDetail?.registrationNumber || '',
        industry: businessModel?.industry || '',
        webUrl: businessModel?.website || '',
        countriesOfIncorporation: businessDetail?.countriesOfIncorporation
          ? [businessDetail.countriesOfIncorporation]
          : [],
        countriesOfOperation: businessModel?.countries
          ? [businessModel.countries]
          : [],
        descriptionOfProducts: businessModel?.description || '',
        businessProofImg:
          typeof businessDetail?.businessProofImg === 'string'
            ? businessDetail.businessProofImg
            : businessDetail?.businessProofImg?.name || '',
        address: businessDetail?.address || '',
        city: businessDetail?.city || '',
        state: businessDetail?.state || '',
        zip: businessDetail?.zip || '',
        country: businessDetail?.country || '',
        businessType: businessDetail?.businessType || '',
      },
      coreProfile: {
        organizationName:
          businessDetail?.orgName || accountDetail?.orgName || '',
        organizationEmail: userEmail || accountDetail?.orgEmail || '',
      },
      directors: [
        {
          name: personalDetail?.fullName || '',
          directorEmail: personalDetail?.directorEmail || '',
          role: (personalDetail?.role || '').toString().toLowerCase(),
          dob: formatDate(personalDetail?.dob),
          nationality: personalDetail?.nationality || '',
        },
      ],
      risk: {
        crypto: !!businessModel?.riskCrypto,
        politicallyExposed: !!businessModel?.riskPoliticallyExposed,
        sanctions: !!businessModel?.riskSanctions,
      },
    };


    console.log('🚀 Final Payload:', payload);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/complete-organization`,
        payload
      );

      if (res.status === 200) {
        toast.success('🎉 Organization setup completed successfully!');
        navigate('/login');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'API request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-[100vh] w-full flex items-center justify-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="rounded-xl bg-[#FFFFFF0D] max-w-[540px] w-full backdrop-blur-[11px] flex flex-col items-center justify-center space-y-9 max-h-[90%]">
        <div className="p-8 w-full overflow-auto custom__scrollbar">
          <h2 className="text-xl text-white font-medium text-center">
            {{
              1: 'Account Setup',
              2: 'Business Information',
              3: 'Directors & UBOs',
              4: 'Business Model & Risk Declarations',
            }[step]}
          </h2>

          {/* Step Progress */}
          <div className="flex items-center justify-center mt-5">
            {getStepCircle(1)}
            {getStepLine(1)}
            {getStepCircle(2)}
            {getStepLine(2)}
            {getStepCircle(3)}
            {getStepLine(3)}
            {getStepCircle(4)}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-9 w-full mt-8">
              <Syep1 ref={step1Ref} setBusinessDetail={setBusinessDetail} />
              <div className="flex items-center gap-5">
                <div className="rounded-md bg-[#292929] text-white text-xs py-[13px] w-full flex justify-center select-none opacity-50 cursor-not-allowed">
                  Back
                </div>
                <ButtonGradient
                  className="w-full"
                  text="Next"
                  handleClick={() => {
                    if (step1Ref.current?.validateAndSave()) setStep(2);
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-9 w-full mt-8">
              <Step2 ref={step2Ref} setPersonalDetail={setPersonalDetail} />
              <div className="flex items-center gap-5">
                <div
                  onClick={() => setStep(1)}
                  className="rounded-md bg-[#292929] text-white text-xs py-[13px] w-full flex justify-center cursor-pointer"
                >
                  Back
                </div>
                <ButtonGradient
                  className="w-full"
                  text="Next"
                  handleClick={() => {
                    if (step2Ref.current?.validateAndSave()) setStep(3);
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-9 w-full mt-8">
              <Step3 ref={step3Ref} setBusinessModel={setBusinessModel} />
              <div className="flex items-center gap-5">
                <div
                  onClick={() => setStep(2)}
                  className="rounded-md bg-[#292929] text-white text-xs py-[13px] w-full flex justify-center cursor-pointer"
                >
                  Back
                </div>
                <ButtonGradient
                  className="w-full"
                  text="Next"
                  handleClick={() => {
                    if (step3Ref.current?.validateAndSave()) setStep(4);
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-9 w-full mt-8">
              <Step4 ref={step4Ref} setBusinessModel={setBusinessModel} />
              <div className="flex items-center gap-5">
                <div
                  onClick={() => setStep(3)}
                  className="rounded-md bg-[#292929] text-white text-xs py-[13px] w-full flex justify-center cursor-pointer"
                >
                  Back
                </div>
                <ButtonGradient
                  className="w-full"
                  text={loading ? 'Submitting...' : 'Finish'}
                  handleClick={handleFinish}
                  disabled={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

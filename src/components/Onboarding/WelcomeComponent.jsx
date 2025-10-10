import React from 'react'
import ButtonGradient from '../Common/ButtonGradient'

const WelcomeComponent = ({handleClick}) => {
    return (
        <div className='rounded-xl bg-[#FFFFFF0D] max-w-[540px] pb-12 px-4 pt-7 w-full backdrop-blur-[11px] flex items-center justify-center flex-col space-y-12'>
            <img className='h-9' src="/images/logo.svg" alt="Logo" />
            <div className='space-y-4 max-w-[300px] mx-auto w-full'>
                <h2 className='text-2xl text-white font-medium text-center !leading-normal'>Welcome to AstraPro Business KYC</h2>
                <p className='text-[#9CA3AF] text-xs text-center'>Complete the following steps to verify your business.</p>
            </div>
            <ButtonGradient handleClick={handleClick} text='Start Onboarding'/>
        </div>
    )
}

export default WelcomeComponent

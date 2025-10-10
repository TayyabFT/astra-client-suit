import React, { useState } from 'react'
import Input from '../../components/Common/Input'
import PasswordField from '../../components/Common/PasswordField'
import CustomCheckbox from '../../components/Common/CustomCheckbox'
import ButtonGradient from '../../components/Common/ButtonGradient'
import EnterOTPPopup from '../../components/Popups/EnterOTPPopup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import WelcomeComponent from '../../components/Onboarding/WelcomeComponent'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showOtp, setShowOtp] = useState(false);
    const [hideWelcome, setHideWelcome] = useState(true);
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!agree) {
            toast.error("You must agree to terms & conditions");
            return;
        }

        try {
            setLoading(true);

            const body = { email, password };
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/register`,
                body
            );

            if (res.data.status === "success") {
                toast.success(res.data.message || "Registered successfully");

                const orgId = res.data.data?.organizationId;
                const userEmail = res.data.data?.email;
                if (orgId && userEmail) {
                    localStorage.setItem('organizationId', orgId);
                    localStorage.setItem('userEmail', userEmail);
                }

                setShowOtp(true);
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className='bg-cover bg-no-repeat bg-center h-[100vh] w-full flex items-center justify-center'
            style={{ backgroundImage: "url('/images/background.png')" }}
        >
            {hideWelcome ? (
                <WelcomeComponent handleClick={() => setHideWelcome(false)} />
            ) : (
                <div className='rounded-xl bg-[#FFFFFF0D] max-w-[540px] w-full backdrop-blur-[11px] flex items-center justify-center flex-col space-y-9 max-h-[90%]'>
                    <div className='p-8 w-full overflow-auto custom__scrollbar space-y-6'>
                        <h2 className='text-xl text-white font-medium text-center !leading-normal'>
                            Sign Up
                        </h2>
                        <div className='space-y-4 w-full mt-8'>
                            <Input
                                lable='Email Address'
                                placeholder='Ellis@astra.com'
                                type='email'
                                onchange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <PasswordField
                                lable='Password'
                                placeholder='Enter your password'
                                onchange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <PasswordField
                                lable='Confirm Password'
                                placeholder='Enter confirm password'
                                onchange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                            <CustomCheckbox
                                lable='I Agree to Terms & Conditions, Privacy Policy.'
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <ButtonGradient
                                className="w-full"
                                text={loading ? 'Loading...' : 'Next'}
                                handleClick={handleSignup}
                            />
                            <div className='text-center text-xs text-white/80 mt-1 flex items-center justify-between'>
                                Already have an account?
                                <Link
                                    to='/login'
                                    className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF842D] to-[#FF2D55] cursor-pointer hover:opacity-90'
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showOtp && (
                <EnterOTPPopup
                    email={email}
                    onClose={() => setShowOtp(false)}
                    onVerify={() => {
                        setShowOtp(false);
                        navigate('/registration');
                    }}
                />
            )}
        </div>
    );
};

export default Signup;

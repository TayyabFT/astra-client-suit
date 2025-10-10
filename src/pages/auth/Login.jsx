import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Input from '../../components/Common/Input';
import PasswordField from '../../components/Common/PasswordField';
import ButtonGradient from '../../components/Common/ButtonGradient';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/login`,
        { email, password },
      );

      console.log(response.data);
      if (response.data.status === 'success') {

        localStorage.setItem('token', response.data.data.token);

        if (response.data.data.emailVerified === true || response.data.data.organizationStatus === 'active') {
          toast.success(response.data.message);
          navigate('/');
        } else {
          toast.success(response.data.message);
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }

    } catch (error) {
      console.log(error);
      if (error.response.data === 'Unauthorized') {
        toast.error(error.response.data);
        navigate('/sign-up');
      } else if (error.response.data.message === 'Organization not found') {
        toast.error(error.response.data.message)
        navigate('/registration');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false)
    }
  };


  return (
    <div
      className='bg-cover bg-no-repeat bg-center h-[100vh] w-full flex items-center justify-center'
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className='rounded-xl bg-[#FFFFFF0D] max-w-[540px] w-full backdrop-blur-[11px] flex items-center justify-center flex-col space-y-9 max-h-[90%]'>
        <div className='p-8 w-full overflow-auto custom__scrollbar'>
          <h2 className='text-xl text-white font-medium text-center !leading-normal'>
            Login
          </h2>

          <div className='space-y-9 w-full mt-8'>
            <div className='space-y-5 w-full'>
              <Input lable='Email Address' placeholder='you@example.com' type='email' onchange={(e) => setEmail(e.target.value)} value={email} />
              <PasswordField lable='Password' placeholder='Enter your password' onchange={(e) => setPassword(e.target.value)} value={password} />
            </div>

            <div className='flex items-center gap-5'>
              <ButtonGradient
                className='w-full'
                text={loading ? 'Loading...' : 'Login'}
                handleClick={handleLogin}
              />
            </div>

            <div className='text-center text-xs text-white/80 flex items-center justify-between !mt-6'>
              <p>Don't have an account?</p>
              <Link to='/sign-up' className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF842D] to-[#FF2D55] cursor-pointer hover:opacity-90'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

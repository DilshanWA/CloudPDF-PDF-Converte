'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { Eye, EyeOff  } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [isShowpassword, setVisiblePassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [isToggleVisible, setIsToggleVisible] = React.useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className='bg-white w-[500px] h-auto text-center px-5 rounded-lg '>
      <img src="/Logo/logo.png" alt="CloudPDF Logo" className='w-23 h-15 mx-auto mb-5' />
        <h1 className='text-2xl font-bold text-center sm:text-3xl'>Create Your Account</h1>
        <p>Please fill in your details to create an account.</p>
        <form className='mt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'/>
            <input type="email" placeholder='Email' className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'/>
            <div className='relative'>
                  <input 
                    type= {isShowpassword ? 'password' : 'text'}
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                      if (value.length > 0) {
                        setIsToggleVisible(true);
                      }
                      else{
                        setIsToggleVisible(false);
                        setVisiblePassword(false);
                      }
    
                    }}
                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                  {isToggleVisible && (
                    <span
                      className="absolute right-5 top-[12px] cursor-pointer"
                      onClick={() => setVisiblePassword(!isShowpassword)}
                    >
                      {isShowpassword ? (
                        <Eye />
                      ) : (
                        <EyeOff />
                      )}
                    </span>
                  )}
                </div>
            <button type="submit" className='w-full cursor-pointer bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition'>Sign Up</button>
        </form>
        <p className='mt-4'>Have an account? <a href="/login" className='text-red-500 font-bold'>Login</a></p>

    </div>
  );
}

import React, { useContext } from 'react'
// import './Header.css'
import { AuthContext, AuthProvider } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLoginOut = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className='h-[50px] bg-indigo-600 flex align-middle items-center justify-between w-[100%]'>
      <h1 className='text-xl text-white pl-[4rem]'>TrustWave Bank</h1>
      <h1 className='text-xl text-white'>User</h1>
      <button className='p-2 pl-5 pr-5 mr-[4rem] text-sm text-blue-800 bg-white border-2 text-md rounded-xl indigo-700 hover:text-white hover:bg-indigo-800 hover:border-white' onClick={handleLoginOut}>Logout</button>
    </div>
  )
}

export default Header

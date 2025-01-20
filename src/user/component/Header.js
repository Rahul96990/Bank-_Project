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
    <div className='flex justify-around pl-10 pr-10 text-lg text-white align-middle header-container h-[50px]  bg-indigo-600'>
      <h1>TrustWave Bank</h1>
      <h1>User</h1>
      <button className='p-1 pl-2 pr-2 text-sm text-blue-800 bg-white border-2 rounded-xl indigo-700 hover:text-white hover:bg-indigo-800 hover:border-white' onClick={handleLoginOut}>Logout</button>
    </div>
  )
}

export default Header

import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Dashboard.css'
import Sidebar from './component/Sidebar'
import BarComponent from './BarComponent'
import { AuthContext } from './AuthContext'

const Dashboard = () => {
  const { user_id } = useParams()
  const navigate = useNavigate()

  const { isLoggedIn } = useContext(AuthContext)

  useEffect(()=>{
    if (!isLoggedIn) {
      navigate('/login')
    }
  })

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <Sidebar user_id={user_id} />
      </div>
      <div className="col-span-4"> {/* Added padding for better content spacing */}
        <div className='p-2 pb-0 m-4 border'>
          <h1 className='text-3xl capitalize'>Dashboard</h1>
          <div className='flex mt-4 border-2 total-account w-[100%]'>
            <div className=' text-white p-4 m-2 text-left bg-indigo-500 border-2 rounded-md'>
            <h2 className='text-[14px]'>Total Accounts</h2>
            <p className='text-md mt-1'>5</p>
            </div>
            <div className=' text-white p-4 m-2 text-left bg-indigo-500 border-2 rounded-md'>
            <h2 className='text-[14px]'>Total Saving Accounts</h2>
            <p className='text-md mt-1'>5</p>
            </div>
            <div className=' text-white p-4 m-2 text-left bg-indigo-500 border-2 rounded-md'>
            <h2 className='text-[14px]'>Total Current Accounts</h2>
            <p className='text-md mt-1'>5</p>
            </div>
            <div className=' text-white p-4 m-2 text-left bg-indigo-500 border-2 rounded-md'>
            <h2 className='text-[14px]'>Total Saving Balance</h2>
            <p className='text-md mt-1'>5</p>
            </div>
            <div className=' text-white p-4 m-2 text-left bg-indigo-500 border-2 rounded-md'>
            <h2 className='text-[14px]'>Total Current Balance</h2>
            <p className='text-md mt-1'>5</p>
            </div>
            <div className=' text-white p-4 m-2 text-left bg-indigo-500 border-2 rounded-md'>
            <h2 className='text-[14px]'>Total Balance</h2>
            <p className='text-md mt-1'>5</p>
            </div>
          </div>
          <BarComponent />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

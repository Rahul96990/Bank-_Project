import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Dashboard.css'
import Sidebar from './component/Sidebar'
import { AuthContext } from './AuthContext'

const Dashboard = () => {
  const { user_id } = useParams()
  const navigate = useNavigate()

  const { isLoggedIn } = useContext(AuthContext)

  // useEffect(()=>{
  //   if (!isLoggedIn) {
  //     navigate('/login')
  //   }
  // })

  console.log(user_id)

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <Sidebar user_id={user_id} />
      </div>
      <div className="col-span-4"> {/* Added padding for better content spacing */}
      <div className='p-3 m-4 border'>
                              <h1 className='text-3xl capitalize'>Dashboard</h1>
                        </div>
      </div>
    </div>
  )
}

export default Dashboard

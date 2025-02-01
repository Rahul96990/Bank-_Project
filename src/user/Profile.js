import React, { useEffect, useState } from 'react'
import Sidebar from './component/Sidebar'
// import './Dashboard.css'
// import './profile.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
        const { user_id } = useParams()
        const [userData, setUserData] = useState({})
        const [loading, setLoading] = useState(true)

        useEffect(() => {
                const fData = new FormData()
                fData.append("user_id", user_id);
                axios.post("http://localhost/backend/login.php", fData)
                        .then(response => setUserData(response.data))
                setLoading(false)
        }, [loading])

        return (
                <div className='dashboard-container'>
                        <Sidebar user_id={user_id} />
                        <div className='profile-container'>
                                <div className='flex items-center justify-between p-3 m-4 align-middle border'>
                                        <h1 className='text-3xl capitalize'>Profile</h1>
                                        <Link to={`/user/updateprofile/${user_id}`}> <button className='p-3 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600'>Update Profile</button></Link>
                                </div>
                                <form className=''>
                                        <div className='border-2 rounded-xl w-[95%] m-6 pb-7 p-4 pl-6 profile-data'>
                                                <div className='flex align-middle justify-evenly'>
                                                        <div className='flex-1 box'>
                                                                <p className='text-md'>First Name :</p>
                                                                <input name='first_name' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.first_name} disabled />
                                                        </div>
                                                        <div className='flex-1 box'>
                                                                <p className='text-md'>Middle Name :</p>
                                                                <input name='middle_name' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.middle_name} disabled />
                                                        </div>
                                                        <div className='flex-1 box'>
                                                                <p className='text-md'>Last Name :</p>
                                                                <input name='last_name' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.last_name} disabled />
                                                        </div>
                                                </div>
                                                 <div className='flex align-middle justify-evenly'>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>Email :</p>
                                                                <input name='email' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.email} disabled />
                                                        </div>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>Password :</p>
                                                                <input name='password' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.password} disabled />
                                                        </div>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>Phone :</p>
                                                                <input name='phone' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.phone_number} disabled />
                                                        </div>
                                                </div>
                                                 <div className='flex align-middle justify-evenly'>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>Date Of Birth :</p>
                                                                <input name='email' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.dob} disabled />
                                                        </div>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>State :</p>
                                                                <input name='state' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.state} disabled />
                                                        </div>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>Address :</p>
                                                                <input name='address' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.address} disabled />
                                                        </div>
                                                </div>
                                                 <div className='flex align-middle justify-evenly'>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>City :</p>
                                                                <input name='city' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.city} disabled />
                                                        </div>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>Aadhaar No :</p>
                                                                <input name='aadhaar' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.aadhaar_number} disabled />
                                                        </div>
                                                        <div className='flex-1 mt-5'>
                                                                <p className='text-md'>Gender :</p>
                                                                <input name='gender' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={userData.gender} disabled />
                                                        </div>
                                                </div>
                                        </div>
                                </form>
                        </div>
                </div>
        )
}

export default Profile

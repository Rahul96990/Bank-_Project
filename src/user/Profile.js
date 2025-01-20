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
                                <div className='flex justify-around p-3 align-middle border'>
                                        <h1 className='text-3xl capitalize'>Profile</h1>
                                        <Link to={`/user/updateprofile/${user_id}`}> <button className='p-3 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600'>Update Profile</button></Link>
                                </div>
                                <form className='rounded-xl'>
                                        <div className='profile-data '>
                                                <div className='flex'>
                                                        <div className='box'>
                                                                <p>First Name :</p>
                                                                <input name='firstname' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.first_name} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>Middle Name :</p>
                                                                <input name='firstname' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.middle_name} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>Last Name :</p>
                                                                <input name='firstname' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.last_name} disabled />
                                                        </div>
                                                </div>
                                                <div className='flex'>
                                                        <div className='box'>
                                                                <p>Email :</p>
                                                                <input name='email' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.email} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>Password :</p>
                                                                <input name='password' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.password} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>Phone :</p>
                                                                <input name='phone' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.phone_number} disabled />
                                                        </div>
                                                </div>
                                                <div className='flex'>
                                                        <div className='box'>
                                                                <p>Date Of Birth :</p>
                                                                <input name='email' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.dob} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>State :</p>
                                                                <input name='state' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.state} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>Address :</p>
                                                                <input name='address' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.address} disabled />
                                                        </div>
                                                </div>
                                                <div className='flex'>
                                                        <div className='box'>
                                                                <p>City :</p>
                                                                <input name='city' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.city} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>Aadhaar No :</p>
                                                                <input name='aadhaar' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.aadhaar_number} disabled />
                                                        </div>
                                                        <div className='box'>
                                                                <p>Gender :</p>
                                                                <input name='gender' className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" value={userData.gender} disabled />
                                                        </div>
                                                </div>
                                        </div>
                                </form>
                        </div>
                </div>
        )
}

export default Profile

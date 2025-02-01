import React, { useEffect, useState } from 'react';
import Sidebar from './component/Sidebar';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProfile = () => {
      const { user_id } = useParams();
      const navigate = useNavigate()
      const [userData, setUserData] = useState({});
      // const [count, setCount] = useState(0);
      // const [track, setTrack] = useState(0);
      const [updateData, setUpdateData] = useState({});
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const fData = new FormData();
            fData.append("user_id", user_id);
            axios.post("http://localhost/backend/login.php", fData)
                  .then(response => {
                        setUserData(response.data)
                        setLoading(false); // Set loading to false after receiving data
                        setUpdateData(response.data); // Set initial data in updateData as well
                  });
      }, [user_id]); // Only run once when user_id changes

      const handleChange = (e) => {
            setUpdateData({
                  ...updateData,
                  [e.target.name]: e.target.value
            });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            let count = 0;
            let track = 0;

            for (let key in userData) {
                  count++;
                  if (userData[key] === updateData[key]) {
                        track++;
                  }
            }

            if (count === track) {
                  toast.warning("Please update at least one value!");
                  return;
            }

            const fData = new FormData();
            fData.append("user_id", user_id);
            fData.append("firstname", updateData.first_name);
            fData.append("middlename", updateData.middle_name);
            fData.append("lastname", updateData.last_name);
            fData.append("password", updateData.password);
            fData.append("email", updateData.email);
            fData.append("phone", updateData.phone_number);
            fData.append("dob", updateData.dob);
            fData.append("address", updateData.address);
            fData.append("state", updateData.state);
            fData.append("city", updateData.city);
            fData.append("aadhaar", updateData.aadhaar_number);
            fData.append("gender", updateData.gender);

            try {
                  const response = await axios.post("http://localhost/backend/update.php", fData);
                  if (response.data.message == "Profile updated successfully!") {
                        toast.success("Profile updated successfully!");
                        setTimeout(() => {
                              navigate(`/user/profile/${user_id}`); // Navigate to Dashboard
                        }, 5000);
                  }
            } catch (error) {
                  alert("Error updating profile. Please try again.");
            }
      };

      const states = [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
            "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
            "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
            "Chandigarh", "Delhi", "Puducherry"
      ];

      const genders = ['Male', 'Female', 'Others'];

      return (
            <div className='dashboard-container'>
                  <Sidebar user_id={user_id} />
                  <div className='profile-container'>
                        <div className='p-3 m-4 border'>
                              <h1 className='text-3xl capitalize'>Update Profile</h1>
                        </div>
                        <form onSubmit={handleSubmit} className=''>
                              <div className='border-2 rounded-xl w-[95%] m-6 pb-7 p-4 pl-6 profile-data'>
                                    <div className='flex align-middle justify-evenly'>
                                          <div className='flex-1 box'>
                                                <p>First Name :</p>
                                                <input name='first_name' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.first_name || ''} onChange={handleChange} />
                                          </div>
                                          <div className='flex-1 box'>
                                                <p>Middle Name :</p>
                                                <input name='middle_name' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.middle_name || ''} onChange={handleChange} />
                                          </div>
                                          <div className='flex-1 box'>
                                                <p>Last Name :</p>
                                                <input name='last_name' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.last_name || ''} onChange={handleChange} />
                                          </div>
                                    </div>
                                    <div className='flex'>
                                          <div className='flex-1 mt-5'>
                                                <p>Email :</p>
                                                <input name='email' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.email || ''} onChange={handleChange} />
                                          </div>
                                          <div className='flex-1 mt-5'>
                                                <p>Password :</p>
                                                <input name='password' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.password || ''} onChange={handleChange} />
                                          </div>
                                          <div className='flex-1 mt-5'>
                                                <p>Phone :</p>
                                                <input name='phone_number' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.phone_number || ''} onChange={handleChange} />
                                          </div>
                                    </div>
                                    <div className='flex'>
                                          <div className='flex-1 mt-5'>
                                                <p>Date Of Birth :</p>
                                                <input name='dob' type='date' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.dob || ''} onChange={handleChange} />
                                          </div>
                                          <div className='flex-1 mt-5'>
                                                <p>State :</p>
                                                <select name="state" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.state || ''} onChange={handleChange} required>
                                                      <option value="">Select State</option>
                                                      {states.map((state, index) => (
                                                            <option key={index} value={state}>{state}</option>
                                                      ))}
                                                </select>
                                          </div>
                                          <div className='flex-1 mt-5'>
                                                <p>Address :</p>
                                                <input name='address' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.address || ''} onChange={handleChange} />
                                          </div>
                                    </div>
                                    <div className='flex'>
                                          <div className='flex-1 mt-5'>
                                                <p>City :</p>
                                                <input name='city' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.city || ''} onChange={handleChange} />
                                          </div>
                                          <div className='flex-1 mt-5'>
                                                <p>Aadhaar No :</p>
                                                <input name='aadhaar_number' className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.aadhaar_number || ''} onChange={handleChange} />
                                          </div>
                                          <div className='flex-1 mt-5'>
                                                <p>Gender :</p>
                                                <select name="gender" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" value={updateData.gender || ''} onChange={handleChange} required>
                                                      <option value="">Select Gender</option>
                                                      {genders.map((gender, index) => (
                                                            <option key={index} value={gender}>{gender}</option>
                                                      ))}
                                                </select>
                                          </div>
                                    </div>
                                    <button type="submit" className='p-3 mt-4 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600'>Update</button>
                              </div>
                        </form>
                        <ToastContainer />
                  </div>
            </div>
      );
};

export default UpdateProfile;

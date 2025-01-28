import React, { useEffect, useState, useRef } from 'react'
import Sidebar from './component/Sidebar'
import './Dashboard.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddAccount = () => {

      const { user_id } = useParams()
      const isfetched = useRef(false)

      const [newaccount, Setnewaccount] = useState({
            'user_id': user_id,
            'fullname': '',
            'phone_number': '',
            'email': '',
            'account_number': '',
            'account_type': '',
            'branch_location': '',
            'deposite_amount': '',
            'annual_income': '',
            'pan_num': '',
            'aadhaar_number': '',
            'occupation': '',
            'pin_num': '',
      })

      const onChange = (e) => {
            Setnewaccount({
                  ...newaccount,
                  [e.target.name]: e.target.value
            })
      }

      useEffect(() => {
            if (isfetched.current) {
                  return
            }
            const fetchData = async (e) => {
                  const fData = new FormData()
                  fData.append('user_id', user_id)

                  try {
                        const response = await axios.post("http://localhost/backend/createaccount.php", fData)
                        const data = response.data
                        console.log(response.data)
                        Setnewaccount({
                              ...newaccount,
                              fullname: `${data.first_name} ${data.middle_name} ${data.last_name}`,
                              phone_number: data.phone_number,
                              email: data.email,
                              account_number: data.acc_num,
                              pin_num: data.pin_num,
                              aadhaar_number: data.aadhaar_number
                        })
                  } catch (error) {

                  }
            }

            fetchData()
            isfetched.current = true
      }, [user_id])


      const handleAccount = async (e) => {
            e.preventDefault();
            const fData = new FormData()
            fData.append('user_id', user_id);
            fData.append('fullname', newaccount.fullname); // Avoid duplicate entries
            fData.append('phone_number', newaccount.phone_number); // Default to empty if missing
            fData.append('email', newaccount.email);
            fData.append('account_number', newaccount.account_number);
            fData.append('account_type', newaccount.account_type);
            fData.append('branch_location', newaccount.branch_location);
            fData.append('deposit_amount', newaccount.deposite_amount);
            fData.append('annual_income', newaccount.annual_income);
            fData.append('pan_num', newaccount.pan_num);
            fData.append('aadhaar_number', newaccount.aadhaar_number);
            fData.append('occupation', newaccount.occupation);
            fData.append('pin_num', newaccount.pin_num);

            try {
                  const response = await axios.post("http://localhost/backend/createaccount.php", fData)
                  if (response.data.message == "Account Created Successfully ") {
                        
                  }
            } catch (error) {

            }

      }

      return (
            <div className='dashboard-container'>
                  <Sidebar user_id={user_id} />
                  <div className='add_account_conatiner'>
                        <div className='flex justify-around p-3 m-4 align-middle border'>
                              <h1 className='text-3xl capitalize'>Add New Account</h1>
                        </div>
                        <div className='w-[95%] rounded-md border-none'>
                              <form className='p-5 m-5 border-2 rounded-md border-zinc-300' onSubmit={handleAccount}>
                                    <div className='flex'>
                                          <div className='box w-[30%]'>
                                                <p>Full Name</p>
                                                <input name="fullname" value={newaccount.fullname} className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Phone Number</p>
                                                <input name="phone_number" value={newaccount.phone_number} className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Email</p>
                                                <input name="email" value={newaccount.email} className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                    </div>
                                    <div className='flex mt-6'>
                                          <div className='box w-[30%]'>
                                                <p>Account Number</p>
                                                <input name="account_number" value={newaccount.account_number} className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Account Type</p>
                                                <select value={newaccount.account_type} name="account_type" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required>
                                                      <option disabled>Select </option>
                                                      <option>Saving</option>
                                                      <option>Current</option>
                                                </select>
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Branch Location</p>
                                                <select value={newaccount.branch_location} name="branch_location" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required>
                                                      <option disabled>Select </option>
                                                      <option>Mumbai</option>
                                                      <option>Pune</option>
                                                      <option>Nashik</option>
                                                      <option>Satara</option>
                                                </select>
                                          </div>
                                    </div>
                                    <div className='flex mt-6'>
                                          <div className='box w-[30%]'>
                                                <p>Deposite Money (Min : 2000)</p>
                                                <input value={newaccount.deposite_amount} name="deposite_amount" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Annual Income (Min : 10000)</p>
                                                <input value={newaccount.annual_income} name="annual_income" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Pan Number</p>
                                                <input value={newaccount.pan_num} name="pan_num" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                    </div>
                                    <div className='flex mt-6'>
                                          <div className='box w-[30%]'>
                                                <p>Aadhaar Number</p>
                                                <input value={newaccount.aadhaar_number} name="aadhaar_number" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Occupation  </p>
                                                <input value={newaccount.occupation} name="occupation" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                          <div className='box w-[30%]'>
                                                <p>Pin Number</p>
                                                <input value={newaccount.pin_num} name="pin_num" className='p-2 mt-2 border-2 border-zinc-400 w-[100%] border' onChange={onChange} required />
                                          </div>
                                    </div>
                                    <button className='p-3 mt-5 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600'>Create New Account</button>
                              </form>
                              <ToastContainer />
                        </div>
                  </div>
            </div>
      )
};

export default AddAccount

import React, { useEffect, useState, useRef } from 'react'
import Sidebar from './component/Sidebar'
// import './Dashboard.css'
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
            'balance_amount': '',
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

            if (newaccount.balance_amount) {

            }

            e.preventDefault();
            const fData = new FormData()
            fData.append('user_id', user_id);
            fData.append('fullname', newaccount.fullname); // Avoid duplicate entries
            fData.append('phone_number', newaccount.phone_number); // Default to empty if missing
            fData.append('email', newaccount.email);
            fData.append('account_number', newaccount.account_number);
            fData.append('account_type', newaccount.account_type);
            fData.append('branch_location', newaccount.branch_location);
            fData.append('balance_amount', newaccount.balance_amount);
            fData.append('annual_income', newaccount.annual_income);
            fData.append('pan_num', newaccount.pan_num);
            fData.append('aadhaar_number', newaccount.aadhaar_number);
            fData.append('occupation', newaccount.occupation);
            fData.append('pin_num', newaccount.pin_num);

            try {
                  const response = await axios.post("http://localhost/backend/createaccount.php", fData)
                  if (response.data.message == "Account Created Successfully") {
                        toast.success("Account Created Successfully")

                  }
            } catch (error) {

            }

      }

      return (
            <div className='dashboard-container'>
                  <Sidebar user_id={user_id} />
                  <div className='add_account_conatiner'>
                        <div className='p-3 m-4 border '>
                              <h1 className='text-3xl capitalize'>Create New Account</h1>
                        </div>
                        <form className='' onSubmit={handleAccount}>
                              <div className='border-2 rounded-xl w-[95%] m-6 pb-7 p-4 pl-6 profile-data'>
                                    <div className='flex align-middle justify-evenly'>
                                          <div className='flex-1'>
                                                <p>Full Name</p>
                                                <input name="fullname" value={newaccount.fullname} className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                          <div className='flex-1'>
                                                <p>Phone Number</p>
                                                <input name="phone_number" value={newaccount.phone_number} className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                          <div className='flex-1'>
                                                <p>Email</p>
                                                <input name="email" value={newaccount.email} className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                    </div>
                                    <div className='flex mt-6'>
                                          <div className='flex-1'>
                                                <p>Account Number</p>
                                                <input name="account_number" value={newaccount.account_number} className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                          <div className='flex-1'>
                                                <p>Account Type</p>
                                                <select
                                                      name="account_type"
                                                      value={newaccount.account_type || ""}
                                                      className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600"
                                                      onChange={onChange}
                                                      required
                                                >
                                                      <option value="" disabled>Select</option>
                                                      <option value="saving">Saving</option>
                                                      <option value="current">Current</option>
                                                </select>
                                          </div>
                                          <div className='flex-1'>
                                                <p>Branch Location</p>
                                                <select
                                                      name="branch_location"
                                                      value={newaccount.branch_location || ""}
                                                      className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600"
                                                      onChange={onChange}
                                                      required
                                                >
                                                      <option value="" disabled>Select</option>
                                                      <option value="Mumbai">Mumbai</option>
                                                      <option value="Pune">Pune</option>
                                                      <option value="Nashik">Nashik</option>
                                                      <option value="Satara">Satara</option>
                                                </select>

                                          </div>
                                    </div>
                                    <div className='flex mt-6'>
                                          <div className='flex-1'>
                                                <p>Deposite Money (Min : 5000)</p>
                                                <input value={newaccount.balance_amount} type='number' min="5000" name="balance_amount" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                          <div className='flex-1'>
                                                <p>Annual Income (Min : 10000)</p>
                                                <input value={newaccount.annual_income} type='number' min="10000" name="annual_income" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                          <div className='flex-1'>
                                                <p>Pan Number</p>
                                                <input value={newaccount.pan_num} name="pan_num" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                    </div>
                                    <div className='flex mt-6'>
                                          <div className='flex-1'>
                                                <p>Aadhaar Number</p>
                                                <input value={newaccount.aadhaar_number} name="aadhaar_number" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                          <div className='flex-1'>
                                                <p>Occupation  </p>
                                                <input value={newaccount.occupation} name="occupation" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                          <div className='flex-1'>
                                                <p>Pin Number</p>
                                                <input value={newaccount.pin_num} name="pin_num" className="w-[80%] p-2 mt-1 border-2 border-zinc-400 focus:border-zinc-600" onChange={onChange} required />
                                          </div>
                                    </div>
                                    <button type="submit" className='p-3 mt-4 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600'>Create New Account</button>
                              </div>
                        </form>
                        <ToastContainer />
                  </div>
            </div>
      )
};

export default AddAccount

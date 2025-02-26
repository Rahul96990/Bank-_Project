import React, { useEffect, useState } from 'react'
import Sidebar from './component/Sidebar'
import './Dashboard.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Transfer = () => {
      const { user_id } = useParams()
      const [account,SetAccount] = useState([])
      const [withdraw,SetWithdraw] = useState({
            'acc_num' : '',
            'pin_num' : '',
            'amount' : '',
            'user_id' : user_id,
      })

      useEffect(() => {
            const fetchData = async () => {
              try {
                const fData = new FormData();
                fData.append("user_id", user_id);
                const response = await axios.post("http://localhost/backend/accounts.php", fData);
                SetAccount(response.data);
                console.log(response.data)
        
              } catch (err) {
                console.log('Failed to fetch transactions');
              } finally {
                console.log(false);
              }
            };
        
            fetchData();
          }, [user_id]);

          const handleChange = (e) =>{
            SetWithdraw({
                  ...withdraw,
                  [e.target.name] : e.target.value
            })
          }

          const withdrawAmount = async (e) =>{
            e.preventDefault()
            
            const fData = new FormData()
            fData.append('acc_num',withdraw.acc_num)
            fData.append('amount',withdraw.amount)
            fData.append('pin_num',withdraw.pin_num)
            fData.append('user_id',withdraw.user_id)

            try {
                  const response = await axios.post("http://localhost/backend/withdraw.php",fData)
                  console.log()     
                  if (response.data.message) {
                        toast.success(response.data.message)
                  } else if(response.data.error){
                        toast.error(response.data.error)
                  } 
            } catch (error) {
                  
            }
          }

      return (
            <div className='dashboard-container'>
                  <Sidebar user_id={user_id} />
                  <div className='information'>
                  <div className='p-3 m-4 border'>
                              <h1 className='text-3xl capitalize'>Withdraw Money</h1>
                        </div>
                        {
                        account.length <= 0 ? <p className='text-center w-[800px]'>You don't have an account yet. Please create account.</p>
                        :
                         <div className='p-3 m-5 border-2 rounded-xl w-[90%] border-zinc-300'>
                        <form method='post' className='border-none' onSubmit={withdrawAmount}>
                        <table className='w-[80%]'>
                              <tbody>
                                    <tr className='h-[90px]'>
                                          <td className='p-5 w-[35%]'>
                                                <span className='text-lg'>Select Sender Account : </span>
                                          </td>
                                          <td className='pl-8'>
                                                <select name="acc_num" className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" value={withdraw.acc_num} onChange={handleChange} required>
                                                      <option value="" hidden selected>Select Sender Account</option>
                                                      {account.map((acc,index)=>(
                                                            <option>{acc.account_number}</option>
                                                      ))}
                                                </select>
                                          </td>
                                    </tr>
                                    <tr className='h-[90px]'>
                                          <td className='p-5 w-[35%] '>
                                                <span className='text-lg'>Enter Account PIN : </span>
                                          </td>
                                          <td className='pl-8 '>
                                                <input required name="pin_num" min="1" type='number' value={withdraw.pin_num} onChange={handleChange}  className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" />
                                          </td>
                                    </tr>
                                    <tr className='h-[90px]'>
                                          <td className='p-5 w-[35%] '>
                                                <span className='text-lg'>Withdraw Amount : </span>
                                          </td>
                                          <td className='pl-8 '>
                                                <input required name="amount" min="1" type='number'  value={withdraw.amount} onChange={handleChange}  className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" />
                                          </td>
                                    </tr>
                                    <tr className='h-[90px]'>
                                          <td colSpan={2} className='p-5 w-[100%] '>
                                          <button className='p-3 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600 w-[8rem]'>Withdraw</button>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                        </form>
                        </div>}
                        <ToastContainer/>
                  </div>
            </div>
      )
};

export default Transfer

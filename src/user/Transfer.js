import React, { useEffect, useState } from 'react'
import Sidebar from './component/Sidebar'
import './Dashboard.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Transfer = () => {
      const { user_id } = useParams()
      const [account, SetAccount] = useState([])
      const [transfer, SetTransfer] = useState({
            'sender_acc_num': '',
            'recevier_acc_num': '',
            'pin_num': '',
            'amount': '',
      })

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const fData = new FormData();
                        fData.append("user_id", user_id);
                        const response = await axios.post("http://localhost/backend/accounts.php", fData);
                        SetAccount(response.data);

                  } catch (err) {
                        console.log('Failed to fetch transactions');
                  } finally {
                        console.log(false);
                  }
            };

            fetchData();
      }, [user_id]);

      const handleChange = (e) => {
            SetTransfer({
                  ...transfer,
                  [e.target.name]: e.target.value
            });
      };

      const handleTransfer = async (e) => {
            e.preventDefault()
            const fData = new FormData();
            fData.append('sender_acc_num', transfer.sender_acc_num);
            fData.append('recevier_acc_num', transfer.recevier_acc_num );
            fData.append('pin_num', transfer.pin_num);
            fData.append('amount', transfer.amount);
            if(transfer.sender_acc_num === transfer.recevier_acc_num){
                  toast.error("Both Account are Same")
                  return
            }
            try {
                  const response = await axios.post('http://localhost/backend/transfer.php', fData);
                  console.log(response.data);
                  if (response.data.message) {
                        toast.success(response.data.message)
                  }else if(response.data.error){
                        toast.error(response.data.error)
                  }
                  
                } catch (error) {
                  console.error('Error transferring money:', error);
                }
      }

      return (
            <div className='dashboard-container'>
                  <Sidebar user_id={user_id} />
                  <div className='information'>
                        <div className='flex justify-around p-3 m-4 align-middle border'>
                              <h1 className='text-3xl capitalize'>Transfer Money</h1>
                        </div>
                        <div className='p-3 m-5 border-2 rounded-xl w-[90%] border-zinc-300'>
                              <form className='p-0 m-0 border-none' method='post' onSubmit={handleTransfer}>
                                    <table className='w-[80%]'>
                                          <tbody>
                                                <tr className='h-[90px]'>
                                                      <td className='p-5 w-[35%]'>
                                                            <span className='text-lg'>Select Sender Account : </span>
                                                      </td>
                                                      <td className='pl-8'>
                                                            <select name="sender_acc_num" value={transfer.sender_acc_num} onChange={handleChange} className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" required>
                                                                  <option value='' hidden selected>Select Sender Account</option>
                                                                  {account.map((acc, index) => (
                                                                        <option value={acc.account_number}>{acc.account_number}</option>
                                                                  ))}
                                                            </select>
                                                      </td>
                                                </tr>
                                                <tr className='h-[90px]'>
                                                      <td className='p-5 w-[35%] '>
                                                            <span className='text-lg'>Enter Receiver Account : </span>
                                                      </td>
                                                      <td className='pl-8'>
                                                            <input name="recevier_acc_num" value={transfer.recevier_acc_num} onChange={handleChange} type='text' className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" />
                                                      </td>
                                                </tr>
                                                <tr className='h-[90px]'>
                                                      <td className='p-5 w-[35%] '>
                                                            <span className='text-lg'>Enter Sender Account PIN : </span>
                                                      </td>
                                                      <td className='pl-8 '>
                                                            <input name="pin_num" value={transfer.pin_num} onChange={handleChange} type='number' className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" />
                                                      </td>
                                                </tr>
                                                <tr className='h-[90px]'>
                                                      <td className='p-5 w-[35%] '>
                                                            <span className='text-lg'>Transfer Amount : </span>
                                                      </td>
                                                      <td className='pl-8 '>
                                                            <input name="amount" min="1" type='number' value={transfer.amount} onChange={handleChange} className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" />
                                                      </td>
                                                </tr>
                                                <tr className='h-[90px]'>
                                                      <td colSpan={2} className='p-5 w-[100%] '>
                                                            <button className='p-3 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600 w-[8rem]'>Transfer</button>
                                                      </td>
                                                </tr>
                                          </tbody>
                                    </table>
                              </form>
                              <ToastContainer/>
                        </div>
                  </div>
            </div>
      )
};

export default Transfer

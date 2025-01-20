import React, { useEffect, useState } from 'react'
import Sidebar from './component/Sidebar'
import './Dashboard.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Transfer = () => {
      const { user_id } = useParams()
      const [account,SetAccount] = useState([])

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

      return (
            <div className='dashboard-container'>
                  <Sidebar user_id={user_id} />
                  <div className='information'>
                        <div className='flex justify-around p-3 m-4 align-middle border'>
                              <h1 className='text-3xl capitalize'>Withdraw Money</h1>
                        </div>
                        <div className='p-3 m-5 border-2 rounded-xl w-[90%] border-zinc-300'>
                        <table className='w-[80%]'>
                              <tbody>
                                    <tr className='h-[90px]'>
                                          <td className='p-5 w-[35%]'>
                                                <span className='text-lg'>Select Sender Account : </span>
                                          </td>
                                          <td className='pl-8'>
                                                <select name="sender_account" className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" required>
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
                                                <input name="pin_number" min="1" type='number' className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" />
                                          </td>
                                    </tr>
                                    <tr className='h-[90px]'>
                                          <td className='p-5 w-[35%] '>
                                                <span className='text-lg'>Withdraw Amount : </span>
                                          </td>
                                          <td className='pl-8 '>
                                                <input name="ammount" min="1" type='number' className="w-[90%] p-4 rounded-xl cursor-pointer border-2 border-zinc-400 mt-1" />
                                          </td>
                                    </tr>
                                    <tr className='h-[90px]'>
                                          <td colSpan={2} className='p-5 w-[100%] '>
                                          <button className='p-3 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600 w-[8rem]'>Transfer</button>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                        </div>
                  </div>
            </div>
      )
};

export default Transfer

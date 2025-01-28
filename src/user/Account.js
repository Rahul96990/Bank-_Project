import React, { useEffect, useState } from 'react'
// import './Dashboard.css'
import Sidebar from './component/Sidebar'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Account = () => {
  const { user_id } = useParams()

  let [account, SetAccount] = useState([]);

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

  return (
    <div className='dashboard-container'>
      <Sidebar user_id={user_id} />
      <div className='information'>
        <div className='flex justify-around p-3 m-4 align-middle border'>
          <h1 className='text-3xl capitalize'>Accounts information</h1>
          <Link to={`/user/addaccount/${user_id}`}><button className='p-3 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 hover:border hover:border-blue-600'>Add Account + </button></Link>
          
        </div>
        <div className='grid grid-cols-3 gap-3 m-3 text-lg max-h-[500px] mt-[3rem] overflow-auto custom-scrollbar'>
          {account.map((item, index) => (
            <div key={index} className='p-3 leading-10 border-2 rounded-md account-details border-zinc-800'>
              <p>Account Number: {item.account_number}</p>
              <p className='capitalize'>Account Type: {item.account_type}</p>
              <p>Balance Amount: {item.balance_amount}</p>
              <p>Account Creation Date: {item.account_creation_date}</p>
              <p>PAN Card: {item.pan_card}</p>
              <p>Name: {item.name}</p>
              <p>Branch Location: {item.branch_location}</p>
              <p>PIN: {item.pin}</p>
              <p>Annual Income: {item.annual_income}</p>
              <p>Phone Number: {item.phone_number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Account

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Dashboard.css'
import Sidebar from './component/Sidebar'
import BarComponent from './BarComponent'
import { AuthContext } from './AuthContext'
import axios from 'axios';

const Dashboard = () => {
	const { user_id } = useParams()
	const navigate = useNavigate()
	const signal = "totalsAmtBal"
	const [totalsAmtBal, setTotalsAmtBal] = useState([])
	const { isLoggedIn } = useContext(AuthContext)
	const {isVisited, setIsVisited} = useState(false)

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
			return
		}

		const fetchTotals = async () => {
			try {
				let fData = new FormData();
				fData.append("user_id", user_id);
				fData.append("signal", "totalsAmtBal");

				let response = await axios.post(
					"http://localhost/backend/dashboard.php",
					fData
				);
				setTotalsAmtBal(response.data);
				isLoggedIn(true)
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchTotals();

	}, [isLoggedIn, navigate, user_id]);

	return (
		<div className="grid grid-cols-5">
			<div className="col-span-1">
				<Sidebar user_id={user_id} />
			</div>
			<div className="col-span-4">
				<div className='p-2 pb-0 m-4 border'>
					<h1 className='text-3xl capitalize'>Dashboard</h1>
						<div className='flex mt-4 border-2 total-account w-[100%]'>
							<div className='p-4 m-2 text-left text-white bg-indigo-500 border-2 rounded-md '>
								<h2 className='text-[14px]'>Total Accounts</h2>
								<p className='mt-1 text-md'>{totalsAmtBal ? totalsAmtBal.total_amounts : "Loading..."}</p>
							</div>
							<div className='p-4 m-2 text-left text-white bg-indigo-500 border-2 rounded-md '>
								<h2 className='text-[14px]'>Total Saving Accounts</h2>
								<p className='mt-1 text-md'>{totalsAmtBal ? totalsAmtBal.total_saving_accounts : "Loading..."}</p>
							</div>
							<div className='p-4 m-2 text-left text-white bg-indigo-500 border-2 rounded-md '>
								<h2 className='text-[14px]'>Total Current Accounts</h2>
								<p className='mt-1 text-md'>{totalsAmtBal ? totalsAmtBal.total_current_accounts : "Loading..."}</p>
							</div>
							<div className='p-4 m-2 text-left text-white bg-indigo-500 border-2 rounded-md '>
								<h2 className='text-[14px]'>Total Saving Balance</h2>
								<p className='mt-1 text-md'>Rs : {isNaN(parseInt(totalsAmtBal?.total_saving_balance)) ? "0" : parseInt(totalsAmtBal.total_saving_balance)}</p>
							</div>
							<div className='p-4 m-2 text-left text-white bg-indigo-500 border-2 rounded-md '>
								<h2 className='text-[14px]'>Total Current Balance</h2>
								<p className='mt-1 text-md'>Rs : {isNaN(parseInt(totalsAmtBal?.total_current_balance)) ? "0" : parseInt(totalsAmtBal.total_current_balance)}</p>
							</div>
							<div className='p-4 m-2 text-left text-white bg-indigo-500 border-2 rounded-md '>
								<h2 className='text-[14px]'>Total Balance</h2>
								<p className='mt-1 text-md'>Rs : {isNaN(parseInt(totalsAmtBal?.total_balance)) ? "0" : parseInt(totalsAmtBal.total_balance)}</p>
							</div>
						</div>
					<BarComponent />
						</div>
			</div>
		</div>
	)
}

export default Dashboard

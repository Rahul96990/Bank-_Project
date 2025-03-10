import React, { useEffect, useState } from 'react'
// import './Sidebar.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBeer } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';


const Sidebar = ({ user_id }) => {
	const location = useLocation()
	const [user, SetUser] = useState([])
	const [loading, setLoading] = useState(true)
	const menuItems = [
		{ label: 'dashboard', link: `/user/dashboard/${user_id}` },
		{ label: 'account', link: `/user/account/${user_id}` },
		{ label: 'Apply for Loan', link: `/user/loan/${user_id}` },
		{ label: 'Check Balance', link: `/user/checkbal/${user_id}` },
		{ label: 'Transcations', link: `/user/transcations/${user_id}` },
		{ label: 'transfer', link: `/user/transfer/${user_id}` },
		{ label: 'withdraw', link: `/user/withdraw/${user_id}` },
		{ label: 'deposite', link: `/user/deposite/${user_id}` },
		{ label: 'profile', link: `/user/profile/${user_id}` },
	];

	useEffect(() => {
		const fData = new FormData()
		fData.append("user_id", user_id);
		axios.post("http://localhost/backend/login.php", fData)
			.then(response => SetUser(response.data))
		setLoading(false)
	}, [user_id])

	return (
		<div className='sidebar-container h-[93vh] border-r-2 border-blue-700 bg-indigo-800'>
			<div className='bg-white info-box'>
				<div className='w-auto text-6xl rounded-full border-6 h-[70px] p-3'>
					<FaUserAlt className='user-icon' />
				</div>
				<div className='m-3 mt-2 info'>
					<h1>{user.first_name} {user.last_name}</h1>
					<p className='pb-2'>{user.email}</p>
				</div>
			</div>
			<div className='p-2 menu-list'>
				{menuItems.map((item, index) => (
					<li key={index} className={`menu-item mb-2 capitalize transition-2 rounded-tr-3xl rounded-br-3xl cursor-pointer text-lg p-[0.5rem] pl-4
  ${location.pathname === item.link ? 'text-blue-700 bg-white' : 'hover:bg-white hover:text-blue-700'} ${location.pathname !== item.link ? 'text-white' : 'hover:bg-white hover:text-blue-700'}`}>
						<Link to={item.link}>{item.label}</Link>
					</li>
				))}
			</div>
		</div>
	)
}

export default Sidebar
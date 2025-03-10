import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'

const Navbar = () => {
	
	return (
		<div>
			<div className='flex items-center justify-around h-20 pl-20 bg-indigo-600 pr-14'>
				<div className='left'>
					<Link to="/"><h1 className='text-lg italic text-white'>TrustWave Bank</h1></Link>
				</div>
				<div className='middle'>
					<ul className="flex gap-8 align-middle ">
						<li className='text-lg text-white'><Link to="/">Home</Link></li>
						<li className='text-lg text-white'><Link to="/about">About Us</Link></li>
						<li className='text-lg text-white'><Link to="/blog">Blogs</Link></li>
						<li className='text-lg text-white'><Link to="/contact">Contact</Link></li>
					</ul>
				</div>
				<div className='flex gap-4'>
					<button className='p-3 bg-white border rounded-md hover:bg-indigo-100 hover:border-2 hover:bg-indigo-600 hover:border-white-500'><Link to="/login">Login</Link></button>
					<button className='p-3 bg-white border rounded-md hover:bg-indigo-100 hover:border-2 hover:bg-indigo-600 hover:border-white-500'><Link to="/register">Register</Link></button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

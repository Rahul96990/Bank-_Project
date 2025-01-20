import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'

const Navbar = () => {
	
	return (
		<div className=''>
			<div className='flex h-20 bg-indigo-600 pl-20 pr-14'>
				<div className='left'>
					<Link to="/"><h1 className='text-white text-lg italic'>TrustWave Bank</h1></Link>
				</div>
				<div className='middle'>
					<ul className=" flex align-middle gap-8">
						<li className='text-white text-lg'><Link to="/">Home</Link></li>
						<li className='text-white text-lg'><Link to="/about">About Us</Link></li>
						<li className='text-white text-lg'><Link to="/blog">Blogs</Link></li>
						<li className='text-white text-lg'><Link to="/contact">Contact</Link></li>
					</ul>
				</div>
				<div className='right flex gap-6'>
					<button className='bg-white rounded-md p-2 pl-4 pr-4'><Link to="/login">Login</Link></button>
					<button className='bg-white rounded-md p-2 pl-4 pr-4'><Link to="/register">Register</Link></button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

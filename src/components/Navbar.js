import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'

const Navbar = () => {
	
	return (
		<div className=''>
			<div className='flex h-20 pl-20 bg-indigo-600 pr-14'>
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
				<div className='flex gap-6 right'>
					<button className='p-2 pl-4 pr-4 bg-white rounded-md'><Link to="/login">Login</Link></button>
					<button className='p-2 pl-4 pr-4 bg-white rounded-md'><Link to="/register">Register</Link></button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

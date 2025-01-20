import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import './Login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../user/AuthContext";

const Login = () => {

	const navigate = useNavigate(); // Initialize useNavigate hook
	const { login } = useContext(AuthContext)

	const { isLoggedIn } = useContext(AuthContext)


	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userInfo, setUserInfo] = useState(null); // Store the user info after successful login

	const handleLogin = async (e) => {
		e.preventDefault();
		const url = "http://localhost/backend/login.php";
		if (fullname === "" || email === "" || password === "") {
			toast.error("Incomplete Data");
			return
		}
		let fData = new FormData();
		fData.append("fullname", fullname);
		fData.append("email", email);
		fData.append("password", password);


		try {
			// Make API call
			const response = await axios.post(url, fData);

			// Extract data from the API response
			const APIResponse = response.data;

			// Check if the response contains the expected data
			if (APIResponse.message === "Login_Successful!") {
				setUserInfo(APIResponse); // Set user info to display
				toast.success("Login successful!");
				setTimeout(() => {
					login()
					navigate(`/user/dashboard/${APIResponse.user_id}`); // Navigate to Dashboard
				}, 4000);

			} else if (APIResponse.message === "Invalid Data!") {
				toast.error("Invalid Data!"); // Show error toast
			} else if (APIResponse.message === "User not found!") {
				toast.error("User not found!"); // Show error toast
			}
		} catch (error) {
			console.error("Error during login:", error);
			toast.error("An error occurred. Please try again."); // Show error toast
		}
	};

	return (
		<form className="w-[35%] m-auto p-0 mt-[3rem]  border-zinc-500 border-2  rounded-2xl" onSubmit={handleLogin}>
			<div className="login-form">
				<div className=" pt-[10px] h-[50px] bg-sky-700 text-white text-center rounded-tl-2xl rounded-tr-2xl">
					<h2 className="text-2xl">User Login</h2>
				</div>
				{ }
				<div className="p-5 pl-7 pr-7">
					<div className="">
						<span>User Name </span>
						<input
							type="text"
							placeholder="Username"
							className="mt-[4px] w-[100%] border-zinc-500 border-2 p-2"
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
						/>
					</div>
					<div className="pt-4">
						<span>Enter Email </span>
						<input
							type="email"
							placeholder="Email"
							className="mt-[4px] w-[100%] border-zinc-500 border-2 p-2"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="pt-4">
						<span>Enter Password </span>
						<input
							type="password"
							className="mt-[4px] w-[100%] border-zinc-500 border-2 p-2"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button className="bg-sky-700 w-[100%] text-white mt-4 py-2 px-4 rounded-lg hover:bg-sky-800 ">Login</button>
					<p className="mt-2 text-center">If you don't have account then <Link className="" to="/register"><span className='underline'>Register</span></Link></p>
				</div>

			</div>

			{/* Display user info if login is successful */}
			{/* {userInfo && (
				<div>
					<h3>Welcome, {userInfo.fullname}!</h3>
					<p>
						<strong>Full Name:</strong> {userInfo.user_id}
					</p>
					<p>
						<strong>Full Name:</strong> {userInfo.fullname}
					</p>
					<p>
						<strong>Email:</strong> {userInfo.email}
					</p>
					<p>
						<strong>Password:</strong> {userInfo.password}
					</p>
				</div>
			)} */}

			{/* Toast Container to display notifications */}
			<ToastContainer />
		</form>
	);
};

export default Login;

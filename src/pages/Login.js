import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../user/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (fullname === "" || email === "" || password === "") {
      toast.error("Incomplete Data");
      return;
    }
    
    setLoading(true); // Set loading to true when request starts

    try {
      const url = "http://localhost/backend/login.php";
      let fData = new FormData();
      fData.append("fullname", fullname);
      fData.append("email", email);
      fData.append("password", password);
      
      const response = await axios.post(url, fData);
      const APIResponse = response.data;

      if (APIResponse.message === "Login_Successful!") {
        toast.success("Login successful!");
        setTimeout(() => {
          login();
          navigate(`/user/dashboard/${APIResponse.user_id}`);
        }, 4000);
      } else {
        toast.error(APIResponse.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after request finishes
    }
  };

  return (
    <form className="w-[35%] m-auto p-0 mt-[3rem] border-zinc-500 border-2 rounded-2xl" onSubmit={handleLogin}>
      <div className="login-form">
        <div className="pt-[10px] h-[50px] bg-sky-700 text-white text-center rounded-tl-2xl rounded-tr-2xl">
          <h2 className="text-2xl">User Login</h2>
        </div>
        <div className="p-5 pl-7 pr-7">
          <div>
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
          <button className="bg-sky-700 w-[100%] text-white mt-4 py-2 px-4 rounded-lg hover:bg-sky-800 flex justify-center items-center" disabled={loading}>
            {loading ? <div className="loader"></div> : "Login"}
          </button>
          <p className="mt-2 text-center">If you don't have an account then <Link to="/register"><span className='underline'>Register</span></Link></p>
        </div>
      </div>
      <ToastContainer />
      <style>
        {`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </form>
  );
};

export default Login;

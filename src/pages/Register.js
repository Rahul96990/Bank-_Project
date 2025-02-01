import React, { useEffect, useState } from 'react';
// import "./Register.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
       const navigate = useNavigate();
       const url = "http://localhost/backend/register.php";

       const [formData, setFormData] = useState({
              firstname: '',
              middlename: '',
              lastname: '',
              password: '',
              email: '',
              phone: '',
              dob: '',
              address: '',
              state: '',
              city: '',
              aadhaar: '',
              gender: ''
       });

       const states = [
              "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
              "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
              "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
              "Chandigarh", "Delhi", "Puducherry"
       ];

       const genders = ['Male', 'Female', 'Others'];

       const handleChange = (e) => {
              setFormData({
                     ...formData,
                     [e.target.name]: e.target.value
              });
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              let fData = new FormData();
              fData.append("firstname", formData.firstname);
              fData.append("middlename", formData.middlename);
              fData.append("lastname", formData.lastname);
              fData.append("password", formData.password);
              fData.append("email", formData.email);
              fData.append("phone", formData.phone);
              fData.append("dob", formData.dob);
              fData.append("address", formData.address);
              fData.append("state", formData.state);
              fData.append("city", formData.city);
              fData.append("aadhaar", formData.aadhaar);
              fData.append("gender", formData.gender);



              try {
                     const responseData = await axios.post(url, fData);
                     console.log(responseData)
                     if (responseData.data.message === "Registration successful!") {
                            toast.success("Registration successful!")
                            setTimeout(() => {
                                   navigate('/login');
                            }, 4000);
                     } else if (responseData.data.message === 'User already exists!') {
                            toast.error("User already exists!")
                     } else {
                            toast.error(responseData.message);
                     }
              } catch (error) {
                     toast.error("An error occurred. Please try again.");
              }
       };

       return (
              <div className='register-container'>
                     <form onSubmit={handleSubmit} className='p-0 m-auto mt-[3rem] border-zinc-500 border-2 rounded-2xl w-[90%] '>
                            <div className=" pt-[10px] h-[50px] bg-sky-700 text-white text-center rounded-tl-2xl rounded-tr-2xl">
                                   <h2 className="text-2xl">User Registration</h2>
                            </div>
                            <div className='grid grid-cols-3 gap-1 p-5 data-field'>
                                   <div className='box'>
                                          <p>First Name:</p>
                                          <input type="text" className="w-[94%] p-2 border-2 border-zinc-400 focus:border-zinc-600 mt-1" name="firstname" value={formData.firstname} onChange={handleChange} required />
                                   </div>

                                   <div className='box'>
                                          <p>Middle Name:</p>
                                          <input type="text" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="middlename" value={formData.middlename} onChange={handleChange} />
                                   </div>

                                   <div className='box'>
                                          <p>Last Name:</p>
                                          <input type="text" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="lastname" value={formData.lastname} onChange={handleChange} required />
                                   </div>
                                   <div className='mt-4 box'>
                                          <p>Password:</p>
                                          <input type="password" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="password" value={formData.password} onChange={handleChange} required />
                                   </div>

                                   <div className='mt-4 box'>
                                          <p>Email:</p>
                                          <input type="email" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="email" value={formData.email} onChange={handleChange} required />
                                   </div>

                                   <div className='mt-4 box'>
                                          <p>Phone:</p>
                                          <input type="tel" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="phone" value={formData.phone} onChange={handleChange} required />
                                   </div>
                                   <div className='mt-4 box'>
                                          <p>Date of Birth:</p>
                                          <input type="date" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="dob" value={formData.dob} onChange={handleChange} required />
                                   </div>

                                   <div className='mt-4 box'>
                                          <p>Address:</p>
                                          <input type="text" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="address" value={formData.address} onChange={handleChange} required />
                                   </div>

                                   <div className='mt-4 box'>
                                          <p>State:</p>
                                          <select name="state" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" value={formData.state} onChange={handleChange} required>
                                                 <option value="" disabled>Select State</option>
                                                 {states.map((state, index) => (
                                                        <option key={index} value={state}>{state}</option>
                                                 ))}
                                          </select>
                                   </div>
                                   <div className='mt-4 box'>
                                          <p>City:</p>
                                          <input type="text" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="city" value={formData.city} onChange={handleChange} required />
                                   </div>

                                   <div className='mt-4 box'>
                                          <p>Aadhaar:</p>
                                          <input type="number" maxLength='12' className="w-[95%] p-2 border-2 border-zinc-400 mt-1" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required />
                                   </div>

                                   <div className='mt-4 box'>
                                          <p>Gender:</p>
                                          <select name="gender" className="w-[95%] p-2 border-2 border-zinc-400 mt-1" value={formData.gender} onChange={handleChange} required>
                                                 <option value="" disabled>Select Gender</option>
                                                 {genders.map((gender, index) => (
                                                        <option key={index} value={gender}>{gender}</option>
                                                 ))}
                                          </select>
                                   </div>
                            </div>
                            <button type="submit" className='w-[96%] rounded-md ml-[2%] p-2 text-white bg-sky-700'>Register</button>
                            <p className='m-2 text-center'>If you have an account, then <Link to="/login"><span className='underline'>Login</span></Link></p>
                            <ToastContainer />
                     </form>
              </div>
       );
};

export default Register;

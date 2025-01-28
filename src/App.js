// src/App.js
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar'
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';
import Register from './pages/Register';
import Dashboard from './user/Dashboard';
import AddAccount from './user/AddAccount';
import Account from './user/Account';
import Deposite from './user/Deposite';
import Withdraw from './user/Withdraw';
import Transfer from './user/Transfer';
import Header from './user/component/Header';
import { AuthContext, AuthProvider } from './user/AuthContext';
import Profile from './user/Profile';
import Transcations from './user/Transcations';
import UpdateProfile from './user/UpdateProfile';

function App() {
     const { isLoggedIn } = useContext(AuthContext)
     return (
          <Router>
               {isLoggedIn ? <Header /> : <Navbar />}
               <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/blog" element={<BlogPage />} />

                    <Route path="/user/dashboard/:user_id" element={<Dashboard />} />
                    <Route path="/user/account/:user_id" element={<Account />} />
                    <Route path="/user/deposite/:user_id" element={<Deposite />} />
                    <Route path="/user/transfer/:user_id" element={<Transfer />} />
                    <Route path="/user/transcations/:user_id" element={<Transcations />} />
                    <Route path="/user/withdraw/:user_id" element={<Withdraw />} />
                    <Route path="/user/profile/:user_id" element={<Profile />} />
                    <Route path="/user/updateprofile/:user_id" element={<UpdateProfile />} />
                    <Route path="/user/addaccount/:user_id" element={<AddAccount />} />

               </Routes>
          </Router>
     );
}

export default App;

import './App.css';
import Home from './pages/home/home';
import { Routes, Route ,useNavigate,useLocation } from "react-router-dom";
import UserLogin from './Components/Login/userLogin';
import Register from './Components/Signup/register';
import Dashboard from './pages/Dashboard/dashboard';
import Sidebar from './Components/Sidebar/sidebar';
import { useState, useEffect } from 'react';
import Member from './pages/Member/member';
import GeneralUser from './pages/GeneralUser/generalUser';
import MemberDetail from './pages/MemberDetail/memberDetail';
import 'react-toastify/dist/ReactToastify.css';
import Graph from './Components/Graph/graph';
 

function App() {
  const navigate = useNavigate ();
  const location = useLocation(); 
  const [isLogin,setIsLogin]= useState(false)

  useEffect(()=> {
    let isLogedIn = localStorage.getItem("isLogin");
    if(isLogedIn){
      setIsLogin(true);
      navigate('/dashboard')

    }else {
      setIsLogin(false);
      navigate('/');
    }
  },[localStorage.getItem("isLogin")])
  return (
    <div className="flex">
      
      {
        isLogin && <Sidebar />
      }
      
      
    
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/member" element={<Member/>} />
        <Route path="/graph" element={<Graph/>} />
        
        <Route path='/specific/:page' element={<GeneralUser/>} />
        <Route path='/member/:id' element={<MemberDetail/>} />
        
      </Routes>
    </div>
  );
}

export default App;

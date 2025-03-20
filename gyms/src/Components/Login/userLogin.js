import React,{useState} from 'react'
import Model from '../Model/model'
import Forgetpassword from '../ForgetPassword/forgetpassword';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';

function UserLogin() {
  const [loginField,setLoginField] = useState({"userName":"","password":""});
  const navigate = useNavigate();

  const handleLogin = async()=>{
   // sessionStorage.setItem("isLogin",true)
   // navigate('/dashboard')
    await axios.post('http://localhost:4000/auth/login',loginField,{withCredentials:true}).then((response)=>{
        console.log(response.data);
        localStorage.setItem('gymName',response.data.gym.gymName);
        localStorage.setItem('gymPic',response.data.gym.profilePic);
        localStorage.setItem('userName',response.data.gym.userName);
        localStorage.setItem('isLogin',true);
        localStorage.setItem('token',response.data.token);

        navigate('/dashboard')

    }).catch(err=>{
         const errorMessage = err.response.data.error
       //console.log(errorMessage);
        toast.error(errorMessage)
      
    })
   }
   const handleSignup =()=>{
    navigate('/register')
   }
   const [forgetPassword,setforgetPassword]=useState(false);
    const handleClose =()=>{
      setforgetPassword(prev=>!prev);
    }
    const handleOnChange =(event,name)=>{
      setLoginField({...loginField,[name]:event.target.value});
  }
  
  return (
    <div>
      {/* Main Container for Login & Register */}
      <div className="w-screen h-screen  min-h-screen  flex  flex-col justify-center    pt-12 bg-cover bg-center bg-no-repeat   items-center 
         bg-[url('')] 
      
      ">
          <div className="absolute inset-0 bg-[url('https://files.oaiusercontent.com/file-P2mnznjfy5mC13tLGeWtXL?se=2025-03-19T12%3A12%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D6cd143a7-9dd2-4a30-a7c4-a7d78afb94e6.webp&sig=bmsRRUbg%2BWGtndcpdhx6fyQ%2BbxfEYy2t%2BVD5NVDrZfg%3D')] bg-cover bg-center brightness-50 blur-sm"></div>
      
        {/* Left Side - Login Form */}
        <div className=" text-center bg-[rgba(10,15,30,0.8)] backdrop-blur-md shadow-lg border border-[rgba(160,132,232,0.3)] rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#F8F9FA] text-center">Admin Login</h2>

          {/* Username Input */}
          <div className="mb-4 text-left">
            <label className=" font-bold text-[#F8F9FA] text-center">
              Username
            </label>
            <input
            value={loginField.userName} onChange={(event)=>{handleOnChange(event,"userName")}}
              type="text"
              placeholder="Enter your username"
              className="w-full bg-[#1B1F38] text-[#E0E0E0] placeholder-[#A084E8] border border-transparent focus:border-[#A084E8] focus:ring-2 focus:ring-[#A084E8] rounded-lg px-4 py-2 mt-4 shadow-md"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 text-left">
            <label className=" font-bold text-[#F8F9FA] text-center mb-2">
              Password
            </label>
            <input
            value={loginField.password}  onChange={(event)=>{handleOnChange(event,"password")}}
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#1B1F38] text-[#E0E0E0] placeholder-[#A084E8] border border-transparent focus:border-[#A084E8] focus:ring-2 focus:ring-[#A084E8] rounded-lg px-4 py-2 mt-4 shadow-md"
            />
          </div>

          {/* Login Button */}
          <div className="w-full bg-gradient-to-r from-[#3A86FF] to-[#8338EC] text-white font-semibold rounded-lg py-3 mt-6 shadow-lg hover:shadow-[0px_0px_15px_#46EFFF] transition duration-300" onClick={()=>{handleLogin()}}>
            Login
          </div>

          {/* Forgot Password & Signup */}
          <div className="mt-4  font-bold text-[#F8F9FA] text-center flex justify-between">
            <div className="text-[#46EFFF] hover:underline cursor-pointer" onClick={()=>handleClose()}>Forgot Password?</div>
            <div  onClick={()=>{handleSignup()}} className="text-[#46EFFF] hover:underline cursor-pointer">Sign Up</div>
          </div>
        </div>

        
      </div>
      {forgetPassword &&<Model header="Forgot password" handleClose={handleClose} Content={<Forgetpassword/>}/>}
      <ToastContainer/>
    </div>
  )
}

export default UserLogin

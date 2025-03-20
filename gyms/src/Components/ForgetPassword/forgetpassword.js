import React ,{useState} from 'react'
import Loader from '../Loader/loader'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';


function Forgetpassword() {
    const [emailSubmit,setEmailSubmit] = useState(false)
    const [otpValidate,setOtpValidate] =useState(false)
    const [loader,setLoader]=useState(false)
    const [contentVal,setContentValue] = useState("Submit Your Email ")

    const [inputField, setInputField] = useState({email: "", otp: "", newPassword: ""})

    const handleSubmit =()=>{
        if(!emailSubmit){
           
            sendOtp();
        }else if(emailSubmit && !otpValidate){
           
           verifyOTP();
        }else{
          changePassword();
        }
    }
      const changePassword =async()=>{
        setLoader(true);
        await axios.post('http://localhost:4000/auth/reset-password',{email:inputField.email,newPassword:inputField.newPassword}).then((response)=>{
             toast.success(response.data.message);
             setLoader(false);
        }).catch(err=>{
          const errorMessage = err.response.data.error
        //console.log(errorMessage);
         toast.error(errorMessage)
         setLoader(false);
       
     })
      }





     const verifyOTP = async()=>{
      setLoader(true);
        await axios.post('http://localhost:4000/auth/reset-password/checkOtp',{email:inputField.email,otp:inputField.otp}).then((response)=>{
           
          setOtpValidate(true)
          setContentValue("Submit Your New Password")
          toast.success(response.data.message);
           setLoader(false);
        }).catch(err=>{
          const errorMessage = err.response.data.error
        //console.log(errorMessage);
         toast.error(errorMessage)
         setLoader(false);
       
     })
     }



     const sendOtp = async() => {
       setLoader(true);
      await axios.post('http://localhost:4000/auth/reset-password/sendOtp',{email:inputField.email}).then((response)=>{
        setEmailSubmit(true)
         setContentValue("Submit Your OTP")
          toast.success(response.data.message);
          setLoader(false);
      }).catch(err=>{
                   const errorMessage = err.response.data.error
                 //console.log(errorMessage);
                  toast.error(errorMessage)
                  setLoader(false);
                
              })
     }

    const handleOnChange =(event,name)=>{
      setInputField({...inputField,[name]:event.target.value})
  }
  
  return (
    <div className="w-full">
  
  <p className="w-full mb-5 text-bold text-lg">
    Enter your email to receive an OTP.
  </p>

  {/* Email Input */}
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-400 mb-2">Email</label>
    <input
      value={inputField.email}
      onChange={(event) => handleOnChange(event, "email")}
      type="email"
      placeholder="Enter your email"
      className="w-1/2 p-3 rounded-lg bg-[#121530] text-white border border-[#46EFFF] focus:ring-2 focus:ring-[#A084E8] shadow-lg"
    />
  </div>

  {/* OTP Input */}
  {emailSubmit && (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-400 mb-2">Enter OTP</label>
      <input
        value={inputField.otp}
        onChange={(event) => handleOnChange(event, "otp")}
        type="text"
        placeholder="Enter your OTP"
        className="w-1/2 p-3 rounded-lg bg-[#121530] text-white border border-[#46EFFF] focus:ring-2 focus:ring-[#A084E8] shadow-lg"
      />
    </div>
  )}

  {/* New Password Input */}
  {otpValidate && (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-400 mb-2">Enter Your New Password</label>
      <input
        value={inputField.newPassword}
        onChange={(event) => handleOnChange(event, "newPassword")}
        type="password"
        placeholder="Enter your new password"
        className="w-1/2 p-3 rounded-lg bg-[#121530] text-white border border-[#46EFFF] focus:ring-2 focus:ring-[#A084E8] shadow-lg"
      />
    </div>
  )}

  {/* Send OTP Button */}
  <div
    className="w-full text-center mt-4 py-3 bg-gradient-to-r from-[#3A86FF] to-[#8338EC] hover:shadow-[0px_0px_15px_#46EFFF] text-white font-semibold rounded-lg transition-all duration-300 shadow-md cursor-pointer transform hover:scale-105"
    onClick={() => handleSubmit()}
  >
    {contentVal}
  </div>

  {/* Back to Login */}
  <div className="text-[#A084E8] text-sm mt-4 text-center">
    Remember your password?{" "}
    <Link to={'/userLogin'} className="text-[#46EFFF] hover:underline cursor-pointer">
    Login</Link>
  </div>

  {loader && <Loader />}
  <ToastContainer />
</div>


  )
}

export default Forgetpassword

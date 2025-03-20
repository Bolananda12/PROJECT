import React,{useState}  from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {toast,ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';

function Register() {
  const [inputField, setInputField] = useState({ gymName: "", email: "", userName: "", password: "", profilePic: "https://t4.ftcdn.net/jpg/09/39/69/79/360_F_939697966_wjbHy9C2dxbj9pEq7mLQY0nnro7nn4p4.jpg" })
  const [loaderImage,setLoaderImage]=useState(false);

  const handleOnChange =(event,name)=>{
    setInputField({...inputField,[name]:event.target.value})
}
 
    
 const uploadImage = async (event) => {
  setLoaderImage(true)
  console.log("Image uploading...");
  const files = event.target.files;
  if (!files || files.length === 0) {
    console.log("No file selected.");
    return;
  }

  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'gym-management'); // FIXED
  data.append('cloud_name', 'dsscj2vni'); // OPTIONAL: Only if needed

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/dsscj2vni/image/upload", data);
    console.log("Upload Success:", response.data);
    
    // Update the profilePic field with the uploaded image URL
    const imageUrl = response.data.url;
     setInputField({...inputField,['profilePic']:imageUrl})
    //setInputField((prev) => ({ ...prev, profilePic: response.data.secure_url }));
       setLoaderImage(false)
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
    setLoaderImage(false)
  }
};

const handleRegister =async()=>{
    await axios.post('http://localhost:4000/auth/register',inputField).then((response)=>{

     // console.log(response.data);
       const successMsg = response.data.message;
       toast.success(successMsg);
    }).catch(err=>{
             const errorMessage = err.response.data.error
           //console.log(errorMessage);
            toast.error(errorMessage)
          
        })
};
 
  return (
    <div>
      {/* Right Side - Register Form */}
      <div className="w-screen h-screen  min-h-screen  flex  flex-col justify-center    pt-12 bg-cover bg-center bg-no-repeat   items-center 
         bg-[url('')]">
          <div className="absolute inset-0 bg-[url('https://files.oaiusercontent.com/file-19dF2UbYENBPmJcxDkG4Cv?se=2025-03-19T12%3A12%3A11Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df5575d7a-d095-4969-9f40-997cc1562b30.webp&sig=cylR3u85sRe%2BSBJOya4s6YXno2xTB/gGW7Cq53Coytg%3D')] bg-cover bg-center brightness-50 blur-sm"></div>
          <div className="text-left  h-[500px] overflow-y-auto
          bg-[rgba(10,15,30,0.8)] backdrop-blur-md shadow-lg border border-[rgba(160,132,232,0.3)] rounded-2xl p-8 w-full max-w-lg
          ">
          <h2 className="text-2xl font-bold text-[#F8F9FA] text-center">
            Create Your Account
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="font-bold text-[#F8F9FA] text-center">
              Email
            </label>
            <input
                value={inputField.email} onChange={(event)=>{handleOnChange(event,"email")}}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#1B1F38] text-[#E0E0E0] placeholder-[#A084E8] border border-transparent focus:border-[#A084E8] focus:ring-2 focus:ring-[#A084E8] rounded-lg px-4 py-2 mt-4 shadow-md"
            />
          </div>

          {/* Gym Name */}
          <div className="mb-4">
            <label className="font-bold text-[#F8F9FA] text-center">
              Gym Name
            </label>
            <input
              value={inputField.gymName} onChange={(event)=>{handleOnChange(event,"gymName")}}
              type="text"
              placeholder="Enter your gym name"
              className="w-full bg-[#1B1F38] text-[#E0E0E0] placeholder-[#A084E8] border border-transparent focus:border-[#A084E8] focus:ring-2 focus:ring-[#A084E8] rounded-lg px-4 py-2 mt-4 shadow-md"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="font-bold text-[#F8F9FA] text-center">
              Username
            </label>
            <input
               value={inputField.userName} onChange={(event)=>{handleOnChange(event,"userName")}}
              type="text"
              placeholder="Choose a username"
              className="w-full bg-[#1B1F38] text-[#E0E0E0] placeholder-[#A084E8] border border-transparent focus:border-[#A084E8] focus:ring-2 focus:ring-[#A084E8] rounded-lg px-4 py-2 mt-4 shadow-md"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="font-bold text-[#F8F9FA] text-center">
              Password
            </label>
            <input
            value={inputField.password} onChange={(event)=>{handleOnChange(event,"password")}}
              type="password"
              placeholder="Create a password"
              className="w-full bg-[#1B1F38] text-[#E0E0E0] placeholder-[#A084E8] border border-transparent focus:border-[#A084E8] focus:ring-2 focus:ring-[#A084E8] rounded-lg px-4 py-2 mt-4 shadow-md"
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="font-bold text-[#F8F9FA] text-center">
              Upload Your Profile Image
            </label>
            <div className="flex items-center justify-between px-4 py-3 border rounded-lg shadow-sm">
              <span className="text-gray-600">No file chosen</span>

              <input type="file" onChange={(e)=>{uploadImage(e)}} className="hidden" id="file-upload" />

              

              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Choose Image
              </label>
             
            </div>
            <img src={inputField.profilePic} className='h-[250px] w-[250px]'/>
            {
                loaderImage && <Box sx={{ width: '100%' }}>
                <LinearProgress />
                 </Box>
              }
          </div>

          {/* Register Button */}
          <div className="w-full text-center bg-gradient-to-r from-[#3A86FF] to-[#8338EC] text-white font-semibold rounded-lg py-3 mt-6 shadow-lg hover:shadow-[0px_0px_15px_#46EFFF] transition duration-300 " onClick ={()=>handleRegister()}>
            
            Register
          </div>

          {/* Login Redirect */}
          <p className="text-[#A084E8] text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to={'/userLogin'} className="text-[#46EFFF] hover:underline cursor-pointer">
              Login
            </Link>
          </p>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Register

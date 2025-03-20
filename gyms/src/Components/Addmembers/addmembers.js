import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from "react-toastify";
const Addmembers = () => {
  const [inputField, setInputField]=useState({name:"",mobileNo:"",address:"",membership:"",profilePic:"https://imgs.search.brave.com/D9s_Ligx0yusV1Qg7hijgsU7hu7YV8Lgs9mzKbiu0k8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tYW4tc3RhbmRp/bmctZ3ltLXdpdGgt/aGlzLWFybXMtY3Jv/c3NlZF85NDY1ODUt/NjgzOS5qcGc_c2Vt/dD1haXNfaHlicmlk",joiningDate:""});
     
      const [loaderImage,setLoaderImage]=useState(false);
      const [membershipList,setMembershipList]=useState([]);
      const [selectedOption,setSelectedOption]=useState("");
  
  
  
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

      const fatchMembership = async()=>{
        await axios.get('http://localhost:4000/plans/get-membership',{withCredentials:true}).then((res) =>{
          setMembershipList(res.data.membership);
          console.log(res.data.membership);
          if(res.data.membership.length===0){
           
            return toast.error('No any Membership Added yet',{className:"text-lg"});

          }else{
            let a = res.data.membership[0]._id;
             setSelectedOption(a);
             setInputField({...inputField,membership:a});
          }
          }).catch((err) => {
          console.log(err);
          toast.error("Something wrong heppend")
         });
      }
      useEffect(() => {
        console.log(inputField);
        fatchMembership();
      }, []); 

      const handleOnChangeSelect=(event)=>{
        let value = event.target.value;
         setSelectedOption(value);
         setInputField({...inputField,membership:value});

         
         
      }
       const handleRegisterButton = async()=>{
         await axios.post('http://localhost:4000/members/register-member',inputField,{withCredentials:true}).then((resp)=>{
          toast.success("Added Successfully");
          setTimeout(()=>{
            window.location.reload();
          },2000)
         }).catch((err) => {
          console.log(err);
          toast.error("Something wrong heppend")
         });
       }
  return (
    <div className='text-black'>
       <div className='grid gap-5 grid-cols-2 text-lg'>
        <input 
          value={inputField.name} onChange={(event)=>{handleOnChange(event,"name")}}
        placeholder='name of the joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input
        value={inputField.mobileNo} onChange={(event)=>{handleOnChange(event,"mobileNo")}}
        placeholder='mobile nos ' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input 
         value={inputField.address} onChange={(event)=>{handleOnChange(event,"address")}}
        placeholder='Enter Address ' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input 
         value={inputField.joiningDate} onChange={(event)=>{handleOnChange(event,"joiningDate")}}
        type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        
        <select value={selectedOption} onChange={handleOnChangeSelect} className='border-2 w-[90%] b-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
          {
            membershipList.map((item,index)=>{
               return(
                  <option key={index} value={item._id}>{item.months} months memberShip</option>
               );
            })
          }
          
        </select>

         <input type='file' onChange={(e)=>{uploadImage(e)}} className=''/>
           
         

          <div className='w-[100px] h-[100px]'>
            <img src={inputField.profilePic} className='w-full h-full rounded-full'/>
            { 
          loaderImage && <Box sx={{ width: '100%' }}>
          <LinearProgress />
           </Box>
         }
          </div>
          <div onClick={()=>handleRegisterButton()} className='p-3 border-2  w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400  '>
            Register
          </div>
       </div>
       <ToastContainer/>
    </div>
  )
}

export default Addmembers

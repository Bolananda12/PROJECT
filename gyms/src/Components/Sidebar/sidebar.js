import React,{useState,useEffect} from "react";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link,useLocation ,useNavigate} from 'react-router-dom';
const Sidebar = () => {
    const [greeting,setGreeting] = useState("");
    const location=useLocation();
     const navigate=useNavigate();
    const greetingMessage =()=>{
        const currentHour = new Date().getHours();
        if(currentHour<12){
            setGreeting("Good Morning");
    }else if(currentHour<18){
        setGreeting("Good Afternoon");
    }else if (currentHour<21){
        setGreeting("Good Evening");

    } else {
        setGreeting("Good Night ")
    }
       
    }
    useEffect(() => {
      greetingMessage();
    },[])

    const handleLogout= async()=>{
      localStorage.clear();
       navigate('/')
    }
  return (
    <div className="w-1/4 h-[100vh] border-2 bg-slate-900 text-white p-5 font-extralight ">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-400 drop-shadow-xl tracking-wider uppercase text-center">
          {localStorage.getItem('gymName')}
        </div>
      <div className="flex gap-5 my-5">
        <div className="w-[100px] h-[100px] rounded-lg">
          <img
            className="w-full h-full rounded-full"
            src={localStorage.getItem("gymPic")}
          />
        </div>
        <div>
          <div className="text-2xl">{greeting}</div>
          <div className="text-xl mt-1 font-semibold text-left">
           {localStorage.getItem("userName")}
          </div>
        </div>
      </div>
      <div className="mt-10 py-10  border-t-2 border-gray-700">
        <Link  to={'/dashboard'} className={`flex gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 hover:from-purple-600 hover:to-pink-500  hover:text-black ${location.pathname==="/dashboard"?'border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ':null}`}>
            <div><HomeIcon/></div>
             <div>Dashboard</div>
        </Link>
      <Link to='/member' className={`flex  mt-5 gap-4 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 hover:from-purple-600 hover:to-pink-500 hover:text-black ${location.pathname==="/member"?'border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ':null}`}>
            <div><GroupsIcon/></div>
             <div>Members</div>
        </Link>
      
        <div onClick={()=>{handleLogout()}} className="flex mt-5 gap-4 font-semibold text-xl  p-3 rounded-xl cursor-pointer hover: bg-red-700">
            <div><LogoutIcon/></div>
             <div>Logout</div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;

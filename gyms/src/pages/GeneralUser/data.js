import axios from "axios";

const getMonthlyJoined = async()=>{
    try{
        const response = await axios.get('http://localhost:4000/members/monthly-member',{withCredentials:true});
        console.log(response);
        return response.data;

    }catch(error) {
       console.error('Error fetching data :',error);
       throw error;
    }
}

const threeDayExpire = async()=>{
    try{
        const response = await axios.get('http://localhost:4000/members/within-3-days-expiring',{withCredentials:true});
        console.log(response);
        return response.data;

    }catch(error) {
       console.error('Error fetching data :',error);
       throw error;
    }
}
const fourToSevenDayExpire= async()=>{
    try{
        const response = await axios.get('http://localhost:4000/members/within-4-7-expiring',{withCredentials:true});
        console.log(response);
        return response.data;

    }catch(error) {
       console.error('Error fetching data :',error);
       throw error;
    }
}
const expired= async()=>{
    try{
        const response = await axios.get('http://localhost:4000/members/expired-member',{withCredentials:true});
        console.log(response);
        return response.data;

    }catch(error) {
       console.error('Error fetching data :',error);
       throw error;
    }
}
const inActiveMembers= async()=>{
    try{
        const response = await axios.get('http://localhost:4000/members/inactive-member',{withCredentials:true});
        console.log(response);
        return response.data;

    }catch(error) {
       console.error('Error fetching data :',error);
       throw error;
    }
}


export{getMonthlyJoined,threeDayExpire,fourToSevenDayExpire,expired,inActiveMembers};

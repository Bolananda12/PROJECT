import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from "react-router-dom";

const MemberCard = ({item}) => {
  return (
    <Link to={`/member/${item?._id}`} className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 hover:text-white cursor-pointer">
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-outo rounded-ful">
        <img
          className="w-full h-full rounded-full"
          alt="profile pic"
          src={item?.profilePic}
        />
        <CircleIcon
          className="absolute top-0 left-0"
          sx={{ color: item?.status==="Active"?"greenyellow":"red" }}
        />
      </div>
      <div className="mx-auto mt-5 text-center text-xl font-semibold font-mono">
        {item?.name}
      </div>
      <div className="mx-auto  mt-2 text-center text-xl font-mono">
        {"+91" + item?.mobileNo}
      </div>
      <div className="mx-auto  mt-2 text-center text-xl font-mono">
        Next Bill DATE : {item?.nextBillDate.slice(0,10).split('-').reverse().join('-')}
      </div>
    </Link>
  );
};

export default MemberCard;

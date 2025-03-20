import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddmemberShip = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fatchMembership = async () => {
    try {
      const response = await axios.get("http://localhost:4000/plans/get-membership", { withCredentials: true });
      const membershipData = response.data?.membership || []; // Handle undefined response
      setMembership(membershipData);
      toast.success(`${membershipData.length} Memberships Fetched`);
    } catch (err) {
      console.error("Error fetching memberships:", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fatchMembership();
  }, []); // Dependency array to run only once

  const handleAddmembership = async () => {
    if (!inputField.months || !inputField.price) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/plans/add-membership', inputField, { withCredentials: true });
      toast.success(response.data.message);
      fatchMembership(); // Refresh memberships after adding
      handleClose();
    } catch (err) {
      console.error("Error adding membership:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {membership.map((item, index) => (
          <div key={index} className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-400 to-green-400 cursor-pointer">
            <div>{item.months} Month Membership</div>
            <div>Rs {item.price}</div>
          </div>
        ))}
      </div>

      <hr className="mt-10 mb-10" />
      <div className="flex gap-10 mb-10">
        <input
          value={inputField.months}
          onChange={(event) => handleOnChange(event, "months")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add No. of Months"
        />

        <input
          value={inputField.price}
          onChange={(event) => handleOnChange(event, "price")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add Price"
        />

        <div onClick={handleAddmembership} className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Add +
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddmemberShip;

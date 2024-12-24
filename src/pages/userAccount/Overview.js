import React, { useState } from "react";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import Button from "../../components/button";

function Overview() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="">
      <div className="px-4 py-6 border-b font-bold secondary-font">Overview</div>
      <form onSubmit={handleSubmit} className="px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            label={"Your full name"} 
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block font-medium mb-1">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <Button buttonRole={"submit"} buttonText={"Save details"} otherStyles={"bg-primary text-white"}/>
        </div>
      </form>
    </div>
  );
}

export default Overview;

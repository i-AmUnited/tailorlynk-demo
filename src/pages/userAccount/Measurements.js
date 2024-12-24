import React, { useState } from "react";
import infoIcon from "../../assets/icons/brownInfo.svg";

function Measurements() {
  const [formData, setFormData] = useState({
    chest: "",
    waist: "",
    hips: "",
    shoulderWidth: "",
    sleeveLength: "",
    shirtLength: "",
    thigh: "",
    neck: "",
    armhole: "",
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
    console.log("Measurements Submitted:", formData);
  };

  return (
    <div className="">
      <div className="px-4 py-6 border-b font-bold secondary-font">Measurements</div>
      <div className="px-4 py-6">
        <div className="flex gap-[5px] items-center mb-6 text-xs">
          <img alt="*" src={infoIcon} className="h-[18px]" />
          <span> For best results, please enter your measurements in <span className="text-primary font-semibold">centimeters</span>.</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="chest" className="block font-medium mb-1">
                Chest / Bust:
              </label>
              <input
                type="text"
                id="chest"
                name="chest"
                value={formData.chest}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="waist" className="block font-medium mb-1">
                Waist:
              </label>
              <input
                type="text"
                id="waist"
                name="waist"
                value={formData.waist}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="hips" className="block font-medium mb-1">
                Hips:
              </label>
              <input
                type="text"
                id="hips"
                name="hips"
                value={formData.hips}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="shoulderWidth" className="block font-medium mb-1">
                Shoulder width:
              </label>
              <input
                type="text"
                id="shoulderWidth"
                name="shoulderWidth"
                value={formData.shoulderWidth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="sleeveLength" className="block font-medium mb-1">
                Sleeve length:
              </label>
              <input
                type="text"
                id="sleeveLength"
                name="sleeveLength"
                value={formData.sleeveLength}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="shirtLength" className="block font-medium mb-1">
                Shirt length:
              </label>
              <input
                type="text"
                id="shirtLength"
                name="shirtLength"
                value={formData.shirtLength}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="thigh" className="block font-medium mb-1">
                Thigh:
              </label>
              <input
                type="text"
                id="thigh"
                name="thigh"
                value={formData.thigh}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="neck" className="block font-medium mb-1">
                Neck:
              </label>
              <input
                type="text"
                id="neck"
                name="neck"
                value={formData.neck}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="armhole" className="block font-medium mb-1">
                Armhole:
              </label>
              <input
                type="text"
                id="armhole"
                name="armhole"
                value={formData.armhole}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600"
            >
              Save measurements
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Measurements;

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import eye icons

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    // Ensure all fields are provided
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    try {
      // Send the request to the API
      const response = await fetch(
        "https://api-tailorlynk.stayandflight.com/api/v1/customer/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            "x-api-key": "16112024",
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      // Handle the response
      const data = await response.json();

      if (response.ok) {
        toast.success("Password updated successfully!");
      } else {
        toast.error(data.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-gray-700">Old Password:</label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"} // Toggle visibility
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full p-2 pr-10 border border-gray-300 rounded" // Added 'pr-10' for icon space
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <FontAwesomeIcon
                icon={showOldPassword ? faEyeSlash : faEye}
                className="text-gray-500"
              />
            </button>
          </div>
        </div>

        <div className="relative">
          <label className="block text-gray-700">New Password:</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"} // Toggle visibility
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-2 pr-10 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                className="text-gray-500"
              />
            </button>
          </div>
        </div>

        <div className="relative">
          <label className="block text-gray-700">Confirm New Password:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle visibility
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-2 pr-10 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-2 right-2"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="text-gray-500"
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#CB997E] text-white py-2 px-4 rounded hover:bg-[#B5838D]"
        >
          Update Password
        </button>
      </form>

      {/* Toast container to display the messages */}
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;

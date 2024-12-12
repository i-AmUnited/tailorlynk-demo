import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AccountDetails from "./AccountDetails";
import SavedItems from "./savedItems";
import ChangePassword from "./changePassword";
import Measurements from "./Measurements";
import Overview from "./Overview";
import MessageCenter from "./MessageCenter";
import Footer from "../../components/footer";
import logo from "../../assets/logos/logo.svg";

function UserAccount() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen justify-between">
      {/* Main content with sidebar and routes */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-36"
          } bg-[#CB997E] text-white transition-all duration-300`}
        >
          <div className="p-4">
            <Link to="/" className="text-lg font-bold hover:underline">
              <img src={logo} alt="" className="h-12 md:h-14" />
            </Link>
          </div>
          <button
            className="p-2 text-2xl focus:outline-none text-white hover:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "<" : ">"}
          </button>
          <nav className="mt-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="overview"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  to="message-center"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Message Center
                </Link>
              </li>
              <li>
                <Link
                  to="change-password"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  to="measurements"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Measurements
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-100 p-8">
          <Routes>
            <Route path="details" element={<AccountDetails />} />
            <Route path="saved-items" element={<SavedItems />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="measurements" element={<Measurements />} />
            <Route path="overview" element={<Overview />} />
            <Route path="message-center" element={<MessageCenter />} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserAccount;

import React, { useState } from "react";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import { HiMenuAlt4, HiOutlineX } from "react-icons/hi";
import SavedItems from "./savedItems";
import ChangePassword from "./changePassword";
import Measurements from "./Measurements";
import Overview from "./Overview";
import MessageCenter from "./MessageCenter";
import Order from "./Order";
import SavedStyles from "./SavedStyles";
import ShippingAddress from "./ShippingAddress";
import Feedback from "./Feedback";
import ErrorPage from "../errorPage";

const SideLinks = [
  { id: 1, url: "/user-account", text: "Overview" },
  { id: 2, url: "/user-account/measurements", text: "Measurements" },
  { id: 3, url: "/user-account/saved-styles", text: "Saved items" },
  { id: 4, url: "/user-account/message-center", text: "Message Center" },
  { id: 5, url: "/user-account/order", text: "Order" },
  { id: 6, url: "/user-account/shipping-address", text: "Shipping Address" },
  { id: 7, url: "/user-account/change-password", text: "Change Password" },
  { id: 8, url: "/user-account/feedback", text: "Feedback" },
];

function UserAccount() {
  const [mobileNav, setMobileNav] = useState(false);

  const handleNavLinkClick = () => {
    setMobileNav(false); // Close the sidebar when a link is clicked
  };

  return (
    <div className="">
      {/* mobile nav icons */}
      <button
        className="lg:hidden flex self-end"
        onClick={() => setMobileNav(!mobileNav)}
      >
        {mobileNav ? (
          <HiOutlineX className="text-xl text-primary" />
        ) : (
          <HiMenuAlt4 className="text-xl text-primary" />
        )}
      </button>

      {/* Main content with sidebar and routes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-3 bg-white border rounded-md hidden lg:block h-fit">
          <div className="px-4 py-6 border-b">
            <Link to="/" className="font-semibold">
              <p className="text-primary"> [Back to homepage] </p>
            </Link>
          </div>

          <nav className="">
            <ul className="px-4 py-5 grid gap-5">
              {SideLinks.map(({ id, url, text }) => (
                <li key={id} className="">
                  <NavLink
                    to={url}
                    end={url === "/user-account"}
                    onClick={handleNavLinkClick}
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-semibold"
                        : "text-gray-400"
                    }
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* nav sidebar */}
        <div
          className={` ${
            mobileNav ? "left-0" : "-left-full"
          } fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all bg-white shadow-md pt-10`}
        >
          <div className="">
            <Link to="/" className="font-bold">
              <p className="text-primary"> [Back to homepage] </p>
            </Link>
          </div>

          <nav className="mt-4">
            <ul className="mt-4 space-y-3">
              {SideLinks.map(({ id, url, text }) => (
                <li key={id} className="hover:bg-gray-100 rounded-md">
                  <NavLink
                    to={url}
                    onClick={handleNavLinkClick}
                    className="block px-4 py-2 text-gray-700 hover:text-black"
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="w-full bg-white border rounded-md lg:col-span-9">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="saved-items" element={<SavedItems />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="measurements" element={<Measurements />} />
            <Route path="overview" element={<Overview />} />
            <Route path="message-center" element={<MessageCenter />} />
            <Route path="order" element={<Order />} />
            <Route path="saved-styles" element={<SavedStyles />} />
            <Route path="shipping-address" element={<ShippingAddress />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
